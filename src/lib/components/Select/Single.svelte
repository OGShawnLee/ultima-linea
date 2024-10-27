<script lang="ts" generics="T extends string">
	import type { Selected } from "bits-ui";
	import { getEntriesOf } from "$lib";
	import { Select } from "bits-ui";

	export let value: T;
	export let enumeration: Record<T, string>;

	const entries = getEntriesOf(enumeration);
	const items: Selected<T>[] = entries.map(([value, label]) => ({ value, label }));

	$: selected = items.find((item) => item.value === value);
</script>

<Select.Root
	{selected}
	{items}
	onSelectedChange={(event) => {
		if (event) {
			value = event.value;
		}
	}}
>
	<slot {items} />
</Select.Root>