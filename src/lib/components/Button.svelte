<script lang="ts">
	import type { Builder } from 'bits-ui';
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import { builderActions, getAttrs } from 'bits-ui';
	import { Tooltip } from '@components/Tooltip';

	export let background = true;
	export let inverse = false;
	export let builders: Builder[] = [];
	export let href = '';
	export let icon: ComponentType<Icon> | undefined = undefined;
	export let label = '';
	export let size: 'h-10' | 'h-12' | 'size-8' | 'size-10' | 'size-12' = 'h-10';
	export let side: 'top' | 'right' | 'bottom' | 'left' | undefined = undefined;
	export let text = '';
	export let type: 'button' | 'submit' | 'reset' = 'button';

	let finalSize: string;
	$: {
		if (size === 'h-10') finalSize = 'button--rectangle-10';
		else if (size === 'h-12') finalSize = 'button--rectangle-12';
		else if (size === 'size-8') finalSize = "button--square-8";
		else if (size === 'size-10') finalSize = 'button--square-10';
		else if (size === 'size-12') finalSize = 'button--square-12';
		else {
			throw new Error('@Button: Invalid Size');
		}
	}
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<svelte:element
			this={href ? 'a' : 'button'}
			aria-label={label}
			class="button {inverse ? 'button--inverse' : background
				? 'button--background'
				: 'button--background-less'} {finalSize} rounded-lg"
			{href}
			{type}
			use:builder.action
			use:builderActions={{ builders }}
			{...getAttrs(builders)}
			{...builder}
			on:click
		>
			<svelte:component this={icon} size={size === 'size-8' ? 16 : 24} strokeWidth={1.5} />
			{#if text}
				<span> {text} </span>
			{/if}
		</svelte:element>
	</Tooltip.Trigger>
	<Tooltip.Content {label} {side} />
</Tooltip.Root>