<script>
	import { Button, Card } from '$lib/components';
	import { Search } from 'lucide-svelte';
</script>

<svelte:head>
  <title>Ultima Linea - Busqueda</title>
</svelte:head>

<main class="mt-20 container">
	<section class="py-12 md:py-16 container--padding md:px-16 flex flex-col gap-8">
		<div class="flex items-center flex-col gap-4">
			<header class="section-header">
				<h1 class="heading-1">Resultados de Busqueda</h1>
			</header>
			<p>Explore nuestra base de datos y encuentre los artículos que le interese.</p>
		</div>
		<form class="flex flex-col gap-6">
			<div class="flex gap-2">
				<input
					class="h-12 w-full px-4 bg-ground-0-light dark:bg-ground-0 border border-ground-3-light dark:border-ground-3 rounded-xl placeholder-text-lesser placeholder-font-normal text-summit-light dark:text-summit font-bold"
					name="query"
					type="text"
					placeholder="Busque por titulo o contenido"
				/>
        <div class="hidden md:block">
          <Button size="h-12" icon={Search} text="Buscar" />
        </div>
        <div class="md:hidden">
          <Button size="size-12" icon={Search} />
        </div>
			</div>
		</form>
	</section>
	<section
		class="py-2 md:py-16 container--padding flex flex-col gap-8 bg-ground-1-light dark:bg-ground-1 2xl:rounded-xl"
	>
		<header class="section-header">
			<h2 class="heading-2">Resultados</h2>
		</header>
		<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 xl:gap-x-8 gap-8">
			{#each { length: 6 } as _}
				<Card background={false} />
			{/each}
		</div>
	</section>
</main>