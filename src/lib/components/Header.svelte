<script lang="ts">
	export let variant: 'heading-1' | 'heading-2';
  export let sronly = false;

	const variants = {
		'heading-1': { tag: 'h1', class: 'heading-1' },
		'heading-2': { tag: 'h2', class: 'heading-2' }
	};
</script>

<header 
  class="{sronly ? "sr-only" : "relative"} w-fit flex items-center {variant == 'heading-1' ? 'h-16' : 'h-14'}"
>
	<div class="absolute top-0 left-0 h-1 w-12 bg-accent-light dark:bg-accent"></div>
	<svelte:element this={variants[variant].tag} class={variants[variant].class}>
		<slot />
	</svelte:element>
</header>
