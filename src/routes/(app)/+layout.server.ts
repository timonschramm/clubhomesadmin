// src/routes/+layout.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();

  if (session) {
    console.log("we have a session")
    const { data: user_role_team_data, error: user_role_team_error } = await supabase
      .from('user_role_team')
      .select('user_id, team_id, user_status')
      .eq('user_id', session.user.id);
    if (user_role_team_data) {
      // console.log(user_role_team_data);
      if (user_role_team_data[0].team_id === null) {
        throw redirect(303, '/choose_team');
      }
      else if (user_role_team_data[0].user_status === "pending") {
        throw redirect(303, '/approval');
      }
    }
  }
  return {
    session: getSession()
  };
};