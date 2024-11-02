import auth from "@auth/server";
import { findDraftPage } from "@draft/server";
import { error } from "@sveltejs/kit";

export async function load(event) {
  const currentUser = await auth.getAuth(event.cookies);  
  const page = await findDraftPage(event.params.id, currentUser);

  if (page.failed) {
    throw error(500, "No ha sido posible encontrar borrador, intente más tarde.")
  }

  if (page.data.draft) {
    return { page: page.data  as StrictObject<typeof page.data> }
  }

  throw error(404, "No ha sido posible encontrar borrador por que no existe.")
}