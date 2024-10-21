<script lang="ts">
	export let name: string;
	export let placeholder: string;
	export let type: 'text' | 'password' | 'email' = 'text';
	export let value: string | undefined | null = null;

	function handleInput(this: HTMLInputElement) {
		value = this.value;
	}
</script>

<input
	class="input-common input-common--input"
	{name}
	{type}
	{placeholder}
	required
	on:input={handleInput}
/>