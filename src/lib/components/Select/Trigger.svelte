<script lang="ts">
  import type { Icon } from "lucide-svelte";
  import type { ComponentType } from "svelte";
	import { Select } from "bits-ui";

	export let attrs: Record<string, string | undefined> = {};
	export let placeholder: string;
	export let icon: ComponentType<Icon>;
</script>

<Select.Trigger class="button button--background button--rectangle-10 rounded-lg" {...attrs}>
	<Select.Value {placeholder} />
  <svelte:component this={icon} strokeWidth={1.5}/>
</Select.Trigger>