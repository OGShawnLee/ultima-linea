<script lang="ts" context="module">
  export type ToastType = "ERROR" | "SUCCESS" | "WARNING" | "INFO";

	export type ToastData = {
    title: string;
		description: string;
		type: ToastType;
	};
  
	const {
		elements: { content, title, description, close },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>();
    
    export const createToast = helpers.addToast;
</script>

<script lang="ts">
	import Button from "@components/Button.svelte";
  import { Tooltip } from "@components/Tooltip";
	import { X } from "lucide-svelte";
	import { flip } from "svelte/animate";
	import { fly } from "svelte/transition";
  import { createToaster } from "@melt-ui/svelte";

	const enumeration: Record<ToastType, string> = {
		ERROR: "bg-rose-600 dark:bg-rose-400",
		SUCCESS: "bg-emerald-600 dark:bg-emerald-400",
		WARNING: "bg-amber-600 dark:bg-amber-400",
		INFO: "bg-sky-600 dark:bg-sky-400"
	};
</script>

<div
	class="fixed z-90 bottom-24 flex flex-col gap-4 lt-sm:(left-1/2 transform -translate-x-1/2) sm:(left-12 bottom-12)"
	use:portal
>
	{#each $toasts as { id, data } (id)}
		<div
			class="dialog--background relative p-4 flex items-center gap-8"
			animate:flip={{ duration: 450 }}
			transition:fly={{ y: 150, duration: 150 }}
			{...$content(id)}
			use:content
		>
			<div class="absolute top-0 left-0 -mt-2 -ml-2">
				<div class="size-4 {enumeration[data.type]} rounded-md animate-pulse" />
			</div>
			<div>
				<h3 class="sr-only" {...$title(id)} use:title>
					{data.title}
				</h3>
				<div {...$description(id)} use:description>
					<p class="font-light text-sm text-summit-light dark:text-summit">{data.description}</p>
				</div>
			</div>
      <Button inverse icon={X} label="Cerrar" size="size-8" builders={[$close(id)]}/>
		</div>
	{/each}
</div>