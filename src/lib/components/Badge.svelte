<script lang="ts">
  import { Earth } from "lucide-svelte";

  export let badge: string;
  export let earth = false;
</script>

<a class="button button--lesser h-8 px-4 flex items-center gap-2 rounded-full" href="/">
  {#if earth}
    <Earth size={18} strokeWidth={1.75} />
  {/if}
  <span class="text-xs font-semibold">
    {badge}
  </span>
</a>