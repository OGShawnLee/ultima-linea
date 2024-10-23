<script lang="ts">
	import Button from "@components/Button.svelte";
	import Picture from "@components/Picture.svelte";
	import { Input } from "@components/Input";
	import { Image, ImagePlus } from "lucide-svelte";

	export let files: FileList;
	export let imageURL: Nullish<string>;
	export let imageKey: Nullish<string>;
	export let imageSRC: Nullish<string>;
	export let imageLabel: Nullish<string>;
	export let name: string;

	let imagePathURL = imageURL;
	let inputRef: HTMLInputElement;

	$: if (files && files.length > 0) {
		const item = files.item(0);
		if (item instanceof File) {
			getImageFilePathURL(item).then((url) => {
				imagePathURL = url;
			});
		}
	}

	function isValidImageType(type: string) {
		return (
			type === "image/jpg" || type === "image/jpeg" || type === "image/png" || type === "image/webp"
		);
	}

	function getImageFilePathURL(file: File) {
		return new Promise<string>((resolve, reject) => {
			if (isValidImageType(file.type)) {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					resolve(reader.result as string);
				};
			} else {
				reject("Invalid Image Type");
			}
		});
	}
</script>

<Input.Root>
	<Input.Label id={name} icon={Image} label="Imagen" />
	{#if imagePathURL}
		<Picture
			caption={{ image_label: imageLabel ?? '', image_src: imageSRC ?? '' }}
			image={{ image_key: imageKey ?? '', image_url: imagePathURL ?? '' }}
			label
			padded={false}
		/>
	{:else}
		<div class="w-full min-h-60 flex items-center justify-center bg-ground-0-light dark:bg-ground-0 border border-ground-3-light dark:border-ground-3 rounded-xl">
			<p class="text-middle">No se ha cargado una imagen.</p>
		</div>
	{/if}
	<Button icon={ImagePlus} text="{imagePathURL ? 'Cambiar' : 'Subit'} Imagen" on:click={() => inputRef.click()} />
	<input type="hidden" name="image-key" value={imageKey} />
	<input type="hidden" name="image-url" value={imageURL} />
	<input
		class="hidden"
		type="file"
		id={name}
		{name}
		accept="image/jpg, image/jpeg, image/png, image/webp"
		bind:this={inputRef}
		bind:files
	/>
</Input.Root>