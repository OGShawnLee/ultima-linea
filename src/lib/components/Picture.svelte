<script lang="ts">
	import { concat } from "$lib";

  let className = "";
  
  export { className as class };
	export let rounded = 'rounded-xl';
	export let src = 'https://utfs.io/f/6843c429-5103-48ae-a99f-833082026e41-57p9e8.jpeg';
	export let alt = 'Placeholder Image';
  export let label = false;
</script>

<figure class={concat("w-full flex flex-col gap-4", className)}>
	<img class="w-full h-full object-cover aspect-ratio-3/2 {rounded}" {src} {alt} />
  {#if label}
    <figcaption class="md:px-16 text-xs text-lesser font-medium">
      El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD. 2017 el año en que AMLO los llamó, pero ellos no le hicieron caso. (Fuente: WEB).
    </figcaption>
  {/if}
</figure>
