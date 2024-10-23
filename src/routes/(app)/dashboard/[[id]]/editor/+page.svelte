<script>
	import Editor from '@editor/Editor.svelte';
	import { MAX_SUMMARY_LENGTH, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH } from '@article/schema';
	import { DraftSchema } from '@draft/schema';
	import { MAX_IMAGE_LABEL_LENGTH, MIN_IMAGE_LABEL_LENGTH, PictureSchema } from '@picture/schema';
	import { Button, Main, Input, Uploader, createToast } from '@components';
	import { Dialog } from 'bits-ui';
	import { Captions, Image, Save, UserCircle, X } from 'lucide-svelte';
	import { fileProxy, superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { Control, Field } from 'formsnap';

	export let data;

	const form = superForm(data.form, {
		validators: valibotClient(DraftSchema),
		onResult(event) {
			if (event.result.type === 'success' || event.result.type === "redirect") {
				createToast({
					data: {
						title: 'Borrador Guardado',
						description: 'El borrador se ha guardado.',
						type: 'SUCCESS'
					}
				});
			} else if (event.result.type === 'error') {
				createToast({
					data: {
						title: 'Error al Guardar Borrador',
						description: 'Ocurrió un error al guardar el borrador.',
						type: 'ERROR'
					}
				});
			}
		}
	});
	const formPicture = superForm(data.picture, {
		validators: valibotClient(PictureSchema),
		onResult(event) {
			if (event.result.type === 'success') {
				createToast({
					data: {
						title: 'Imagen Guardada',
						description: 'La imagen se ha guardado.',
						type: 'SUCCESS'
					}
				});
			} else if (event.result.type === 'error') {
				createToast({
					data: {
						title: 'Error al Guardar Imagen',
						description: 'Ocurrió un error al guardar la imagen.',
						type: 'ERROR'
					}
				});
			}
		}
	});
	const { form: input, enhance } = form;
	const { form: inputPicture, enhance: enhancePicture } = formPicture;
	const files = fileProxy(inputPicture, 'image-file');

	let open = false;

	function toggle() {
		open = !open;
	}
</script>

<svelte:head>
	<title>Editor - Ultima Linea</title>
</svelte:head>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay class="dialog-overlay" />
		<Dialog.Content class="dialog dialog--background">
			<header
				class="h-20 px-8 flex items-center justify-between border-b border-ground-3-light dark:border-ground-3"
			>
				<Dialog.Title class="heading-2">Añadir Imagen</Dialog.Title>
				<Dialog.Close asChild let:builder>
					<Button
						builders={[builder]}
						icon={X}
						inverse
						label="Cerrar Panel"
						side="left"
						size="size-10"
					/>
				</Dialog.Close>
			</header>
			<form
				class="p-8 grid gap-6"
				action="?/upload-picture"
				method="post"
				enctype="multipart/form-data"
				use:enhancePicture
			>
				<Field form={formPicture} name="image-file">
					<Control let:attrs>
						<Input.Root>
							<Uploader
								name={attrs.name}
								bind:files={$files}
								imageSRC={$inputPicture['image-src']}
								imageLabel={$inputPicture['image-label']}
								imageURL={$inputPicture['image-url']}
								imageKey={$inputPicture['image-key']}
							/>
							<Input.Error />
						</Input.Root>
					</Control>
				</Field>
				<Field form={formPicture} name="image-label">
					<Input.Group>
						<Control let:attrs>
							<Input.Root>
								<Input.Label id={attrs.name} icon={Captions} label="Descripción" />
								<Input.TextArea
									name={attrs.name}
									placeholder="Escriba la descripción de la imagen"
									maxlength={MAX_IMAGE_LABEL_LENGTH}
									minlength={MIN_IMAGE_LABEL_LENGTH}
									bind:value={$inputPicture['image-label']}
								/>
							</Input.Root>
						</Control>
						<Input.Error />
					</Input.Group>
				</Field>
				<Field form={formPicture} name="image-src">
					<Input.Group>
						<Control let:attrs>
							<Input.Root>
								<Input.Label id={attrs.name} icon={UserCircle} label="Fuente" />
								<Input.Input
									name={attrs.name}
									placeholder="Escriba de donde proviene la imagen"
									bind:value={$inputPicture['image-src']}
								/>
							</Input.Root>
						</Control>
						<Input.Error />
					</Input.Group>
				</Field>
				<div class="flex items-center gap-4">
					<Button text="Guardar" icon={Save} type="submit" />
					<Dialog.Close asChild let:builder>
						<Button builders={[builder]} text="Cerrar" type="button" />
					</Dialog.Close>
				</div>
			</form>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>

<Main>
	<div class="container--padding py-12 md:py-16">
		<form class="max-w-3xl mx-auto grid gap-6" action="?/upload-draft" method="post" use:enhance>
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
						<Editor name={attrs.name} bind:content={$input.content} bind:text={$input.text} />
						<Input.Error padded />
					</Control>
				</Input.Group>
			</Field>
			<div class="w-fit flex items-center gap-4 md:px-16">
				<Button text="Guardar" icon={Save} type="submit" />
				{#if data.hasDraft}
					<Button
						text="{data.picture.data['image-key'] ? 'Editar' : 'Añadir'} Imagen"
						icon={Image}
						on:click={toggle}
					/>
				{/if}
			</div>
		</form>
	</div>
</Main>
