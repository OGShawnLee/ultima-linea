<script>
  import { Card, More } from '$lib/components';
</script>

<svelte:head>
	<title>Ultima Linea</title>
</svelte:head>

<main class="mt-20 container">
	<section class="py-12 md:py-16 container--padding flex flex-col gap-8">
		<header class="sr-only section-header">
			<h2 class="heading-2">Avenida Principal</h2>
		</header>
    <div class="grid gap-8 md:gap-16">
      <Card variant="horizontal" background={false} hero />
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 xl:gap-x-8 gap-8">
        {#each { length: 6 } as _}
          <Card />
        {/each}
      </div>
    </div>
    <More category="Avenida Principal" />
	</section>
	<section class="py-12 md:py-16 container--padding flex flex-col gap-8 bg-ground-1-light dark:bg-ground-1 2xl:rounded-xl">
    <header class="section-header">
      <h2 class="heading-2">Política</h2>
		</header>
    <div class="grid gap-8 md:gap-16">
      <div class="grid md:grid-cols-2 gap-8">
        <Card variant="vertical-large" background={false} />
        <Card variant="vertical-large" background={false} />
      </div>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 xl:gap-x-8 gap-8">
        {#each { length: 6 } as _}
        <Card background={false} />
        {/each}
      </div>
    </div>
    <More category="Política" />
	</section>
	<section class="py-12 md:py-16 container--padding flex flex-col gap-8">
    <header class="section-header">
      <h2 class="heading-2">Crimen</h2>
		</header>
    <div class="grid gap-8 md:gap-16">
      <Card variant="horizontal" />
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 xl:gap-x-8 gap-8">
        {#each { length: 6 } as _}
          <Card />
        {/each}
      </div>
    </div>
    <More category="Crimen" />
	</section>
</main>
