<script lang="ts">
	import { Main } from '@components';
	import { Draft } from '@draft/components';
	import { flip } from "svelte/animate";
	import { slide } from "svelte/transition";

	export let data;

	function handleDraftDelete(event: CustomEvent<string>) {
		data.drafts = data.drafts.filter((draft) => draft.id !== event.detail);
	}
</script>

<svelte:head>
	<title>Dashboard - Ultima Linea</title>
</svelte:head>

<Main>
  <header class="container--padding pt-12">
    <h1 class="text-lesser-light dark:text-lesser text-center">Dashboard</h1>  
  </header>
	<section class="container--padding pb-12 md:pb-16 grid gap-8">
		<header class="section-header">
			<h2 class="heading-1 text-center">Borradores</h2>
		</header>
		<div style="columns: 3 326px; column-gap: 2rem;">
			{#each data.drafts as draft (draft.id)}
				<div class="inline-block mb-8" animate:flip={{ duration: 450 }} transition:slide>
					<Draft {draft} on:delete={handleDraftDelete} />
				</div>
			{/each}
		</div>
	</section>
</Main>