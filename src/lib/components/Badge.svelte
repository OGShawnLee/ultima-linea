<script lang="ts">
	import type { Region } from '@interfaces';
	import type { ComponentType } from 'svelte';
	import { getRegionLabel } from '@categories/schema';
	import { type Icon, BadgeCheck, CircleCheck, Earth } from 'lucide-svelte';

	export let badge = '';
	export let published = false;
	export let featured = false;
	export let region: Region | undefined = undefined;
	export let href = '';

	let icon: ComponentType<Icon>;
	$: {
		if (featured) icon = BadgeCheck;
		else if (published) icon = CircleCheck;
		else if (region) icon = Earth;
	}
	let text = badge;
	$: {
		if (featured) text = 'Destacado';
		else if (published) text = 'Publicado';
		else if (region) text = getRegionLabel(region);
	}
</script>

<a
	class="button {featured
		? 'bg-accent-light text-summit hover:bg-accent-light/75 dark:(bg-accent text-summit-light hover:bg-accent/75) font-semibold'
		: 'button--background'} h-8 px-4 rounded-full"
	href={featured ? "/articles/featured" : region ? '/articles/region/' + region.toLowerCase() : href}
>
	{#if icon}
		<svelte:component this={icon} size={18} strokeWidth={1.75} />
	{/if}
	<span class="text-xs">
		{text}
	</span>
</a>
