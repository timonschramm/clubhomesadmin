import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabase as superClient } from '$lib/supabase';
let teamsById;
let ownTeam;
let own_team_id;
let locationsById;
//let cdn_url = "https://msnvudhxykflybyjkmft.supabase.co/storage/v1/object/public/clubs/42edd71b-2198-4838-9876-413a855b6968/sponsor_logos/0490bfae-6a56-4830-95a4-9c43e03bf654.jpeg"

export const load = (async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
        throw redirect(303, '/');
    }

    const { data: eventData, error: eventError } = await superClient
        .from("events")
        .select("starts_at, name, host_id, event_location_id")


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
    locationsById = locationData.reduce((locationArray, location) => {
        locationArray[location.id] = location.name ? location.name : location.street + " " + location.house_number
        return locationArray;
    }, {})

    const { data: userData, error: userError } = await superClient
        .from('users')
        .select('id, team_id, teams( name )',)
        .eq('id', session.user.id);
    if (userData) {
        console.log("test")
        ownTeam = userData.map((user) => user.teams);
        ownTeam = ownTeam.map((team) => team.name)[0];
        own_team_id = userData[0].team_id;
        console.log(ownTeam)
        //console.log((userData.map((user) => user.teams)).map((team) => team.name)[0])
    }
    /*  const { data: singleImage, error: singleImageError } = await supabase
         .storage
         .from('clubs')
         .download(own_team_id + "/sponsor_logos")
     if(singleImage){
         console.log(singleImage)
     } */

    const { data: imageData, error: imageError } = await superClient
        .storage
        .from("clubs")
        .list(own_team_id + "/sponsor_logos");
    const { data: all_sponsors, error: sponsor_error } = await superClient
        .from("sponsors")
        .select('id, name');

    const { data: all_exisiting_sponsors, error: all_exisiting_sponsor_error } = await superClient
        .from("sponsor_teams")
        .select('team_id, sponsor_id, teams( id ), sponsors (id, name)')
        .eq("teams.id", own_team_id)
        .eq("sponsors.id", "sponsor_id")
    console.log()



    let cdn_url = "https://msnvudhxykflybyjkmft.supabase.co/storage/v1/object/public/clubs/" + own_team_id + "/sponsor_logos/"
    const sponsorImages = imageData.map((image) => (cdn_url + image.name))
    console.log("image Data", imageData)
    console.log("image Data ARR", sponsorImages)


    return { teamData: teamsById, userData, ownTeam, locationData: locationsById, eventData, sponsorImages }
}) satisfies PageServerLoad;
export const actions = {
    createEvent: async ({ request, locals, url }) => {
        const body = Object.fromEntries(await request.formData())
        let date = body.gameDay + "";
        let time = body.gameTime + "";
        const [year, month, day] = date.split('-').map(Number);
        const [hours, minutes] = time.split(':').map(Number);
        const fullDate = new Date(year, month - 1, day, hours, minutes);
        console.log(fullDate.getTime())
        console.log(date)
        console.log(time)
        console.log("publish")

        const { error } = await superClient
            .from('events')
            .insert({ name: body.opponent, starts_at: fullDate.getTime(), host_id: "ad57d4fd-cb11-4fb7-b91b-bc8975f2b5d4", host_type: "team", event_category_id: 1, event_location_id: 1 })
        if (error) {
            console.log("There was an error")
            console.log(error.message)
        }
    },

    delete: async ({ request, locals, url }) => {
        const body = Object.fromEntries(await request.formData())
        throw redirect(302, "/account")
    },

    createSponsor: async ({ request, locals }) => {
        console.log("Create Sponsor...");
        const body = Object.fromEntries(await request.formData())
        let sponsor_url = "";
        if (body.sponsorLogo instanceof File) {
            const fileExt = body.sponsorLogo.name.split(".").pop();
            sponsor_url = crypto.randomUUID() + "." + fileExt;
            console.log("fullurl: ", sponsor_url)
        }
        console.log("fullurlagain: ", sponsor_url)

        // create sponsor in database
        const { data: created_sponsor, error: created_sponsor_error } = await superClient
            .from("sponsors")
            .insert({ name: body.sponsor_name, logo_link: sponsor_url })
            .select()
        //image upload
        if (created_sponsor) {
            let { error: imageError } = await superClient.storage.from('sponsors').upload(created_sponsor[0].id + "/logos" + sponsor_url, body.sponsorLogo);
            if (imageError) {
                console.log("Error at image upload")
                console.log(imageError)
            }
        }

    },

    getSponsorOfTeam: async ({ request, locals, url }) => {

    },

    create_news: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        // table has to be created
        /*  let url = ""
         const { error } = await superClient
             .from('news')
             .insert({ heading: body.heading, image_path: url}) */
    }

} satisfies Actions;
