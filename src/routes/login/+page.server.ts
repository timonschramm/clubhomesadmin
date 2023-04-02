import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { AuthApiError } from "@supabase/supabase-js";


export const actions = {
	login: async ( {request, locals, url}) => {
        const body = Object.fromEntries(await request.formData())
		if (body.password == "") {
			return fail(400, {
				error: 'Bitte gib ein Passwort ein',
			})
		}
		
		const { data: loginData, error: err } = await locals.supabase.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string,
		})
		
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
		  
		throw redirect(302, "/account")
  }
};