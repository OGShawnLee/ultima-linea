<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import Time from '$lib/components/Time.svelte';

	export let background = true;
	export let variant: 'horizontal' | 'vertical-small' | 'vertical-medium' | 'vertical-large' =
		'vertical-medium';
	export let hero = false;
</script>

{#if variant === 'horizontal'}
	<article class="md:grid grid-cols-2">
		<Picture
			class={hero ? 'order-2' : undefined}
			src="https://utfs.io/f/a2906261-9a3f-409f-90ab-c2492e37422c-asg3le.jpeg"
			rounded={background ? 'lt-md:rounded-t-xl md:(rounded-l-xl)' : 'rounded-xl'}
		/>
		<div
			class="{hero
				? 'order-1 p-6 md:(p-8 pl-0)'
				: 'p-6 md:p-8'} flex flex-col justify-center gap-4 md:gap-6 rounded-r-xl"
			class:bg-ground-1={background}
		>
			<div class="flex items-center gap-4 flex-wrap">
				<Badge badge="Nacional" earth />
				<Badge badge="Política" />
			</div>
			<a class="hover:text-sky-400 text-white" href="/article">
				<h3 class="{hero ? 'font-extrabold lg:text-4xl' : 'font-semibold'} text-2xl md:text-3xl">
					El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD.
					2017 el año en que AMLO los llamó, pero ellos no le hicieron caso
				</h3>
			</a>
			<p>
				Después de muchos años, el PRD ha perdido su registro a nivel nacional. Obrador se despide
				emotivamente y sin rencores hacia el partido que alguna vez figuro como la casa del actual
				presidente, Andres Manuel López Obrador.
			</p>
			<Time />
		</div>
	</article>
{:else if variant === 'vertical-small'}
	<article class="p-6 grid gap-4">
		<div class="flex items-center gap-4 flex-wrap">
			<Badge badge="Nacional" earth />
			<Badge badge="Política" />
		</div>
		<a class="hover:text-sky-400 text-white" href="/article">
			<h3 class="text-xl font-semibold">
				El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD. 2017
				el año en que AMLO los llamó, pero ellos no le hicieron caso
			</h3>
		</a>
		<Time />
	</article>
{:else}
	<article>
		<Picture rounded={background ? "rounded-t-xl" : "rounded-xl"} />
		<div
			class="{variant === 'vertical-large'
				? 'p-6 gap-4 md:(p-8 gap-6)'
				: 'p-6 gap-4'} grid bg-ground-1 rounded-b-xl"
		>
			<div class="flex items-center gap-4 flex-wrap">
				<Badge badge="Nacional" earth />
				<Badge badge="Política" />
			</div>
			<a class="hover:text-sky-400 text-white" href="/article">
				<h3
					class="{variant === 'vertical-large' ? 'text-xl lg:text-3xl' : 'text-xl'} font-semibold"
				>
					El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD.
					2017 el año en que AMLO los llamó, pero ellos no le hicieron caso
				</h3>
			</a>
			{#if variant === 'vertical-large'}
				<p>
					Después de muchos años, el PRD ha perdido su registro a nivel nacional. Obrador se despide
					emotivamente y sin rencores hacia el partido que alguna vez figuro como la casa del actual
					presidente, Andres Manuel López Obrador.
				</p>
			{/if}
			<Time />
		</div>
	</article>
{/if}
