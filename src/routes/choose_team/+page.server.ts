import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabase as superClient } from '$lib/supabase';
export const ssr = false;    // <= SSR is off

let teamsById;
let ownTeam;
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

    const { data: userData, error: userError } = await superClient
        .from('users')
        .select('id, team_id, teams( name )',)
        .eq('id', session.user.id);
    if (userData) {
        ownTeam = userData.map((user) => user.teams);
        ownTeam = ownTeam.map((team) => team.name)[0];
    }


    return { teamData: teamsById, ownTeam };
}) satisfies PageServerLoad;

export const actions = {

    pic_team: async ({ request, locals: { supabase, getSession } }) => {

        console.log("update")
        const session = await getSession();
        const body = Object.fromEntries(await request.formData())
        const teamID = Object.keys(teamsById).find(id => teamsById[id] === body.team);

        const { data: fetchBack, error } = await supabase
            .from('users')
            .update({ team_id: teamID })
            .eq('id', session.user.id);

        const { data: updated_team, error: team_error } = await supabase
            .from('user_role_team')
            .update({ team_id: teamID })
            .eq('user_id', session.user.id)
            .select()

        if (updated_team) {
            throw redirect(303, '/approval');
        }
        if (error) {
            console.log(error.hint)
            console.log(error.message)
            console.log(error.code)
        }
    },
    createTeam: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession();

        console.log("Team wird erstellt...")
        const body = Object.fromEntries(await request.formData())
        let url = "";
        if (body.teamLogoPath instanceof File) {
            const fileExt = body.teamLogoPath.name.split('.').pop();
            url = crypto.randomUUID() + "." + fileExt
            console.log("fullurl: ", url)
        }

        const { data: createdTeam, error } = await superClient
            .from("teams")
            .insert({ name: body.teamName, logo_link: url, meta_league_id: 1, league_id: 1 })
            .select()
        if (error) {
            console.log("Error happened: ", error.message)
            console.log(error.details)
        }
        if (createdTeam) {
            console.log("created Team", createdTeam[0])
            console.log(createdTeam[0].id)

            console.log("All details to Image")
            console.log(body.teamLogoPath)
            if (body.teamLogoPath instanceof File) {
                let { error: imageError } = await supabase.storage.from('clubs').upload(createdTeam[0].id + "/logo/" + url, body.teamLogoPath);
                if (imageError) {
                    console.log("Error at image upload")
                    console.log(imageError)
                }
            }

            const { data: updated_team, error: team_error } = await supabase
                .from('user_role_team')
                .update({ team_id: createdTeam[0].id })
                .eq('user_id', session.user.id)
                .select()

            if (updated_team) {
                throw redirect(303, '/approval');
            }
            if (error) {
                console.log(error.hint)
                console.log(error.message)
                console.log(error.code)
            }
        }
    }
} satisfies Actions;

