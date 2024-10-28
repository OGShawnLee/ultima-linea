<script>
	import { Button } from '@components';
	import { LogIn, LogOut, Moon, Search, Sun } from 'lucide-svelte';
	import { UserState } from '@state';
	import { mode, toggleMode } from 'mode-watcher';

	const currentUser = UserState.getContext();
</script>

<header
	class="fixed top-0 z-10 inset-0 h-20 bg-ground-0-light/75 dark:bg-ground-0/75 backdrop-filter backdrop-blur-lg"
>
	<div class="container container--padding h-full flex items-center justify-between">
		<div class="flex items-center gap-12">
			<a href="/">
				<span
					class="uppercase text-summit-light dark:text-summit text-2xl font-black tracking-tight"
				>
					Última Linea
				</span>
			</a>
			<nav class="hidden sm:(flex items-center gap-8)">
				<a class="anchor-hover" href="/">Inicio</a>
				{#if $currentUser}
					<a class="anchor-hover" href="/dashboard">Dashboard</a>
					<a class="anchor-hover" href="/dashboard/editor">Editor</a>
				{/if}
			</nav>
		</div>
		<div class="hidden sm:flex gap-2">
			<Button
				background={false}
				href="/search"
				icon={Search}
				label="Buscar Artículos"
				size="size-10"
			/>
			<Button
				icon={$mode === 'dark' ? Sun : Moon}
				label={$mode === 'dark' ? 'Activar Modo Claro' : 'Activar Modo Oscuro'}
				size="size-10"
				on:click={toggleMode}
			/>
			{#if $currentUser}
				<Button href="/auth/sign-out" icon={LogOut} text="Salir"  />
			{:else}
				<Button href="/auth/sign-in" icon={LogIn} text="Acceder" />
			{/if}
		</div>
	</div>
</header>

<slot />
