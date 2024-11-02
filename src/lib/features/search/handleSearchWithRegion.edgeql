with matches := (fts::search(News, <str>$term, language := 'spa')) 
select matches.object {
  id, 
  title,
  summary,
  content, 
  image: { image_key, image_url },
  caption: { image_label, image_src },
  region,
  featured,
  created_at,
  updated_at,
  score := matches.score
} filter .region = <Region>$region order by matches.score desc;