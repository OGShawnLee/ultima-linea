import auth from '@auth/server';
import { AuthTokenSchema } from '@auth/schema';
import { deleteDraft, getDrafts } from '@draft/server';
import { fail, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { error } from '@sveltejs/kit';

export async function load(event) {
  const drafts = await getDrafts(auth.getAuthToken(event.cookies));
  
  if (drafts.failed) {
    throw error(500, "No ha sido posible cargar sus borradores, intente más tarde.");
  }

  return { drafts: drafts.data };
}

export const actions = {
  "delete-draft": async (event) => {
    const currentUser = auth.getAuthToken(event.cookies);
    const form = await superValidate(event, valibot(AuthTokenSchema));
    
    if (form.valid === false) {
      return fail(400, form);
    }

    const draft = await deleteDraft(form.data.id, currentUser);

    if (draft.failed) {
      return fail(500, form);
    }
  }
}