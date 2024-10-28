<script lang="ts">
	import type { CardDraft } from '@draft/schema';
	import type { Builder } from 'bits-ui';
	import { Button, createToast } from '@components';
	import { ClipboardPaste } from 'lucide-svelte';
	import { applyAction, enhance } from '$app/forms';

	export let draft: CardDraft;
	export let builders: Builder[] = [];
	export let dropdown = false;
	export let square = false;
</script>

{#if draft.can_be_published && draft.is_different_from_article}
	<form
		action="/dashboard?/update-article"
		method="post"
		use:enhance={() => {
			return (event) => {
				if (event.result.type === 'error') {
					createToast({
						data: {
							title: 'Artículo No Actualizado',
							description: event.result.error.message,
							type: 'ERROR'
						}
					});
				} else applyAction(event.result);
			};
		}}
	>
		<input type="hidden" name="id" value={draft.id} />
		{#if square}
			<Button
				{builders}
				{dropdown}
				icon={ClipboardPaste}
				label="Publicar Cambios"
				size="size-10"
				type="submit"
			/>
		{:else}
			<Button {builders} {dropdown} icon={ClipboardPaste} text="Publicar Cambios" type="submit" />
		{/if}
	</form>
{/if}
