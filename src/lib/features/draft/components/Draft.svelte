<script lang="ts">
	import type { CardDraft } from '@draft/schema';
	import PublishButton from "@draft/components/ButtonPublish.svelte";
	import { getRegionLabel } from '@categories/schema';
	import { Badge, Button, Picture, Time } from '@components';
	import { ClipboardPen, ClipboardX } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

	export let background = true;
	export let draft: CardDraft;

	const dispatch = createEventDispatcher<{ delete: string }>();
</script>

<article>
	<Picture
		rounded={background ? 'rounded-t-xl' : 'rounded-xl'}
		image={draft.image}
		caption={draft.caption}
	/>
	<div
		class="p-8 grid gap-6 {background
			? 'bg-ground-1-light dark:bg-ground-1'
			: 'bg-transparent'} rounded-xl"
	>
		{#if draft.region}
			<div class="flex items-center gap-2">
				<Badge earth badge={getRegionLabel(draft.region)} />
			</div>
		{/if}
		<a href="/dashboard/draft/{draft.id}" class="anchor-hover heading">
			<h2 class="font-semibold text-2xl">{draft.title}</h2>
		</a>
		{#if draft.summary}
			<p>{draft.summary}</p>
		{/if}
		<Time datetime={draft.updated_at} />
		<div class="flex items-center gap-2 flex-wrap">
			<Button href="/dashboard/{draft.id}/editor" icon={ClipboardPen} text="Editar" />
			{#if draft.can_be_published}
				<PublishButton id={draft.id} />
			{/if}
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
				<Button icon={ClipboardX} text="Eliminar" type="submit" />
			</form>
		</div>
	</div>
</article>
