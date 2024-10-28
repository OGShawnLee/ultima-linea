<script lang="ts">
	import type { Region } from '@interfaces';
	import type { ComponentType } from 'svelte';
	import { type Icon, Earth } from 'lucide-svelte';
	import { getRegionLabel } from '@categories/schema';

	export let badge = '';
	export let earth = false;
	export let href = '';
	export let icon: ComponentType<Icon> | undefined = undefined;
	export let region: Region | undefined = undefined;
</script>

<a
	class="button button--background h-8 px-4 rounded-full"
	href={region ? '/articles/region/' + region.toLowerCase() : href}
>
	{#if earth || icon}
		<svelte:component this={icon ? icon : Earth} size={18} strokeWidth={1.75} />
	{/if}
	<span class="text-xs">
		{region ? getRegionLabel(region) : badge}
	</span>
</a>