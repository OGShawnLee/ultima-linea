<script lang="ts">
  import type { Icon } from 'lucide-svelte';
  import type { ComponentType } from 'svelte';

	export let active = false;
	export let disabled: boolean;
	export let icon: string | ComponentType<Icon>;
	export let label: string;
</script>

<button
	class="size-12 grid place-content-center bg-transparent rounded-lg text-lesser-light dark:text-lesser-dark {disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:(bg-ground-3-light dark:bg-ground-3)'}"
	aria-label={label}
	data-active={active ? active : undefined}
	data-disabled={disabled ? disabled : undefined}
  tabindex={-1}
	{disabled}
	type="button"
	on:click
>
	{#if typeof icon !== 'string'}
		<svelte:component this={icon} strokeWidth={1.5} />
	{:else}
		<i class="bx text-2xl {icon}" />
	{/if}
</button>

<style>
	button[data-active] {
		--uno: 'text-summit-light dark:text-summit';
	}

	button[data-disabled] {
		--uno: 'text-middle';
	}
</style>
