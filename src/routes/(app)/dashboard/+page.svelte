<script>
	import { Main } from '@components';
	import { Draft } from '@draft/components';


	export let data;
</script>

<Main>
  <header class="container--padding pt-12">
    <h1 class="text-lesser-light dark:text-lesser text-center">Dashboard</h1>  
  </header>
	<section class="container--padding pb-12 md:pb-16 grid gap-8">
		<header class="section-header">
			<h2 class="heading-1 text-center">Borradores</h2>
		</header>
		<div class="columns-[3_326px]" style="column-gap:2rem;">
			{#each data.drafts as draft (draft.id)}
        <Draft {draft} />
			{/each}
		</div>
	</section>
</Main>