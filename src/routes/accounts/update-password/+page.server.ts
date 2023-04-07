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
	update_password: async ({request, locals, url}) => {
        console.log("Updating password...")
        const body = Object.fromEntries(await request.formData())

    }
};