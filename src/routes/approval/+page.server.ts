import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabase as superClient } from '$lib/supabase';
let teamsById;
let ownTeam;
export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}
	const { data: user_role_team_data, error: user_role_team_error } = await supabase
		.from('user_role_team')
		.select('user_id, team_id, user_status')
		.eq('user_id', session.user.id);
	if (user_role_team_data) {
		console.log(user_role_team_data);
		if (user_role_team_data[0].user_status !== "pending") {
			throw redirect(303, '/account');
		}
	}
	const { data: teamData, error } = await superClient
		.from('teams')
		.select('id, name');


	teamsById = teamData.reduce((teamArray, team) => {
		teamArray[team.id] = team.name;
		return teamArray;
	}, {})

	const { data: userData, error: userError } = await superClient
		.from('user_role_team')
		.select('user_id, team_id, teams!inner(name)')
		.eq("user_id", session.user.id);
	if (userData) {
		console.log(userData)
		ownTeam = userData.map((user) => user.teams);
		ownTeam = ownTeam.map((team) => team.name)[0];
	}
	console.log("team: ", ownTeam)


	return { teamData: teamsById, ownTeam };
}) satisfies PageServerLoad;