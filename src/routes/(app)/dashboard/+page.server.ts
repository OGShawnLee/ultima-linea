import auth from '@auth/server';
import { AuthTokenSchema } from '@auth/schema';
import { deleteDraft, getDrafts, publishDraft } from '@draft/server';
import { fail, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { error, redirect } from '@sveltejs/kit';
import { ConstraintViolationError } from 'edgedb';

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
  },
  "publish-draft": async (event) => {
    const currentUser = auth.getAuthToken(event.cookies);
    const form = await superValidate(event, valibot(AuthTokenSchema));

    if (form.valid === false) {
      return fail(400, form);
    }

    const article = await publishDraft(form.data.id, currentUser);

    if (article.failed) {
      if (article.error instanceof ConstraintViolationError) {
        throw error(500, "Ya existe un artículo con este título.");
      }

      throw error(500, 'No se pudo publicar el borrador, intente de nuevo más tarde.');
    }

    if (article.data && article.data.article) {
      throw redirect(303, "/article/" + article.data.article.id);
    }

    throw error(500, 'No se pudo publicar el borrador, intente de nuevo más tarde.');
  }
}