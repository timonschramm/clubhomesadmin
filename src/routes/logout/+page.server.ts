import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
let teamsById;
let ownTeam;
export const load = (async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (session) {
        await supabase.auth.signOut();
        throw redirect(303, '/');
    }
    else {
        throw redirect(303, '/');
    }

}) satisfies PageServerLoad;


