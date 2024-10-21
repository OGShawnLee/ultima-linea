import auth from "@auth/server";
import { ConstraintViolationError } from "edgedb";
import { DraftSchema } from "@draft/schema";
import { createDraft } from "@draft/server";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters"
import { error } from "@sveltejs/kit";

export async function load() {
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

    const draft = await createDraft(form.data, currentUser);

    if (draft.failed) {
      if (draft.error instanceof ConstraintViolationError) {
        return setError(form, "title", "Ya existe un borrador con este título.");
      }

      throw error(500, "No ha sido posible crear su borrador, intente más tarde.");
    }

    return { form };
  }
}