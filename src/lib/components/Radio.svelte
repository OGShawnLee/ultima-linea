<script lang="ts" generics="T extends string">
  import { RadioGroup } from "bits-ui";
  import { BadgeCheck } from "lucide-svelte";
	import { getEntriesOf } from "$lib";

  export let value: T;
  export let name: string;
  export let enumeration: Record<T, string>;

  const entries = getEntriesOf(enumeration);
</script>

<RadioGroup.Root class="flex items-center gap-2" orientation="horizontal" bind:value>
  {#each entries as [value, label]}
    <RadioGroup.Item class="button button--rectangle-10 button--inverse data-[state=checked]:button--background" value={value}>
      <RadioGroup.ItemIndicator asChild let:checked>
        {#if checked}
          <svelte:component this={BadgeCheck} strokeWidth={1.5} />
        {/if}
      </RadioGroup.ItemIndicator>
      {label}
    </RadioGroup.Item>
  {/each}
  <RadioGroup.Input {name}/>
</RadioGroup.Root>