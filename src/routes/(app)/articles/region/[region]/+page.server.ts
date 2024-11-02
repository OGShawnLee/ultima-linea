import { getArticlesByRegion } from "@article/server";
import { getRegionLabel, isRegion } from "@categories/schema";
import { error } from "@sveltejs/kit";

export async function load(event) {
  const region = event.params.region.toUpperCase();
  
  if (isRegion(region)) {
    const articles = await getArticlesByRegion(region);
    
    if (articles.failed) {
      throw error(500, "No ha sido posible encontrar articulos por región, intente más tarde.");
    }

    return { articles: articles.data, label: getRegionLabel(region) + "es" };
  }

  throw error(404, "No ha sido posible encontrar articulos por región, por que no ha especificado una región valida.");
} 