<script>
  import { Card } from '$lib/components';
</script>

<svelte:head>
	<title>Ultima Linea</title>
</svelte:head>

<main class="mt-20 w-full mx-auto max-w-1920px">
	<section class="py-16 px-4 sm:px-8 flex flex-col gap-8">
		<header class="sr-only h-10">
			<h2 class="text-3xl text-white font-bold">Avenida Principal</h2>
		</header>
    <div class="grid gap-8 md:gap-16">
      <Card variant="horizontal" background={false} hero />
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 xl:gap-x-8 gap-8">
        {#each { length: 6 } as _}
          <Card />
        {/each}
      </div>
    </div>
	</section>
	<section class="py-16 px-4 sm:px-8 flex flex-col gap-8 bg-ground-1">
    <header class="h-10">
      <h2 class="text-3xl text-white font-bold">Política</h2>
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
	</section>
	<section class="py-16 px-4 sm:px-8 flex flex-col gap-8">
    <header class="h-10">
      <h2 class="text-3xl text-white font-bold">Crimen</h2>
		</header>
    <div class="grid gap-8 md:gap-16">
      <Card variant="horizontal" />
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 xl:gap-x-8 gap-8">
        {#each { length: 6 } as _}
          <Card />
        {/each}
      </div>
    </div>
	</section>
</main>
