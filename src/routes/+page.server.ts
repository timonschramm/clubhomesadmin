// src/routes/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();

    // if the user is already logged in return them to the account page
	if (session) {
		throw redirect(303, '/account');
	}

	return { url: url.origin };
};

export const actions = {

	register: async ({request, locals, url}) => {
		const body = Object.fromEntries(await request.formData())
		if (body.passWord !== body.passWordCheck) {
			console.log("Passwörter stimmen nicht überein")
			return fail(400, {
				message: 'Passwörter stimmen nicht überein',
			})
		}
		if (body.passWord == "") {
			console.log("Bitte gib ein Passwort ein")
			return fail(400, {
			
				error: 'Bitte gib ein Passwort ein',
			})
		}
		const { data: signUpData, error: signUpError } = await locals.supabase.auth.signUp({
			email: body.email as string,
			password: body.password as string,
		});
		if (signUpError) {
			return fail(400, {
				error: signUpError.message,
			})
		} else {
			throw redirect(302, "/account")
		}
	}
};