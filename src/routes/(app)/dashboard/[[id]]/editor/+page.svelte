<script>
	import Editor from '@editor/Editor.svelte';
	import { MAX_SUMMARY_LENGTH, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH } from '@article/schema';
	import { CategoriesSchema, RegionEnumeration } from '@categories/schema';
	import { DraftSchema } from '@draft/schema';
	import { MAX_IMAGE_LABEL_LENGTH, MIN_IMAGE_LABEL_LENGTH, PictureSchema } from '@picture/schema';
	import { Button, Dialog, Main, Input, Radio, Uploader, createToast } from '@components';
	import { Captions, Earth, Image, Save, Shapes, UserCircle, X } from 'lucide-svelte';
	import { fileProxy, superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { Control, Field } from 'formsnap';

	export let data;

	const form = superForm(data.form, {
		validators: valibotClient(DraftSchema),
		onResult(event) {
			if (event.result.type === 'success' || event.result.type === 'redirect') {
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
	const formCategories = superForm(data.categories, {
		validators: valibotClient(CategoriesSchema),
		onResult(event) {
			if (event.result.type === 'success') {
				createToast({
					data: {
						title: 'Categorías Guardadas',
						description: 'Las categorías se han guardado.',
						type: 'SUCCESS'
					}
				});
			} else if (event.result.type === 'error') {
				createToast({
					data: {
						title: 'Error al Guardar Categorías',
						description: 'Ocurrió un error al guardar las categorías.',
						type: 'ERROR'
					}
				});
			}
		}
	});
	const { form: input, enhance } = form;
	const { form: inputPicture, enhance: enhancePicture } = formPicture;
	const { form: inputCategories, enhance: enhanceCategories } = formCategories;
	const files = fileProxy(inputPicture, 'image-file');

	let openPicture = false;
	let openCategorization = false;
</script>

<svelte:head>
	<title>Editor - Ultima Linea</title>
</svelte:head>

<Dialog.Root bind:open={openPicture} title="Añadir Imagen">
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
</Dialog.Root>

<Dialog.Root bind:open={openCategorization} title="Añadir Categorías">
	<form
		class="p-8 grid gap-6"
		action="?/upload-categories"
		method="post"
		enctype="multipart/form-data"
		use:enhanceCategories
	>
		<Field form={formCategories} name="region">
			<Input.Group>
				<Control let:attrs>
					<Input.Label label="Región" icon={Earth} id={attrs.name} />
					<Radio name={attrs.name} bind:value={$inputCategories.region} enumeration={RegionEnumeration} />
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
						on:click={() => (openPicture = !openPicture)}
					/>
					<Button
						text="{data.categories.data.region ? 'Editar' : 'Añadir'} Categorias"
						icon={Shapes}
						on:click={() => (openCategorization = !openCategorization)}
					/>
				{/if}
			</div>
		</form>
	</div>
</Main>
