<script>
	import { getRegionLabel } from "@categories/schema";
	import { Bookmark, ClipboardPen, Share2 as Share } from 'lucide-svelte';
	import { Button, Badge, Main, Picture, Time } from '@components';
	import { ButtonPublish, Draft } from '@draft/components';

	export let data;
</script>

<svelte:head>
	<title>
		{data.page.draft.title}
	</title>
	{#if data.page.draft.summary}
		<meta name="description" content={data.page.draft.summary} />
	{/if}
	<meta name="og:title" content={data.page.draft.title} />
	{#if data.page.draft.image}
		<meta name="og:image" content={data.page.draft.image.image_url} />
	{/if}
</svelte:head>

<Main>
	<div class="container--padding py-12 md:py-16">
		<div class="grid lg:grid-cols-12 items-start gap-y-12 lg:gap-x-8 xl:gap-x-12">
			<article class="lg:col-span-8 grid gap-12">
				<header class="md:px-16 grid gap-6">
					<div class="flex items-center gap-4 flex-wrap">
						{#if data.page.draft.region}
							<Badge badge={getRegionLabel(data.page.draft.region)} earth />
						{/if}
						<Badge badge="Política" />
					</div>
					<h1 class="heading-1">
						{data.page.draft.title}
					</h1>
					<div>
						<p class="text-xs">
							Por
							<a class="font-semibold hover:(text-marque-light dark:text-marque)" href="/author">
								{data.page.draft.user.name}
							</a>
						</p>
						<Time />
					</div>
					<div>
						{#if data.page.draft.summary}
							<p>
								{data.page.draft.summary}
							</p>
						{/if}
					</div>
					<div class="flex items-center justify-end gap-2">
						<Button icon={Bookmark} size="size-10" label="Añadir a Marcardores" />
						<Button
							icon={ClipboardPen}
							text="Editar"
							href="/dashboard/{data.page.draft.id}/editor"
						/>
						{#if data.page.draft.can_be_published}
							<ButtonPublish id={data.page.draft.id} />
						{/if}
					</div>
				</header>
				<Picture image={data.page.draft.image} caption={data.page.draft.caption} label />
				<div class="grid gap-4">
					{#if data.page.draft.content}
						{@html data.page.draft.content}
					{/if}
				</div>
			</article>
			{#if data.page.recent.length > 0}
				<section class="hidden lg:(col-span-4 flex flex-col gap-8)">
					<header class="section-header">
						<h2 class="heading-2">Ultimos Borradores</h2>
					</header>
					<div class="grid gap-8">
						{#each data.page.recent as draft (draft.id)}
							<Draft {draft} />
						{/each}
					</div>
				</section>
			{/if}
		</div>
	</div>
	{#if data.page.more.length > 0}
		<section
			class="container--padding py-12 md:py-16 flex flex-col gap-8 bg-ground-1-light dark:bg-ground-1 2xl:rounded-xl"
		>
			<header class="section-header">
				<h2 class="heading-2">Más Borradores</h2>
			</header>
			<div style="columns: 3 326px; column-gap: 2rem;">
				{#each data.page.more as draft (draft.id)}
					<div class="inline-block mb-8">
						<Draft background={false} {draft} />
					</div>
				{/each}
			</div>
		</section>
	{/if}
</Main>
