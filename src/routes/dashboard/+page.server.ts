import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    publish: async ({request, locals, url}) => {
        const body = Object.fromEntries(await request.formData())
        console.log("publish")
    },

    delete: async ({request, locals, url}) => {
        const body = Object.fromEntries(await request.formData())
       
        throw redirect(302, "/account")


    }
}
