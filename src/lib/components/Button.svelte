<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';

	export let href: string | undefined = undefined;
	export let icon: ComponentType<Icon>;
	export let text: string | undefined = undefined;
	export let size: 'h-10' | 'size-10' = 'h-10';
</script>

{#if href}
	<a class="button button--lesser {size} rounded-lg" class:px-4={size === 'h-10'} {href}>
		<svelte:component this={icon} />
		{#if text}
			<span> {text} </span>
		{/if}
	</a>
{:else}
	<button class="button button--lesser {size} rounded-lg" class:px-4={size === 'h-10'} on:click>
		<svelte:component this={icon} />
		{#if text}
			<span> {text} </span>
		{/if}
	</button>
{/if}
