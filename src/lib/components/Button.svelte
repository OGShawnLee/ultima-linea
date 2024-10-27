<script lang="ts">
	import type { Builder } from 'bits-ui';
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import { builderActions, getAttrs } from 'bits-ui';
	import { Tooltip } from '@components/Tooltip';

	export let background = true;
	export let builders: Builder[] = [];
	export let href = '';
	export let icon: ComponentType<Icon> | undefined = undefined;
	export let inverse = false;
	export let dropdown = false;
	export let label = '';
	export let size: 'h-10' | 'h-12' | 'size-8' | 'size-10' | 'size-12' = 'h-10';
	export let side: 'top' | 'right' | 'bottom' | 'left' | undefined = undefined;
	export let text = '';
	export let type: 'button' | 'submit' | 'reset' = 'button';

	let finalSize: string;
	$: {
		if (size === 'h-10') finalSize = 'button--rectangle-10';
		else if (size === 'h-12') finalSize = 'button--rectangle-12';
		else if (size === 'size-8') finalSize = 'button--square-8';
		else if (size === 'size-10') finalSize = 'button--square-10';
		else if (size === 'size-12') finalSize = 'button--square-12';
		else {
			throw new Error('@Button: Invalid Size');
		}
	}

	let finalClassName: string;
	$: if (dropdown) {
		finalClassName = "button-dropdown-item"; 
	} else if (inverse) {
		finalClassName = "button button--inverse";
	} else if (background) {
		finalClassName = "button button--background";
	} else {
		finalClassName = "button button--background-less";
	}
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<svelte:element
			this={href ? 'a' : 'button'}
			aria-label={label}
			class="{finalClassName} {finalSize} rounded-lg"
			{href}
			{type}
			use:builder.action
			use:builderActions={{ builders }}
			{...getAttrs(builders)}
			{...builder}
			on:click
		>
			<svelte:component class={dropdown ? "text-common-light dark:text-common" : undefined} this={icon} size={dropdown ? 20 : size === 'size-8' ? 16 : 24} strokeWidth={1.5} />
			{#if text}
				<span> {text} </span>
			{/if}
		</svelte:element>
	</Tooltip.Trigger>
	<Tooltip.Content {label} {side} />
</Tooltip.Root>
