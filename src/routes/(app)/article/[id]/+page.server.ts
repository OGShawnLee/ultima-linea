import { findArticlePage } from '@article/server';
import { error } from '@sveltejs/kit';

export async function load(event) {
  const page = await findArticlePage(event.params.id);
  
  if (page.failed) {
    throw error(500, "No ha sido posible cargar la noticia, intente más tarde.");
  }

  if (page.data.article) {
    return { page: page.data as StrictObject<typeof page.data> };
  }

  throw error(404, "No ha sido posible encontrar borrador por que no existe.")
}