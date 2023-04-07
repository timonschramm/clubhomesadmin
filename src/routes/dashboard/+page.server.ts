import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabase as superClient } from '$lib/supabase';
let teamsById;
let ownTeam;
let own_team_id;
let locationsById;

export const load = (async ({ locals: { supabase, getSession } }) => {


    const session = await getSession();

    if (!session) {
        throw redirect(303, '/');
    }
    const { data: userData, error: userError } = await superClient
        .from('user_role_team')
        .select('user_id, team_id, teams!inner(name)')
        .eq("user_id", session.user.id);
    if (userData) {
        console.log(userData)
        let all_entries = userData.map((user) => user.teams);

        own_team_id = userData[0].team_id;
        ownTeam = all_entries.map((team) => team.name)[0];
        console.log("own_team_id: ", own_team_id)
    }
    console.log("team: ", ownTeam)

    const { data: eventData, error: eventError } = await superClient
        .from("events")
        .select("id, starts_at, name, host_id, event_location_id")
        .eq('host_id', own_team_id)


    const { data: teamData, error } = await superClient
        .from('teams')
        .select('name, id');
    teamsById = teamData.reduce((teamArray, team) => {
        teamArray[team.id] = team.name;
        return teamArray;
    }, {})

    const { data: locationData, error: locationError } = await superClient
        .from("event_locations")
        .select('id, name, street, house_number')
    if (locationData) {
        locationsById = locationData.reduce((locationArray, location) => {
            locationArray[location.id] = location.name ? location.name : location.street + " " + location.house_number
            return locationArray;
        }, {})
    }


    const { data: all_sponsors, error: spon_err } = await superClient
        .from("sponsors")
        .select('id, name, sponsor_teams!inner (sponsor_id, team_id)')
        .neq("sponsor_teams.team_id", own_team_id)

    const { data: all_sponsors_except_existing, error: sponsor_error } = await superClient
        .from("sponsor_teams")
        .select('team_id, sponsor_id, sponsors (name, logo_link)')
        .neq("team_id", own_team_id)

    // console.log("all_sponsors: ", all_sponsors_except_existing)

    const { data: existing_sponsors, error: all_exisiting_sponsor_error } = await superClient
        .from("sponsor_teams")
        .select('team_id, sponsor_id, teams(id), sponsors (name, logo_link)')
        .eq("team_id", own_team_id)

    //console.log("existing_sponsors: ", existing_sponsors)
    let existing_sponsor_names = []
    if (existing_sponsors) {
        existing_sponsor_names = existing_sponsors.map((oneSponsor) => oneSponsor.sponsors.name)
    }


    //console.log("just the names: ", existing_sponsor_names)

    const { data: news, error: news_error } = await superClient
        .from("news")
        .select('id, created_at, heading, content, image_link, news_teams!inner (team_id, news_id)')
        .eq("news_teams.team_id", own_team_id)
    //console.log("news ", news)
    let all_sponsors_new = [];
    if (all_sponsors) {
        all_sponsors_new = all_sponsors.filter((oneSponsor) => !existing_sponsor_names.includes(oneSponsor.name))
    }
    //console.log(all_sponsors_new)

    return { teamData: teamsById, userData, ownTeam, locationData: locationsById, eventData, existing_sponsors, all_sponsors_except_existing: all_sponsors_new, news }
}) satisfies PageServerLoad;
export const actions = {
    createEvent: async ({ request, locals, url }) => {
        const body = Object.fromEntries(await request.formData())
        let date = body.gameDay + "";
        let time = body.gameTime + "";
        const [year, month, day] = date.split('.').map(Number);
        const [hours, minutes] = time.split(':').map(Number);
        const fullDate = new Date(day, month - 1, year, hours, minutes);
        console.log(date, time)
        console.log(hours, minutes)
        console.log(year, month, day)
        console.log(fullDate.getTime())

        if (body.teams) {
            const { data: event_category_data, error: event_category_error } = await superClient
                .from('event_categories')
                .upsert({ main: "SPORT", sub: "TOURNAMENT" })
                .select();
            if (event_category_error) {
                console.log("error: ", event_category_error)
            }
            console.log("Es is ein Tunier")
            const { data: event_data, error } = await superClient
                .from('events')
                .insert({ name: body.opponent, starts_at: fullDate.getTime(), host_id: own_team_id, host_type: "team", event_category_id: 1, event_location_id: 1 })
                .select();
            console.log("teams, ", body.teams);
            const my_teams = body.teams as unknown as number[];
            my_teams.forEach(async (team) => {
                const { error: event_participant_error } = await superClient
                    .from('event_participants')
                    .insert({ event_id: event_data[0].id, participant_id: team.id, confirmed: true })
            });

            const { error: event_participant_error } = await superClient
                .from('event_participants')
                .insert({ event_id: event_data[0].id, team_id: body.teams, confirmed: true })

        }
        else {
            console.log("Es is ein Spiel")
            const { error } = await superClient
                .from('events')
                .insert({ name: body.opponent, starts_at: fullDate.getTime(), host_id: own_team_id, host_type: "team", event_category_id: 1, event_location_id: 1 })
            if (error) {
                console.log("There was an error")
                console.log(error.message)
            }
        }

    },
    approve_event: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        console.log("approving")
        const { error } = await superClient
            .from('events')
            .update({ confirmed: true })
            .eq("id", body.event_id)
        if (error) {
            console.log(error)
        }
    },

    cancel_event: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        const { error } = await superClient
            .from('events')
            .update({ cancelled: true })
            .eq("id", body.event_id)
        if (error) {
            console.log(error)
        }
    },

    create_new_sponsor: async ({ request, locals }) => {
        console.log("Create Sponsor...");
        const body = Object.fromEntries(await request.formData())
        let sponsor_url = "";
        if (body.sponsorLogo instanceof File) {
            const fileExt = body.sponsorLogo.name.split(".").pop();
            sponsor_url = crypto.randomUUID() + "." + fileExt;
            console.log("fullurl: ", sponsor_url)
        }

        // create sponsor in database
        const { data: created_sponsor, error: created_sponsor_error } = await superClient
            .from("sponsors")
            .insert({ name: body.sponsor_name, logo_link: sponsor_url })
            .select()
        //image upload
        if (created_sponsor) {
            const { data: created_sponsor_team, error: created_sponsor_teams_error } = await superClient
                .from("sponsor_teams")
                .insert({ team_id: own_team_id, sponsor_id: created_sponsor[0].id })
                .select()
            let { error: imageError } = await superClient.storage.from('sponsors').upload(created_sponsor[0].id + "/logo/" + sponsor_url, body.sponsorLogo);
            if (imageError) {
                console.log("Error at image upload")
                console.log(imageError)
            }
        }
    },
    add_existing_sponsor: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        const { data: added_sponsor, error: added_sponsor_error } = await superClient
            .from("sponsor_teams")
            .insert({ team_id: own_team_id, sponsor_id: body.sponsor_id })
            .select()
    },
    delete_sponsor: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        const { error } = await superClient
            .from('sponsor_teams')
            .delete()
            .match({ team_id: own_team_id, sponsor_id: body.sponsor_id })
        if (error) {
            console.log(error)
        }
    },

    create_news: async ({ request, locals }) => {
        console.log("create new news...")
        const body = Object.fromEntries(await request.formData())
        let news_image_url = "";

        if (body.news_image instanceof File) {
            const fileExt = body.news_image.name.split(".").pop();
            news_image_url = crypto.randomUUID() + "." + fileExt;
            console.log("fullurl: ", news_image_url)
        }
        // create news in database
        const { data: created_news, error: created_news_error } = await superClient
            .from("news")
            .insert({ heading: body.heading, content: body.content, image_link: news_image_url })
            .select();
        if (created_news) {
            const { data: created_news_teams, error: created_news_teams_error } = await superClient
                .from("news_teams")
                .insert({ team_id: own_team_id, news_id: created_news[0].id })
                .select()
            let { error: imageError } = await superClient.storage.from('news').upload(created_news[0].id + "/images/" + news_image_url, body.news_image);
            if (imageError) {
                console.log("Error at image upload")
                console.log(imageError)
            }
        }
    },
    delete_news_for_team: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        const { error } = await superClient
            .from('news_teams')
            .delete()
            .match({ team_id: own_team_id, news: body.news_id })
    }
} satisfies Actions;
