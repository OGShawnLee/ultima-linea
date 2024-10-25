import e, { getClient } from "@db";
import { useAwait } from "$lib";

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
  const news = e.select(e.News, (news) => ({
    ...CommonArticleShape(news),
    user: {
      name: true,
      display_name: true,
    },
    filter_single: { id },
  }));
  return useAwait(() => 
    e.select({
      news
    }).run(getClient())
  );
}