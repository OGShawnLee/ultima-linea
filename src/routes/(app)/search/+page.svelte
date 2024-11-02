<script>
	import { SearchRegionEnumeration, SearchSchema } from '@search/schema';
	import { Button, Header, Input, Radio, Select } from '@components';
	import { Card } from '@article/components';
	import { ChevronDown, Search } from 'lucide-svelte';
	import { Control, Field } from 'formsnap';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { fade } from 'svelte/transition';

	export let data;

	const form = superForm(data.form, {
		validators: valibotClient(SearchSchema),
		dataType: 'json'
	});
	const { form: input } = form;
</script>

<svelte:head>
	<title>Busqueda - Última Linea</title>
</svelte:head>

<main class="mt-20 container">
	<section class="py-12 md:py-16 container--padding md:px-16 flex flex-col gap-8">
		<div class="flex items-center flex-col gap-4">
			<header class="section-header">
				<h1 class="heading-1">Resultados de Busqueda</h1>
			</header>
			<p>Explore nuestra base de datos y encuentre los artículos que le interese.</p>
		</div>
		<form class="w-full mx-auto max-w-2xl flex flex-col gap-2">
			<div class="w-full flex gap-2">
				<Field {form} name="term">
					<Input.Group class="w-full">
						<Control let:attrs>
							<Input.Label hidden id={attrs.name} label="Termino" />
							<input
								class="h-12 w-full px-4 bg-ground-0-light dark:bg-ground-0 border border-ground-3-light dark:border-ground-3 rounded-xl placeholder-text-lesser placeholder-font-normal text-summit-light dark:text-summit font-bold"
								name={attrs.name}
								type="text"
								placeholder="Busque por titulo o contenido"
								bind:value={$input.term}
							/>
							<Input.Error />
						</Control>
					</Input.Group>
				</Field>
				<div class="hidden md:block">
					<Button size="h-12" icon={Search} text="Buscar" type="submit" />
				</div>
				<div class="md:hidden">
					<Button size="size-12" icon={Search} type="submit" />
				</div>
			</div>
			<Field {form} name="region">
				<Input.Group class="flex items-center overflow-x-auto">
					<Control let:attrs>
						<Input.Label hidden label="Región" id={attrs.name} />
						<Radio
							enumeration={SearchRegionEnumeration}
							name={attrs.name}
							bind:value={$input.region}
						/>
					</Control>
					<Input.Error />
				</Input.Group>
			</Field>
		</form>
	</section>
	{#if data.results.length > 0}
		<section class="relative py-12 md:py-16 container--padding flex flex-col gap-8">
			<div class="absolute -z-10 inset-y-0 bg-ground-1-light dark:bg-ground-1"></div>
			<Header variant="heading-2">Resultados</Header>
			{#key data.results}
				<div
					class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 xl:gap-x-8 gap-8"
					transition:fade={{ duration: 450 }}
				>
					{#each data.results as article (article.id)}
						<Card {article} variant="medium" />
					{/each}
				</div>
			{/key}
		</section>
	{:else if data.term}
		<div class="grid place-content-center mx-auto">
			<p>No se han encontrado resultados.</p>
		</div>
	{/if}
</main>
