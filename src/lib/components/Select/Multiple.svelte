<script lang="ts" generics="T extends string">
	import type { Selected } from "bits-ui";
	import { getEntriesOf } from "$lib";
	import { Select } from "bits-ui";

	export let values: T[];
	export let enumeration: Record<T, string>;

	const entries = getEntriesOf(enumeration);
	const items: Selected<T>[] = entries.map(([value, label]) => ({ value, label }));

	$: selected = items.filter((item) => values.includes(item.value));
</script>

<Select.Root
	{selected}
	{items}
	multiple
	onSelectedChange={(event) => {
		if (event) {
			values = event.map((value) => value.value);
		}
	}}
>
	<slot {items} />
</Select.Root>