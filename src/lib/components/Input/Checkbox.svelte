<script lang="ts">
	import { Checkbox } from 'bits-ui';
	import { Check } from 'lucide-svelte';

	export let checked = false;
	export let label: string;
	export let name: string;
</script>

<div class="flex items-center space-x-3">
	<Checkbox.Root
  class="button size-8 button--inverse rounded-lg data-[state=checked]:button--background"
  id={name}
		bind:checked
	>
		<Checkbox.Indicator class="inline-flex items-center justify-center" let:isChecked>
			{#if isChecked}
				<Check size={18} strokeWidth={1.5} />
			{/if}
		</Checkbox.Indicator>
		<Checkbox.Input {name} />
	</Checkbox.Root>
	<span class="leading-none">{label}</span>
</div>
