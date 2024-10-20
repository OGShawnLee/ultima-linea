<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import { Badge, Button, Picture, Time } from '@components';

	export let background = false;
	export let variant: 'hero' | 'horizontal' | 'large' | 'medium' | 'small';
</script>

{#if variant === 'hero'}
	<article class="lg:(grid grid-cols-2 gap-8)">
		<Picture
			class="order-2"
			src="https://utfs.io/f/a2906261-9a3f-409f-90ab-c2492e37422c-asg3le.jpeg"
			rounded="rounded-xl"
		/>
		<div class="grid p-6 gap-6 md:pt-12 lg:p-0">
			<header class="contents">
				<div class="flex items-center gap-4 flex-wrap">
					<Badge badge="Nacional" earth />
					<Badge badge="Política" />
				</div>
				<a class="anchor-hover heading" href="/article">
					<h2 class="font-semibold text-2xl md:(font-extrabold text-4xl)">
						El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD.
						2017 el año en que AMLO los llamó, pero ellos no le hicieron caso
					</h2>
				</a>
			</header>
			<p>
				Después de muchos años, el PRD ha perdido su registro a nivel nacional. Obrador se despide
				emotivamente y sin rencores hacia el partido que alguna vez figuró como la casa del actual
				presidente, Andres Manuel López Obrador.
			</p>
			<Time />
			<div class="max-w-fit">
				<Button icon={ArrowRight} href="/article" text="Leer más" />
			</div>
		</div>
	</article>
{/if}

{#if variant === 'horizontal'}
	<article class="lg:(grid grid-cols-2)">
		<Picture
			src="https://utfs.io/f/a2906261-9a3f-409f-90ab-c2492e37422c-asg3le.jpeg"
			rounded={background ? 'lt-lg:rounded-t-xl lg:rounded-l-lg' : 'rounded-xl'}
		/>
		<div
			class="grid place-content-center p-6 gap-6 md:pt-12 lg:p-6"
			class:card--background={background}
			class:rounded-r-xl={background}
			class:rounded-b-xl={background}
		>
			<header class="contents">
				<div class="flex items-center gap-4 flex-wrap">
					<Badge badge="Nacional" earth />
					<Badge badge="Política" />
				</div>
				<a class="anchor-hover heading" href="/article">
					<h2 class="font-semibold text-2xl md:text-3xl">
						El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD.
						2017 el año en que AMLO los llamó, pero ellos no le hicieron caso
					</h2>
				</a>
			</header>
			<p>
				Después de muchos años, el PRD ha perdido su registro a nivel nacional. Obrador se despide
				emotivamente y sin rencores hacia el partido que alguna vez figuró como la casa del actual
				presidente, Andres Manuel López Obrador.
			</p>
			<Time />
		</div>
	</article>
{/if}

{#if variant === 'large'}
	<article>
		<Picture rounded={background ? 'rounded-t-xl' : 'rounded-xl'} />
		<div class="grid p-8 gap-6" class:card--background={background} class:rounded-b-xl={background}>
			<header class="contents">
				<div class="flex items-center gap-4 flex-wrap">
					<Badge badge="Nacional" earth />
					<Badge badge="Política" />
				</div>
				<a class="anchor-hover heading" href="/article">
					<h2 class="font-semibold text-2xl md:text-3xl">
						El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD.
						2017 el año en que AMLO los llamó, pero ellos no le hicieron caso
					</h2>
				</a>
			</header>
			<p>
				Después de muchos años, el PRD ha perdido su registro a nivel nacional. Obrador se despide
				emotivamente y sin rencores hacia el partido que alguna vez figuró como la casa del actual
				presidente, Andres Manuel López Obrador.
			</p>
			<Time />
		</div>
	</article>
{/if}

{#if variant === 'medium'}
	<article>
		<Picture rounded={background ? 'rounded-t-xl' : 'rounded-xl'} />
		<div class="grid p-8 gap-6" class:card--background={background} class:rounded-b-xl={background}>
			<header class="contents">
				<div class="flex items-center gap-4 flex-wrap">
					<Badge badge="Nacional" earth />
					<Badge badge="Política" />
				</div>
				<a class="anchor-hover heading" href="/article">
					<h2 class="font-semibold text-2xl">
						El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD.
						2017 el año en que AMLO los llamó, pero ellos no le hicieron caso
					</h2>
				</a>
			</header>
			<Time />
		</div>
	</article>
{/if}

{#if variant === 'small'}
	<article>
		<div class="grid p-8 gap-6">
			<header class="contents">
				<div class="flex items-center gap-4 flex-wrap">
					<Badge badge="Nacional" earth />
					<Badge badge="Política" />
				</div>
				<a class="anchor-hover heading" href="/article">
					<h2 class="font-semibold text-2xl">
						El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD.
						2017 el año en que AMLO los llamó, pero ellos no le hicieron caso
					</h2>
				</a>
			</header>
			<Time />
		</div>
	</article>
{/if}

<style>
	.card--background {
		--uno: 'bg-ground-1-light dark:bg-ground-1';
	}
</style>
