<script lang="ts">
	import type { CardCaption, CardImage } from '@picture/schema';
	import { concat } from '$lib';

	let className = '';

	export { className as class };
	export let rounded = 'rounded-xl';
  export let image:  Nullish<CardImage> = {
    image_key: '',
    image_url: 'https://utfs.io/f/6843c429-5103-48ae-a99f-833082026e41-57p9e8.jpeg',
  }
  export let caption: Nullish<CardCaption> = {
    image_label: 'El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD. 2017 el año en que AMLO los llamó, pero ellos no le hicieron caso.',
    image_src: 'WEB'
  }
	export let label = false;
	export let padded = true;
</script>

{#if image?.image_url}
  <figure class={concat('w-full flex flex-col gap-4', className)}>
    <img
      class="w-full h-full object-cover aspect-ratio-3/2 {rounded}"
      src={image?.image_url}
      alt={caption?.image_label}
    />
    {#if label}
      <figcaption class="{padded ? 'md:px-16' : 'px-4'} text-xs leading-loose text-lesser-light dark:text-lesser font-medium">
        {caption?.image_label}
      </figcaption>
    {/if}
  </figure>
{/if}