<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';

	export let id: string;
	export let type: 'text' | 'password' | 'email' = 'text';
	export let label: string;
	export let placeholder: string;
	export let icon: ComponentType<Icon>;
	export let value: string | null = '';

	function handleInput(this: HTMLInputElement) {
		value = this.value;
	}
</script>

<div class="w-full flex flex-col gap-3">
	<div class="flex items-center gap-2">
		<svelte:component this={icon} size={18} strokeWidth={1.75} />
		<label class="text-summit-light dark:text-summit text-sm font-normal" for={id}>{label}</label>
	</div>
	<input
		class="h-10 w-full px-4 bg-ground-0-light dark:bg-ground-0 border border-ground-3-light dark:border-ground-3 rounded-xl placeholder-text-middle placeholder-font-normal font-bold text-sm text-summit-light dark:text-summit"
		name={id}
		{type}
		{placeholder}
		required
		on:input={handleInput}
	/>
</div>
