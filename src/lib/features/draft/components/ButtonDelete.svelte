<script lang="ts">
	import type { CardDraft } from '@draft/schema';
	import type { Builder } from 'bits-ui';
	import { Button, createToast } from '@components';
	import { ClipboardX } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

	export let draft: CardDraft;
	export let builders: Builder[] = [];
	export let dropdown = false;
	export let square = false;

	const dispatch = createEventDispatcher<{ delete: string }>();
</script>

<form
	action="/dashboard?/delete-draft"
	method="post"
	use:enhance={() => {
		return (event) => {
			if (event.result.type === 'error') {
				createToast({
					data: {
						title: 'Borrador No Eliminado',
						description: 'No ha sido posible eliminar el borrador, intente más tarde.',
						type: 'ERROR'
					}
				});
			} else dispatch('delete', draft.id);
		};
	}}
>
	<input type="hidden" name="id" value={draft.id} />
	{#if square}
		<Button {builders} {dropdown} icon={ClipboardX} label="Eliminar" size="size-10" type="submit" />
	{:else}
		<Button {builders} {dropdown} icon={ClipboardX} text="Eliminar" type="submit" />
	{/if}
</form>
