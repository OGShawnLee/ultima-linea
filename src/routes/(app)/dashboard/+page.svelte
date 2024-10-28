<script lang="ts">
	import { DraftFiltersSchema, DraftStateEnumeration } from "@draft/schema";
	import { Button, Main, Input, Radio, Select } from '@components';
	import { Draft } from '@draft/components';
	import { ArrowRight, ChevronDown, Group } from 'lucide-svelte';
	import { superForm } from "sveltekit-superforms";
	import { valibotClient } from "sveltekit-superforms/adapters";
	import { Control, Field } from 'formsnap';
	// import { Masonry } from "svelte-bricks";
	import { fade, slide } from "svelte/transition";
	import { flip } from "svelte/animate";

	export let data;

	function handleDraftDelete(event: CustomEvent<string>) {
		data.drafts = data.drafts.filter((draft) => draft.id !== event.detail);
	}

	const form = superForm(data.form, {
		validators: valibotClient(DraftFiltersSchema),
		dataType: "json",
	})
	const { form: input } = form; 
</script>

<svelte:head>
	<title>Dashboard - Última Linea</title>
</svelte:head>

<Main>
  <header class="container--padding pt-12">
    <h1 class="text-lesser-light dark:text-lesser">Dashboard</h1>  
  </header>
	<section class="container--padding pb-12 md:pb-16 grid gap-8">
		<div class="grid gap-6">
			<header class="section-header">
				<h2 class="heading-1">Borradores</h2>
			</header>
			<form>
				<Field {form} name="draft-state">
					<Input.Group>
						<Control let:attrs>
							<Input.Root>
								<Input.Label id={attrs.name} icon={Group} label="Estado" />
								<div class="flex items-center gap-2">
									<div class="lt-md:hidden">
										<Radio enumeration={DraftStateEnumeration} name={attrs.name} bind:value={$input["draft-state"]} />
									</div>
									<div class="md:hidden">
										<Select.Root.Single enumeration={DraftStateEnumeration} bind:value={$input["draft-state"]} let:items>
											<Select.Trigger icon={ChevronDown} placeholder="Seleccione un estado"/>
											<Select.Content name={attrs.name} {items}/>
											<Select.Input />
										</Select.Root.Single>
									</div>
									<Button icon={ArrowRight} text="Filtrar" type="submit" />
								</div>
							</Input.Root>
						</Control>
						<Input.Error />
					</Input.Group>
				</Field>
			</form>
		</div>
		{#key data["draft-state"]}
			<div style="columns: 3 326px; column-gap: 2rem;" transition:fade={{ duration: 450 }}>
				{#each data.drafts as draft (draft.id)}
					<div class="inline-block mb-8" animate:flip={{ duration: 450 }} transition:slide>
						<Draft draft={draft} on:delete={handleDraftDelete} />
					</div>
				{/each}
			</div>
		{/key}
	</section>
</Main>