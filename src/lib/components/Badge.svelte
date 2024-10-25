<script lang="ts">
  import type { Region } from "@interfaces";
  import { Earth } from "lucide-svelte";
	import { getRegionLabel } from "@categories/schema";

  export let badge = "";
  export let earth = false;
  export let region: Region | undefined = undefined;
</script>

<a class="button button--background h-8 px-4 rounded-full" href="/">
  {#if earth}
    <Earth size={18} strokeWidth={1.75} />
  {/if}
  <span class="text-xs">
    {region ? getRegionLabel(region) : badge}
  </span>
</a>