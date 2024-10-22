<script lang="ts">
	import type { Builder } from 'bits-ui';
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import { builderActions, getAttrs } from 'bits-ui';
	import { Tooltip } from '@components/Tooltip';

	export let builders: Builder[] = [];
	export let href: string | undefined = undefined;
	export let icon: ComponentType<Icon>;
	export let text: string | undefined = undefined;
	export let size: 'h-10' | 'h-12' | 'size-10' | 'size-12' = 'h-10';
	export let background = true;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let label = '';
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		{#if href}
			<a
				class="button {background
					? 'button--background'
					: 'button--backgroundless'} {size} rounded-lg"
				class:button--rectangle={size.includes('h')}
				use:builder.action
				use:builderActions={{ builders }}
				{...getAttrs(builders)}
				{...builder}
				aria-label={label}
				{href}
			>
				<svelte:component this={icon} strokeWidth={1.5} />
				{#if text}
					<span> {text} </span>
				{/if}
			</a>
		{:else}
			<button
				class="button {background
					? 'button--background'
					: 'button--backgroundless'}  {size} rounded-lg"
				class:button--rectangle={size.includes('h')}
				use:builder.action
				use:builderActions={{ builders }}
				{...getAttrs(builders)}
				{...builder}
				aria-label={label}
				{type}
				on:click
			>
				<svelte:component this={icon} strokeWidth={1.5} />
				{#if text}
					<span> {text} </span>
				{/if}
			</button>
		{/if}
	</Tooltip.Trigger>
	<Tooltip.Content {label} />
</Tooltip.Root>

<style>
	.button {
		--uno: 'flex items-center justify-center gap-2';
	}

	.button--rectangle {
		--uno: 'px-4';
	}

	.button--background {
		--uno: 'bg-ground-3-light dark:bg-ground-3 text-summit-light dark:text-summit hover:(bg-ground-4-light dark:bg-ground-4)';
	}

	.button--backgroundless {
		--uno: 'text-summit-light dark:text-summit hover:(text-lesser-light darK:text-lesser)';
	}
</style>
