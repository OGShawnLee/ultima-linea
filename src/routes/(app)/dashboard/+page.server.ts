import auth from '@auth/server';
import { AuthTokenSchema } from '@auth/schema';
import { DraftFiltersSchema } from '@draft/schema';
import { deleteDraft, getDrafts, getDraftsByState, publishDraft, updateDraftArticle } from '@draft/server';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { error, redirect } from '@sveltejs/kit';
import { ConstraintViolationError } from 'edgedb';

export async function load(event) {
  const form = await superValidate(event.url.searchParams, valibot(DraftFiltersSchema));
  const drafts = await getDraftsByState(await auth.getAuth(event.cookies), form.data["draft-state"]);

  if (drafts.failed) {
    throw error(500, "No ha sido posible cargar sus borradores, intente más tarde.");
  }

  return { drafts: drafts.data, form, "draft-state": form.data["draft-state"] };
}

export const actions = {
  "delete-draft": async (event) => {
    const currentUser = await auth.getAuth(event.cookies);
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
    const currentUser = await auth.getAuth(event.cookies);
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
  },
  "update-article": async (event) => {
    const currentUser = await auth.getAuth(event.cookies);
    const form = await superValidate(event, valibot(AuthTokenSchema));

    if (form.valid === false) {
      return fail(400, form);
    }

    const article = await updateDraftArticle(form.data.id, currentUser);

    if (article.failed) {
      throw error(500, 'No se pudo actualizar el artículo, intente de nuevo más tarde.');
    }

    if (article.data) {
      throw redirect(303, "/article/" + article.data.id);
    }

    throw error(500, 'No se pudo actualizar el artículo, intente de nuevo más tarde.');
  }
}