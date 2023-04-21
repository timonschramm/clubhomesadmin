import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, locals: { supabase, getSession } }) => {

    const { data: news_data, error: news_error } = await supabase
        .from("news")
        .select("id, created_at, heading, content, image_link")
        .eq("id", params.news_id);
    console.log(news_data)
    if (news_data) {
        return { news_data: news_data[0] }
    }

}) satisfies PageServerLoad;

export const actions: Actions = {
    update_news: async ({ request, params, locals: { supabase, getSession } }) => {
        const body = Object.fromEntries(await request.formData())
        let news_image_url = "";

        if (body.news_image instanceof File) {
            const fileExt = body.news_image.name.split(".").pop();
            news_image_url = crypto.randomUUID() + "." + fileExt;
            console.log("fullurl: ", news_image_url)
        }
        const { data: news_data, error: news_error } = await supabase
            .from("news")
            .update({ heading: body.heading, content: body.content, image_link: news_image_url})
            .eq("id", params.news_id)
            .select();
        if (news_data) {
            console.log("news_data: ", news_data)
            console.log("here wer are")
            let { error: imageError } = await supabase.storage.from('news').upload(news_data[0].id + "/images/" + news_image_url, body.news_image);
            if (imageError) {
                console.log("Error at image upload")
                console.log(imageError)
            }
        }

    },
} satisfies Actions;
