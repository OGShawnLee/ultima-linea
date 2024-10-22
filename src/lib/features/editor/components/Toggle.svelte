<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import { Tooltip } from '@components';

	export let active = false;
	export let disabled: boolean;
	export let icon: string | ComponentType<Icon>;
	export let label: string;
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<button
			class="size-12 grid place-content-center bg-transparent rounded-lg text-middle {disabled
				? 'cursor-not-allowed'
				: 'cursor-pointer hover:(bg-ground-3-light dark:bg-ground-3)'}"
			aria-label={label}
			data-active={active ? active : undefined}
			data-disabled={disabled ? disabled : undefined}
			{disabled}
			tabindex={-1}
			type="button"
			use:builder.action
			{...builder}
			on:click
		>
			{#if typeof icon !== 'string'}
				<svelte:component this={icon} strokeWidth={2} />
			{:else}
				<i class="bx text-2xl {icon}" />
			{/if}
		</button>
	</Tooltip.Trigger>
	<Tooltip.Content {label} />
</Tooltip.Root>

<style>
	button[data-active] {
		--uno: 'text-summit-light dark:text-summit';
	}

	button[data-disabled] {
		--uno: 'text-ground-3-light dark:text-ground-3';
	}
</style>
