<script lang="ts">
	import * as Extensions from '@editor/extensions';
	import { Toggle } from '@editor/components';
	import { Editor } from '@tiptap/core';
  import { Bold, Italic, Heading, List, ListOrdered, Quote, Strikethrough, Underline, Undo2, Redo2 } from "lucide-svelte";
	import { onMount } from 'svelte';

	export let content: string | undefined | null;
	export let text: string | undefined |null;
	export let name: string;

	let editor: Editor;
	let element: HTMLElement;

	onMount(() => {
		editor = new Editor({
			content,
			element,
			editorProps: {
				attributes: {
					class:
						'py-8 grid gap-4 outline-none border-b border-ground-3-light dark:border-ground-3'
				}
			},
			extensions: [
				Extensions.Blockquote.extend({
					content: '(paragraph)+'
				}).configure({
					HTMLAttributes: { class: 'my-4 md:mx-6 px-10 py-4 bg-ground-1-light dark:bg-ground-1 border-l-4 border-ground-4 rounded-r-xl leading-loose [&>p]:px-0' }
				}),
				Extensions.Bold.configure({
					HTMLAttributes: { class: 'text-summit-light dark:text-summit' }
				}),
				Extensions.ListItem.configure({
					HTMLAttributes: { class: '[&>p]:px-0 [&>ol]:mx-4 [&>ul]:mx-4' }
				}),
				Extensions.BulletList.configure({
					HTMLAttributes: { class: 'list-disc mx-20' }
				}),
				Extensions.OrderedList.configure({
					HTMLAttributes: { class: 'list-decimal mx-20' }
				}),
				Extensions.Document.extend({
					content: 'block+'
				}),
				Extensions.Heading.extend({
					marks: ''
				}).configure({
					HTMLAttributes: { class: 'heading-2 md:px-16' },
					levels: [2]
				}),
				Extensions.History,
				Extensions.Italic,
				Extensions.Paragraph.configure({
					HTMLAttributes: { class: 'md:px-16 leading-loose' }
				}),
				Extensions.Placeholder.configure({
					showOnlyCurrent: false,
					placeholder(context) {
						if (context.node.type.name === 'paragraph') {
							return 'Escriba el contenido del parrafo';
						}

						if (context.node.type.name === 'heading') {
							return 'Escriba el contenido del encabezado';
						}

						return 'Escriba el contenido de la noticia';
					}
				}),
				Extensions.Strike,
				Extensions.Text,
				Extensions.Underline
			],
			onTransaction() {
				editor = editor;
				content = editor.getHTML();
				text = editor.getText();
			}
		});
	});
</script>

<div>
	<div
		class="sticky z-5 top-20 py-2 flex items-center justify-center gap-2 bg-ground-0-light/75 dark:bg-ground-0/75 backdrop-filter backdrop-blur-lg"
	>
		<Toggle
			label="Negritas"
			icon={Bold}
			active={editor?.isActive('bold')}
			disabled={!editor?.can().toggleBold()}
			on:click={() => {
				editor?.chain().focus().toggleBold().run();
			}}
		/>
		<Toggle
			label="Itálicas"
			icon={Italic}
			active={editor?.isActive('italic')}
			disabled={!editor?.can().toggleItalic()}
			on:click={() => {
				editor?.chain().focus().toggleItalic().run();
			}}
		/>
		<Toggle
			label="Subrayado"
			icon={Underline}
			active={editor?.isActive('underline')}
			disabled={!editor?.can().toggleUnderline()}
			on:click={() => {
				editor?.chain().focus().toggleUnderline().run();
			}}
		/>
		<Toggle
			label="Tachado"
			icon={Strikethrough}
			active={editor?.isActive('strike')}
			disabled={!editor?.can().toggleStrike()}
			on:click={() => {
				editor?.chain().focus().toggleStrike().run();
			}}
		/>
		<div class="h-10 w-0.5 bg-ground-3-light dark:bg-ground-2" role="separator" />
		<Toggle
			label="Encabezado"
			icon={Heading}
			active={editor?.isActive('heading', { level: 2 })}
			disabled={!editor?.can().toggleHeading({ level: 2 })}
			on:click={() => {
				editor?.chain().focus().toggleHeading({ level: 2 }).run();
			}}
		/>
		<Toggle
			label="Cita"
			icon={Quote}
			active={editor?.isActive('blockquote')}
			disabled={!editor?.can().toggleBlockquote()}
			on:click={() => {
				editor?.chain().focus().toggleBlockquote().run();
			}}
		/>
		<Toggle
			label="Lista"
			icon={List}
			active={editor?.isActive('bulletList')}
			disabled={!editor?.can().toggleBulletList()}
			on:click={() => {
				editor?.chain().focus().toggleBulletList().run();
			}}
		/>
		<Toggle
			label="Lista Ordenada"
			icon={ListOrdered}
			active={editor?.isActive('orderedList')}
			disabled={!editor?.can().toggleOrderedList()}
			on:click={() => {
				editor?.chain().focus().toggleOrderedList().run();
			}}
		/>
		<div class="h-10 w-0.5 bg-ground-3-light dark:bg-ground-2" role="separator" />
		<Toggle
			label="Deshacer"
			icon={Undo2}
			disabled={!editor?.can().undo()}
			on:click={() => {
				editor?.chain().focus().undo().run();
			}}
		/>
		<Toggle
			label="Rehacer"
			icon={Redo2}
			disabled={!editor?.can().redo()}
			on:click={() => {
				editor?.chain().focus().redo().run();
			}}
		/>
	</div>
	<div
		id="tip-tap-editor"
		class="bg-transparent"
		bind:this={element}
	/>
	<input type="hidden" id={name} {name} value={content} />
	<input type="hidden" id="text" name="text" value={text} />
</div>

<style>
	:global(#tip-tap-editor h2.is-empty::before, #tip-tap-editor p.is-empty::before) {
		--uno: 'float-left h-0 text-middle pointer-events-none content-[attr(data-placeholder)]';
	}
</style>