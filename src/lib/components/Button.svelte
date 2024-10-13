<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';

	export let href: string | undefined = undefined;
	export let icon: ComponentType<Icon>;
	export let text: string | undefined = undefined;
	export let size: 'h-10' | "h-12" | 'size-10' | "size-12" = 'h-10';
	export let background = true;
</script>

{#if href}
	<a class="button {background ? "button--lesser" : "button--icon"} {size} rounded-lg" class:px-4={size.includes("h")} {href}>
		<svelte:component this={icon} strokeWidth={1.5} />
		{#if text}
			<span> {text} </span>
		{/if}
	</a>
{:else}
	<button class="button {background ? "button--lesser" : "button--icon"}  {size} rounded-lg" class:px-4={size.includes("h")} on:click>
		<svelte:component this={icon} strokeWidth={1.5} />
		{#if text}
			<span> {text} </span>
		{/if}
	</button>
{/if}
