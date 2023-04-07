import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();
	if (session) {
		throw redirect(303, '/account');
	}
	return { url: url.origin };
};

export const actions = {

	register: async ({request, locals, url}) => {
		console.log("Creating user...")
		const body = Object.fromEntries(await request.formData())
		console.log("email ", body.email)
		console.log("password ", body.password)
		console.log("password2 ", body.check_password)
		if (body.password !== body.check_password) {
			console.log("Passwörter stimmen nicht überein")
			return fail(400, {
				message: 'Passwörter stimmen nicht überein',
			})
		}
		console.log("email ", body.email)
		console.log("password ", body.password)
		if (body.password == "") {
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
			throw redirect(302, "/accounts/login")
		}
	}
};