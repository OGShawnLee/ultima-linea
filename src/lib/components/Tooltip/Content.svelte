<script lang="ts">
	import { Tooltip } from 'bits-ui';

	export let label = '';
  export let side: "top" | "right" | "bottom" | "left" | undefined = undefined;
</script>

{#if label}
	<Tooltip.Content class="z-20" {side} sideOffset={8}>
		<div class="bg-ground-1-light dark:bg-ground-1">
			<Tooltip.Arrow class="border-l border-t border-ground-3-light dark:border-ground-3" />
		</div>
		<div
			class="py-2 px-4 bg-ground-1-light dark:bg-ground-1 border border-ground-3-light dark:border-ground-3 rounded-xl shadow-md"
		>
			<slot>
				<p class="leading-8">
					{label}
				</p>
			</slot>
		</div>
	</Tooltip.Content>
{/if}
