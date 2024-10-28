<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { mode, setMode, toggleMode } from 'mode-watcher';
	import { Button } from '@components';

	export let variant: 'toggle' | 'options' = 'toggle';
</script>

{#if variant === 'toggle'}
	<Button
		icon={$mode === 'dark' ? Sun : Moon}
		label={$mode === 'dark' ? 'Activar Modo Claro' : 'Activar Modo Oscuro'}
		size="size-10"
		on:click={toggleMode}
	/>
{/if}

{#if variant === 'options'}
	<div class="group flex items-center justify-between">
		<span
			class="text-lesser-light dark:text-lesser group-focus-within:text-summit-light dark:group-focus-within:text-summit"
		>
			Color
		</span>
		<div class="flex items-center gap-2">
			<Button
				icon={Sun}
				label="Activar Modo Claro"
				side="left"
				size="size-10"
				on:click={() => setMode('light')}
			/>
			<Button
				icon={Moon}
				label="Activar Modo Oscuro"
				side="left"
				size="size-10"
				on:click={() => setMode('dark')}
			/>
		</div>
	</div>
{/if}
