<script lang="ts">
	import Button from '@components/Button.svelte';
	import { Dialog } from 'bits-ui';
	import { X } from 'lucide-svelte';
	import { fade, fly, scale } from 'svelte/transition';

	export let open: boolean;
	export let title: string;
</script>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay class="dialog-overlay" transition={fade} />
		<Dialog.Content
			class="dialog dialog--background"
			transition={fly}
			transitionConfig={{ y: 30 }}
		>
			<header
				class="h-20 px-8 flex items-center justify-between border-b border-ground-3-light dark:border-ground-3"
			>
				<Dialog.Title class="heading-2">{title}</Dialog.Title>
				<Dialog.Close asChild let:builder>
					<Button
						builders={[builder]}
						icon={X}
						inverse
						label="Cerrar Panel"
						side="left"
						size="size-10"
					/>
				</Dialog.Close>
			</header>
			<slot />
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
