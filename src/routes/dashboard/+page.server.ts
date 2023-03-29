import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabase as superClient } from '$lib/supabase';
let teamsById;
let ownTeam;

let locationsById;

export const load = (async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
        throw redirect(303, '/');
    }

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
        .from('user')
        .select('id, team_id, teams( name )',)
        .eq('id', session.user.id);
    if (userData) {
        console.log("test")
        ownTeam = userData.map((user) => user.teams);
        ownTeam = ownTeam.map((team) => team.name)[0];
        console.log(ownTeam)
        //console.log((userData.map((user) => user.teams)).map((team) => team.name)[0])
    }
    return { teamData: teamsById, userData, ownTeam, locationData: locationsById }
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
            .insert({ name: 'Denmark', starts_at: fullDate.getTime(), host_id : "ad57d4fd-cb11-4fb7-b91b-bc8975f2b5d4", host_type: "team", event_category_id: 1, event_location_id: 1})
        if(error){
            console.log("There was an error")
            console.log(error.message)
        }
        },

    delete: async ({ request, locals, url }) => {
        const body = Object.fromEntries(await request.formData())
        throw redirect(302, "/account")
    }
} satisfies Actions;
