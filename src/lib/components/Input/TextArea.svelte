<script lang="ts">
	import { concat } from "$lib";

	let className = "";

	export { className as class };
	export let name: string;
	export let placeholder: string;
	export let value: string | undefined | null = null;
	export let minlength = 0;
	export let maxlength: number;
</script>

<textarea
	class={concat("input-common input-common--textarea", className)}
	{name}
	{placeholder}
	bind:value
	{minlength}
	{maxlength}
/>

<style>
	textarea {
		field-sizing: content;
	}
</style>
