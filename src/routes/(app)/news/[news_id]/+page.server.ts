import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({params, locals: { supabase, getSession } }) => {

    const { data: news_data, error: news_error } = await supabase
    .from("news")
    .select("id, created_at, heading, content, image_link")
    .eq("id", params.news_id);
    console.log(news_data)
    if(news_data){
        return { news_data: news_data[0]}
    }
   
}) satisfies PageServerLoad;