<script lang="ts">
	import type { CardDraft } from '@draft/schema';
	import { Button, Picture, Time } from '@components';
	import { ClipboardPen, ClipboardX } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

	export let draft: CardDraft;

	const dispatch = createEventDispatcher<{ delete: string }>();
</script>

<article>
	<Picture rounded="rounded-t-xl" image={draft.image} caption={draft.caption} />
	<div
		class="p-8 grid gap-6 bg-ground-1-light dark:bg-ground-1 {draft.image
			? 'rounded-b-xl'
			: 'rounded-xl'}"
	>
		<a href="/dashboard/{draft.id}/editor" class="anchor-hover heading">
			<h2 class="font-semibold text-2xl">{draft.title}</h2>
		</a>
		{#if draft.summary}
			<p>{draft.summary}</p>
		{/if}
		<Time datetime={draft.updated_at} />
		<div class="flex items-center gap-4 flex-wrap">
			<Button href="/dashboard/{draft.id}/editor" icon={ClipboardPen} text="Editar" />
			<form
				action="/dashboard?/delete-draft"
				method="post"
				use:enhance={() => {
					return (event) => {
						if (event.result.type === 'success') {
							dispatch('delete', draft.id);
						}
					};
				}}
			>
				<input type="hidden" name="id" value={draft.id} />
				<Button icon={ClipboardX} text="Eliminar" />
			</form>
		</div>
	</div>
</article>
