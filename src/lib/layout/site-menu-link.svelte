<script lang="ts">
	import type { ComponentType } from "svelte";
	import { Button } from "@components";
  import { Icon } from "lucide-svelte";

	export let href: string;
	export let icon: ComponentType<Icon>;
	export let label: string;
	export let square = false;
</script>

{#if square}
  <Button {href} {icon} {label} size="size-10"/>
{:else}
	<a
		class="h-10 flex items-center justify-between outline-none text-lesser-light dark:text-lesser focus:(text-summit-light dark:text-summit)"
		{href}
		on:click
	>
		{label}
    <svelte:component this={icon} strokeWidth={1.5}/>
	</a>
{/if}