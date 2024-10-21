<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';

	export let id: string;
	export let label: string;
	export let icon: ComponentType<Icon> | null = null;
	export let hidden = false;
</script>

<div class="{hidden ? 'hidden' : 'flex'} items-center gap-2">
	<svelte:component this={icon} size={18} strokeWidth={1.75} />
	<label class="text-sm text-summit-light dark:text-summit" for={id}>{label}</label>
</div>
