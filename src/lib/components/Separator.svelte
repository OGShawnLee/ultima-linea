<script lang="ts">
	import { Separator } from "bits-ui";

	let className = "";

	export { className as class };
	export let orientation: "horizontal" | "vertical" = "horizontal";
</script>

{#if orientation === "horizontal"}
	<Separator.Root class="{className} h-0.25 block bg-ground-3-light dark:bg-ground-3" />
{:else}
	<Separator.Root class="{className} h-6 min-w-0.5 block bg-ground-3-light dark:bg-ground-3" />
{/if}