import auth from "@auth/server";
import { ConstraintViolationError } from "edgedb";
import { DraftSchema } from "@draft/schema";
import { createDraft, findDraft, updateDraft } from "@draft/server";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters"
import { error, redirect } from "@sveltejs/kit";
import { f } from "$lib";

export async function load(event) {
  if (event.params.id) {
    const draft = await findDraft(event.params.id, auth.getAuthToken(event.cookies));

    if (draft.failed) {
      throw error(500, "No ha side posible encontrar borrador, intente más tarde.");
    }

    if (draft.data) {
      return {
        form: await superValidate(draft.data, valibot(DraftSchema))
      }
    }

    throw error(404, "El borrador que usted intenta editar no existe.");
  }

  return {
    form: await superValidate(valibot(DraftSchema))
  }
}

export const actions = {
  async default(event) {
    const currentUser = auth.getAuthToken(event.cookies);
    const form = await superValidate(event, valibot(DraftSchema));
    
    if (form.valid === false) {
      return fail(400, form);
    }
    
    if (event.params.id) {
      const draft = await updateDraft(event.params.id, form.data, currentUser);
      
      if (draft.failed) {
        throw error(500, "No ha sido posible actualizar su borrador, intente más tarde.");
      }

      if (draft.data) {
        throw redirect(303, f("/dashboard/{0}/editor", draft.data.id));
      }

      throw error(404, "El borrador que usted intenta editar no existe.");
    }

    const draft = await createDraft(form.data, currentUser);

    if (draft.failed) {
      if (draft.error instanceof ConstraintViolationError) {
        return setError(form, "title", "Ya existe un borrador con este título.");
      }

      throw error(500, "No ha sido posible crear su borrador, intente más tarde.");
    }

    throw redirect(303, f("/dashboard/{0}/editor", draft.data.id));
  }
}