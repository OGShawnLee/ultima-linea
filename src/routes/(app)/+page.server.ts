import { getArticles } from "@article/server";
import { error } from "@sveltejs/kit";

export async function load() {
  const articles = await getArticles();

  if (articles.failed) {
    throw error(500, "No ha sido posible encontrar artículos, intente más tarde.");
  }

  return { articles: articles.data };
}