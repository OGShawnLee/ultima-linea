<script lang="ts">
	export let as: 'anchor' | 'button';
	export let text: string;
	export let icon: string;
</script>

{#if as === 'anchor'}
	<div class="flex items-center gap-2">
		<i class="bx {icon} text-xl"></i>
		<a class="text-xs hover:(text-marque-light dark:text-marque)" href="/">
			{text}
		</a>
	</div>
{:else}
	<a class="button button--lesser h-8 px-4 flex items-center gap-2 rounded-full" href="/">
		<i class="bx {icon} text-xl"></i>
		<span class="text-xs font-semibold"> {text} </span>
	</a>
{/if}
