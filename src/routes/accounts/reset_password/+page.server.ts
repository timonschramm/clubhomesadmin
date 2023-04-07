import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabase as superClient } from '$lib/supabase';

export const load = (async ({ locals: { supabase, getSession } }) => {

}) satisfies PageServerLoad;

export const actions = {
    reset_password: async ({ request, locals: {supabase}, url }) => {
        console.log("Resetting password...")
        const body = Object.fromEntries(await request.formData())

        const { data, error } = await supabase.auth.resetPasswordForEmail(body.email + "", {
            redirectTo: '/accounts/update-password',
        })
    }
} satisfies Actions;
