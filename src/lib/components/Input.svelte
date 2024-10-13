<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';

	export let type: 'text' | 'password' | 'email' = 'text';
	export let label: string;
	export let placeholder: string;
	export let icon: ComponentType<Icon>;
</script>

<div class="w-full flex flex-col gap-3">
	<div class="flex items-center gap-2">
		<svelte:component this={icon} size={18} strokeWidth={1.75} />
		<div class="text-summit-light dark:text-summit text-sm font-normal">{label}</div>
	</div>
	<input
		{type}
		{placeholder}
		class="h-10 w-full px-4 border-b border-ground-3-light dark:border-ground-3 focus:(border-marque-light dark:border-marque) placeholder-text-lesser placeholder-font-normal text-summit-light dark:text-summit text-sm font-bold bg-transparent outline-none"
	/>
</div>
