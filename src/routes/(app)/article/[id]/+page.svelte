<script>
	import { Bookmark, Share2 as Share } from 'lucide-svelte';
	import { Button, Badge, Main, Picture, Time } from '@components';
	import { Card } from '@article/components';
	import { Attribution } from '@user/components';
	import { getRegionLabel } from '@categories/schema';
	import { takeAndRest } from '$lib';

	export let data;

	function handleShare() {
		navigator.share({
			title: data.page.article.title,
			text: 'Mira la noticia en Ultima Linea.',
			url: window.location.href
		});
	}

	$: recent = takeAndRest(data.page.recent, 1);
	$: console.log(data.page, recent);
</script>

<svelte:head>
	<title>
		{data.page.article.title}
	</title>
	<meta name="description" content={data.page.article.summary} />
	<meta name="og:title" content={data.page.article.title} />
	<meta name="og:image" content={data.page.article.image.image_url} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={data.page.article.title} />
	<meta name="twitter:description" content="Mira la noticia en Ultima Linea." />
	<meta name="twitter:image" content={data.page.article.image.image_url} />
</svelte:head>

<Main>
	<div class="container--padding py-12 md:py-16">
		<div class="grid xl:grid-cols-12 items-start gap-y-12 lg:gap-x-8 xl:gap-x-12">
			<article class="xl:col-span-8 grid gap-12">
				<header class="md:px-16 grid gap-6">
					<div class="flex items-center gap-4 flex-wrap">
						<Badge badge={getRegionLabel(data.page.article.region)} earth />
						<Badge badge="Política" />
					</div>
					<h1 class="heading-1">
						{data.page.article.title}
					</h1>
					<div>
						<Attribution name={data.page.article.user.name} />
						<Time datetime={data.page.article.created_at} />
					</div>
					<div>
						<p>
							{data.page.article.summary}
						</p>
					</div>
					<div class="flex items-center justify-end gap-2">
						<Button icon={Bookmark} size="size-10" label="Añadir a Marcardores" />
						<Button icon={Share} text="Compartir" on:click={handleShare} />
					</div>
				</header>
				<Picture image={data.page.article.image} caption={data.page.article.caption} label />
				<div class="grid gap-4">
					{@html data.page.article.content}
				</div>
			</article>
			<section class="xl:col-span-4 flex flex-col gap-8">
				<header class="section-header">
					<h2 class="heading-2">Ultimas Noticias</h2>
				</header>
				<div class="xl:hidden">
					<Card article={recent.front[0]} background variant="horizontal" />
				</div>
				<div class="hidden xl:block">
					<Card article={recent.front[0]} background variant="medium" />
				</div>
				<div class="grid md:grid-cols-2 xl:(flex flex-col) gap-4">
					{#each recent.rest as article (article.id)}
						<Card {article} variant="small" />
					{/each}
				</div>
			</section>
		</div>
	</div>
	<section
		class="container--padding py-12 md:py-16 flex flex-col gap-8 bg-ground-1-light dark:bg-ground-1 2xl:rounded-xl"
	>
		<header class="section-header">
			<h2 class="heading-2">Noticias Relacionadas</h2>
		</header>
		<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 xl:gap-x-8 gap-8">
			{#each { length: 12 } as _}
				<Card variant="medium" />
			{/each}
		</div>
	</section>
</Main>
