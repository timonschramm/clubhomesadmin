// src/routes/+layout.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();
  
 
  return {
    session: getSession()
  };
};