import auth from '@auth/server';
import { getDrafts } from '@draft/server';
import { error } from '@sveltejs/kit';

export async function load(event) {
  const drafts = await getDrafts(auth.getAuthToken(event.cookies));
  
  if (drafts.failed) {
    throw error(500, "No ha sido posible cargar sus borradores, intente más tarde.");
  }

  return { drafts: drafts.data };
}