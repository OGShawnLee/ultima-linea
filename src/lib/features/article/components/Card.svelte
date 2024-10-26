<script lang="ts">
	import type { CardArticle } from '@article/schema';
	import { ArrowRight } from 'lucide-svelte';
	import { Badge, Button, Picture, Time } from '@components';

	export let article: CardArticle | undefined = undefined;
	export let background = false;
	export let variant: 'hero' | 'horizontal' | 'large' | 'medium' | 'small';

	const placeholder = {
		title:
			'El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD. 2017 el año en que AMLO los llamó, pero ellos no le hicieron caso',
		summary:
			'Después de muchos años, el PRD ha perdido su registro a nivel nacional. Obrador se despide emotivamente y sin rencores hacia el partido que alguna vez figuró como la casa del actual presidente, Andres Manuel López Obrador.'
	};
</script>

{#if variant === 'hero'}
	<article class="lg:(grid grid-cols-2 gap-8)">
		<Picture
			class="order-2"
			caption={article?.caption}
			image={article?.image}
			rounded="rounded-xl"
		/>
		<div class="p-6 grid content-start gap-6 md:pt-12 lg:p-0">
			<header class="contents">
				<div class="flex items-center gap-4 flex-wrap">
					<Badge region={article?.region ?? "NATIONAL"} earth />
					<Badge badge="Política" />
				</div>
				<a class="anchor-hover heading" href={article?.id ? '/article/' + article.id : '/article'}>
					<h2 class="font-semibold text-2xl md:(font-extrabold text-4xl)">
						{article?.title ?? placeholder.title}
					</h2>
				</a>
			</header>
			<p>
				{article?.summary ?? placeholder.summary}
			</p>
			<Time datetime={article?.created_at} />
			<div class="max-w-fit">
				<Button
					icon={ArrowRight}
					href={article?.id ? '/article/' + article.id : '/article'}
					text="Leer más"
				/>
			</div>
		</div>
	</article>
{/if}

{#if variant === 'horizontal'}
	<article class="lg:(grid grid-cols-2)">
		<Picture
			caption={article?.caption}
			image={article?.image}
			rounded={background ? 'lt-lg:rounded-t-xl lg:rounded-l-lg' : 'rounded-xl'}
		/>
		<div
			class=" p-6 grid content-start gap-6 md:pt-12 lg:p-6"
			class:card--background={background}
			class:rounded-r-xl={background}
			class:rounded-b-xl={background}
		>
			<header class="contents">
				<div class="flex items-center gap-4 flex-wrap">
					<Badge region={article?.region ?? "NATIONAL"} earth />
					<Badge badge="Política" />
				</div>
				<a class="anchor-hover heading" href={article?.id ? '/article/' + article.id : '/article'}>
					<h2 class="font-semibold text-2xl md:text-3xl">
						{article?.title ?? placeholder.title}
					</h2>
				</a>
			</header>
			<p>
				{article?.summary ?? placeholder.summary}
			</p>
			<Time datetime={article?.created_at} />
		</div>
	</article>
{/if}

{#if variant === 'large'}
	<article>
		<Picture
			caption={article?.caption}
			image={article?.image}
			rounded={background ? 'rounded-t-xl' : 'rounded-xl'}
		/>
		<div class="p-8 grid gap-6" class:card--background={background} class:rounded-b-xl={background}>
			<header class="contents">
				<div class="flex items-center gap-4 flex-wrap">
					<Badge region={article?.region ?? "NATIONAL"} earth />
					<Badge badge="Política" />
				</div>
				<a class="anchor-hover heading" href={article?.id ? '/article/' + article.id : '/article'}>
					<h2 class="font-semibold text-2xl md:text-3xl">
						{article?.title ?? placeholder.title}
					</h2>
				</a>
			</header>
			<p>
				{article?.summary ?? placeholder.summary}
			</p>
			<Time datetime={article?.created_at} />
		</div>
	</article>
{/if}

{#if variant === 'medium'}
	<article>
		<Picture
			caption={article?.caption}
			image={article?.image}
			rounded={background ? 'rounded-t-xl' : 'rounded-xl'}
		/>
		<div class="p-8 grid gap-6" class:card--background={background} class:rounded-b-xl={background}>
			<header class="contents">
				<div class="flex items-center gap-4 flex-wrap">
					<Badge region={article?.region ?? "NATIONAL"} earth />
					<Badge badge="Política" />
				</div>
				<a class="anchor-hover heading" href={article?.id ? '/article/' + article.id : '/article'}>
					<h2 class="font-semibold text-2xl">
						{article?.title ?? placeholder.title}
					</h2>
				</a>
			</header>
			<Time datetime={article?.created_at} />
		</div>
	</article>
{/if}

{#if variant === 'small'}
	<article>
		<div class="p-8 grid gap-6">
			<header class="contents">
				<div class="flex items-center gap-4 flex-wrap">
					<Badge region={article?.region ?? "NATIONAL"} earth />
					<Badge badge="Política" />
				</div>
				<a class="anchor-hover heading" href={article?.id ? '/article/' + article.id : '/article'}>
					<h2 class="font-semibold text-2xl">
						{article?.title ?? placeholder.title}
					</h2>
				</a>
			</header>
			<Time datetime={article?.created_at} />
		</div>
	</article>
{/if}

<style>
	.card--background {
		--uno: 'bg-ground-1-light dark:bg-ground-1';
	}
</style>
