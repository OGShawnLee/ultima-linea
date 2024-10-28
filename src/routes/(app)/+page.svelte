<script lang="ts">
	import { Header, More } from '@components';
	import { Card } from '@article/components';

	export let data;

	function takeAndRest<T>(array: T[], n: number): { front: T[]; rest: T[] } {
		return { front: array.slice(0, n), rest: array.slice(n) };
	}

	$: articles = takeAndRest(data.articles, 1);
</script>

<svelte:head>
	<title>Última Linea</title>
</svelte:head>

<main class="mt-20 container">
	<section class="py-12 md:py-16 container--padding flex flex-col gap-8">
		<Header variant="heading-2" sronly>Avenida Principal</Header>
		<div class="grid gap-8 md:gap-16">
			<Card article={articles.front[0]} background={false} variant="hero" />
			<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 xl:gap-x-8 gap-8">
				{#each articles.rest as article (article.id)}
					<Card {article} background variant="medium" />
				{/each}
			</div>
		</div>
		<More category="Avenida Principal" />
	</section>
	<section
		class="py-12 md:py-16 container--padding flex flex-col gap-8 bg-ground-1-light dark:bg-ground-1 2xl:rounded-xl"
	>
		<Header variant="heading-2">Politica</Header>
		<div class="grid gap-8 md:gap-16">
			<div class="grid md:grid-cols-2 gap-8">
				<Card variant="large" background={false} />
				<Card variant="large" background={false} />
			</div>
			<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 xl:gap-x-8 gap-8">
				{#each { length: 6 } as _}
					<Card variant="medium" background={false} />
				{/each}
			</div>
		</div>
		<More category="Política" />
	</section>
	<section class="py-12 md:py-16 container--padding flex flex-col gap-8">
		<Header variant="heading-2">Crimen</Header>
		<div class="grid gap-8 md:gap-16">
			<Card variant="horizontal" background />
			<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 xl:gap-x-8 gap-8">
				{#each { length: 6 } as _}
					<Card variant="medium" background />
				{/each}
			</div>
		</div>
		<More category="Crimen" />
	</section>
</main>
