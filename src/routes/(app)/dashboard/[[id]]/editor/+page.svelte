<script>
	import Editor from '@editor/Editor.svelte';
	import { MAX_SUMMARY_LENGTH, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH } from '@article/schema';
	import { DraftSchema } from '@draft/schema';
	import { Button, Main, Input } from '@components';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { Control, Field } from 'formsnap';
	import { Save } from 'lucide-svelte';
	import { page } from '$app/stores';

	export let data;

	const form = superForm(data.form, {
		validators: valibotClient(DraftSchema)
	});
	const { form: input, enhance } = form;
</script>

<svelte:head>
	<title>Editor - Ultima Linea</title>
</svelte:head>

<Main>
	<div class="container--padding py-12 md:py-16">
		<form class="max-w-3xl mx-auto grid gap-6" method="post" use:enhance>
			<Field {form} name="title">
				<Input.Group>
					<Control let:attrs>
						<Input.Label id={attrs.name} label="Título" hidden />
						<Input.TextArea
              class="heading-1 min-h-18 md:px-16"
							name={attrs.name}
							placeholder="Escriba el título del artículo"
							minlength={MIN_TITLE_LENGTH}
							maxlength={MAX_TITLE_LENGTH}
							bind:value={$input.title}
						/>
					</Control>
					<Input.Error padded />
				</Input.Group>
			</Field>
      <Field {form} name="summary">
				<Input.Group>
					<Control let:attrs>
						<Input.Label id={attrs.name} label="Resumén" hidden />
						<Input.TextArea
              class="md:px-16"
							name={attrs.name}
							placeholder="Escriba el resumen del artículo"
							maxlength={MAX_SUMMARY_LENGTH}
							bind:value={$input.summary}
						/>
					</Control>
					<Input.Error padded />
				</Input.Group>
			</Field>
			<Field {form} name="content">
				<Input.Group>
					<Control let:attrs>
						<Input.Label id={attrs.name} label="Contenido" hidden />
						{#key $page.params}
							<Editor name={attrs.name} bind:content={$input.content} bind:text={$input.text} />
						{/key}
						<Input.Error padded />
					</Control>
				</Input.Group>
			</Field>
			<div class="w-fit md:px-16">
				<Button text="Guardar" icon={Save}/>
			</div>
		</form>
	</div>
</Main>
