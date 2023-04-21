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

    if(teamData){
        teamsById = teamData.reduce((teamArray, team) => {
            teamArray[team.id] = team.name;
            return teamArray;
        }, {})
    }

    //console.log("just the names: ", existing_sponsor_names)

    const { data: news, error: news_error } = await superClient
        .from("news")
        .select('id, created_at, heading, content, image_link, news_teams!inner (team_id, news_id)')
        .eq("news_teams.team_id", own_team_id)
    //console.log("news ", news)


    return { teamData: teamsById, userData, ownTeam, locationData: locationsById, eventData, news }
}) satisfies PageServerLoad;
export const actions = {
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
