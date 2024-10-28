import e, { getClient } from "@db";
import { useAwait } from "$lib";
import type { Region } from "@interfaces";

const CommonArticleShape = e.shape(e.News, () => ({
  id: true,
  title: true,
  summary: true,
  content: true,
  text: true,
  image: { image_key: true, image_url: true },
  caption: { image_label: true, image_src: true },
  region: true,
  created_at: true,
  updated_at: true,
}));

export function findArticlePage(id: string) {
  const article = e.select(e.News, (article) => ({
    ...CommonArticleShape(article),
    user: {
      name: true,
      display_name: true,
    },
    filter_single: { id },
  }));
  const recent = e.select(e.News, (article) => ({
    ...CommonArticleShape(article),
    user: {
      name: true,
      display_name: true,
    },
    limit: 3,
    order_by: {
      expression: article.created_at,
      direction: e.DESC,
    },
    filter: e.op(article.id, "!=", e.uuid(id)),
  }))
  return useAwait(() => 
    e.select({
      article,
      recent,
    }).run(getClient())
  );
}

export function getArticlesByRegion(region: Region) {
  return useAwait(() => (
    e.select(e.News, (article) => ({
      ...CommonArticleShape(article),
      limit: 6,
      order_by: {
        expression: article.created_at,
        direction: e.DESC,
      },
      filter: e.op(article.region, "=", e.Region[region]),
    })).run(getClient())
  ));
}