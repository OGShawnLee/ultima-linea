import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			"@article": "src/lib/features/article",
			"@auth": "src/lib/features/auth",
			"@categories": "src/lib/features/categories",
			"@components": "src/lib/components",
			"@draft": "src/lib/features/draft",
			"@editor": "src/lib/features/editor",
			"@layout": "src/lib/layout",
			"@picture": "src/lib/features/picture",
			"@search": "src/lib/features/search",
			"@schema": "src/lib/schema",
			"@server": "src/lib/server",
			"@state": "src/lib/state",
			"@db": "src/lib/server/db",
			"@interfaces": "src/lib/interfaces",
			"@queries": "src/lib/queries",
			"@user": "src/lib/features/user",
		}
	}
};

export default config;
