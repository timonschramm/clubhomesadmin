import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { AuthApiError } from "@supabase/supabase-js";
import { supabase as superClient } from '$lib/supabase';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}
	const { data: teamData, error } = await superClient
	.from('teams')
	.select('name');
	return { names: teamData.map((team) => team.name), session };
}) satisfies PageServerLoad;

export const actions = {
	
	logout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, '/');
		}
	}
} satisfies Actions;

