<script lang="ts" generics="T extends string">
	import type { Selected } from 'bits-ui';
	import { Select } from 'bits-ui';
	import { fade } from 'svelte/transition';

	export let items: Selected<T>[];
	export let name: string | undefined = undefined;
</script>

<Select.Content
	class="dialog--background z-90 min-w-60 p-1.25 grid gap-2"
	sameWidth={false}
	align="start"
	transition={fade}
	transitionConfig={{ duration: 150 }}
	sideOffset={8}
>
	{#if name}
		{#each items as { value } (value)}
			<input type="hidden" {name} {value} />
		{/each}
	{/if}
	{#each items as { value, label } (value)}
		<Select.Item
			class="h-10 px-3 flex items-center justify-between text-lesser-light dark:text-lesser rounded-lg cursor-pointer transition duration-150 data-[highlighted]:(bg-ground-3-light dark:bg-ground-3) data-[selected]:(text-summit-light dark:text-summit)"
			{value}
			{label}
		>
			{label}
		</Select.Item>
	{/each}
</Select.Content>
