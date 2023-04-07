import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabase as superClient } from '$lib/supabase';

export const load = (async ({ locals: { supabase, getSession } }) => {
	supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("getting started")
        if (event == "PASSWORD_RECOVERY") {
            console.log()
          const newPassword = prompt("What would you like your new password to be?");
          const { data, error } = await supabase.auth
            .updateUser({ password: newPassword })
   
          if (data) alert("Password updated successfully!")
          if (error) alert("There was an error updating your password.")
        }
        else {
            console.log("event: ", event)
        }
        console.log("anything:")
      })
      console.log("finished")
}) satisfies PageServerLoad;