import { getFeaturedArticles } from "@article/server";
import { error } from "@sveltejs/kit";

export async function load(event) {  
  const articles = await getFeaturedArticles();
  
  if (articles.failed) {
    throw error(500, "No ha sido posible encontrar articulos destacados, intente más tarde.");
  }

  return { articles: articles.data };
} 