with matches := (fts::search(News, <str>$term, language := 'spa')) 
select matches.object {
  id, 
  title,
  summary,
  content, 
  image: { image_key, image_url },
  caption: { image_label, image_src },
  region,
  created_at,
  updated_at,
  score := matches.score
} order by matches.score desc;