import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { AuthApiError } from "@supabase/supabase-js";

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();

	// if the user is already logged in return them to the account page
	if (session) {
		throw redirect(303, '/account');
	}

	return { url: url.origin };
};

export const actions = {
	login: async ({ request, locals: {supabase, getSession}, url }) => {
		const body = Object.fromEntries(await request.formData())
		if (body.password == "") {
			return fail(400, {
				error: 'Bitte gib ein Passwort ein',
			})
		}

		const { data: loginData, error: err } = await supabase.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string,
		})
		console.log("data ", loginData)

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				console.log("Invalid credentials")
				return fail(400, {
					error: "Leider sind deine Zugangsdaten falsch. Bitte überprüfe diese noch einmal.",
				})
			}
			return fail(500, {
				message: "Server error. Try again later.",
			})
		}
		const session = await getSession();

		const { data: user_role_team_data, error: user_role_team_error } = await supabase
			.from('user_role_team')
			.select('user_id, team_id, user_status')
			.eq('user_id', session.user.id);
		if (user_role_team_data) {
			console.log(user_role_team_data);
			if (user_role_team_data[0].user_status !== "pending") {
				throw redirect(303, '/account');
			}
			else if(user_role_team_data[0].user_status === "pending"){
				throw redirect(303, '/choose_team');
			}
		}
	}
};