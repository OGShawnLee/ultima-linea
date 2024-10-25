<script lang="ts">
	import { Button, createToast } from '@components';
	import { ClipboardPaste } from 'lucide-svelte';
	import { applyAction, enhance } from '$app/forms';

	export let id: string;
</script>

<form
	action="/dashboard?/publish-draft"
	method="post"
	use:enhance={() => {
		return (event) => {
			if (event.result.type === 'error') {
				createToast({
					data: {
						title: 'Borrador No Publicado',
						description: event.result.error.message,
						type: 'ERROR'
					}
				});
			} else applyAction(event.result);
		};
	}}
>
	<input type="hidden" name="id" value={id} />
	<Button icon={ClipboardPaste} text="Publicar" type="submit" />
</form>
