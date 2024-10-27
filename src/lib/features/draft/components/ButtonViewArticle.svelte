<script lang="ts">
	import type { Builder } from 'bits-ui';
	import type { CardDraft } from '@draft/schema';
	import { Button } from '@components';
	import { Newspaper } from 'lucide-svelte';

	export let draft: CardDraft;
	export let builders: Builder[] = [];
	export let dropdown = false;
</script>

{#if draft.article}
	<Button
		{builders}
		{dropdown}
		href="/article/{draft.article.id}"
		icon={Newspaper}
		text="Ver Artículo"
	/>
{/if}
