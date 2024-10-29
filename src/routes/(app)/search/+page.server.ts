import { SearchSchema } from '@search/schema';
import { getSearchResults } from '@search/server';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

export async function load(event) {
  const form = await superValidate(event.url.searchParams, valibot(SearchSchema));

  if (form.valid === false) {
    return { form, term: form.data.term, results: [] };
  }

  const results = await getSearchResults(form.data);

  if (results.failed) {
    return { form, term: form.data.term, results: [] };
  }

  return { form, term: form.data.term, results: results.data };
}