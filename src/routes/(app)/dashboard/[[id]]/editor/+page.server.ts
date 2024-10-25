import auth from "@auth/server";
import { ConstraintViolationError } from "edgedb";
import { CategoriesSchema } from "@categories/schema";
import { DraftSchema } from "@draft/schema";
import { PictureSchema } from "@picture/schema";
import { uploadFile, uploadthing } from "@server/uploadthing";
import { addDraftCategories, addDraftPicture, createDraft, findDraft, updateDraft, updateDraftPicture } from "@draft/server";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters"
import { error, redirect } from "@sveltejs/kit";
import { f, isNullish } from "$lib";
import { useAPI } from "$lib/api";

export async function load(event) {
  if (event.params.id) {
    const draft = await findDraft(event.params.id, auth.getAuthToken(event.cookies));

    if (draft.failed) {
      throw error(500, "No ha side posible encontrar borrador, intente más tarde.");
    }

    if (draft.data) {
      return {
        hasDraft: true,
        categories: await superValidate({ region: draft.data.region ?? "NATIONAL" }, valibot(CategoriesSchema)),
        form: await superValidate(draft.data, valibot(DraftSchema)),
        picture: await superValidate({
          "image-label": draft.data.caption?.image_label ?? draft.data.title + ".",
          "image-src": draft.data.caption?.image_src ?? "WEB",
          "image-url": draft.data.image?.image_url,
          "image-key": draft.data.image?.image_key,
        }, valibot(PictureSchema))
      }
    }

    throw error(404, "El borrador que usted intenta editar no existe.");
  }

  return {
    hasDraft: false,
    categories: await superValidate(valibot(CategoriesSchema)),
    form: await superValidate(valibot(DraftSchema)),
    picture: await superValidate(valibot(PictureSchema))
  }
}

export const actions = {
  "upload-draft": async (event) => {
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
  },
  "upload-picture": async (event) => {
    const currentUser = auth.getAuthToken(event.cookies);
    const form = await superValidate(event, valibot(PictureSchema));

    if (form.valid === false) {
      return fail(400, form);
    }

    if (isNullish(event.params.id)) {
      throw error(400, "No se ha especificado un borrador para añadir la imagen.");
    }

    if (isNullish(form.data["image-file"]) && isNullish(form.data["image-key"])) {
      throw error(400, "No se ha especificado un archivo de imagen.");
    }

    if (form.data["image-file"]) {
      const image = await uploadFile(form.data["image-file"]);

      if (image.error) {
        return fail(500, { form });
      }

      if (form.data["image-key"]) {
        // TODO: ADD CRON JOB TO DELETE ORPHAN IMAGES
        useAPI("/api/picture/orphan", null, event.fetch);
      }

      const draft = await addDraftPicture(event.params.id, {
        "image-label": form.data["image-label"],
        "image-src": form.data["image-src"],
        "image-url": image.data.url,
        "image-key": image.data.key
      }, currentUser);

      if (draft.failed) {
        uploadthing.deleteFiles([image.data.key]);
        return fail(500, { form });
      }
    }

    if (form.data["image-key"]) {
      const draft = await updateDraftPicture(event.params.id, {
        "image-label": form.data["image-label"],
        "image-src": form.data["image-src"],
      }, currentUser);

      if (draft.failed) {
        return fail(500, { form });
      }

      if (isNullish(draft.data)) {
        return fail(500, { form });
      }
    }
  },
  "upload-categories": async (event) => {
    const currentUser = auth.getAuthToken(event.cookies);
    const form = await superValidate(event, valibot(CategoriesSchema));

    if (form.valid === false) {
      return fail(400, form);
    }

    if (isNullish(event.params.id)) {
      throw error(400, "No se ha especificado un borrador para añadir la imagen.");
    }

    const draft = await addDraftCategories(event.params.id, form.data, currentUser);

    if (draft.failed) {
      throw error(500, "No ha sido posible actualizar las categorías de su borrador, intente más tarde");
    }
  }
}