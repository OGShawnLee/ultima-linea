<script>
	import { Button } from '$lib/components';
	import { LogIn, LogOut, Moon, Search, Sun } from 'lucide-svelte';
	import { UserState } from '@state';
	import { mode, toggleMode } from 'mode-watcher';
	import { enhance } from '$app/forms';

	const currentUser = UserState.getContext();
</script>

<header
	class="fixed top-0 inset-0 h-20 bg-ground-0-light/75 dark:bg-ground-0/75 backdrop-filter backdrop-blur-lg"
>
	<div class="container container--padding h-full flex items-center justify-between">
		<div class="flex items-center gap-12">
			<a href="/">
				<span
					class="uppercase text-summit-light dark:text-summit text-2xl font-black tracking-tight"
				>
					Ultima Linea
				</span>
			</a>
			<nav class="hidden sm:flex">
				<a href="/">Inicio</a>
			</nav>
		</div>
		<div class="hidden sm:flex gap-2">
			<Button background={false} href="/search" icon={Search} size="size-10" />
			<Button icon={$mode === 'dark' ? Sun : Moon} size="size-10" on:click={toggleMode} />
			{#if $currentUser}
				<Button href="/auth/sign-out" text="Salir" icon={LogOut} />
			{:else}
				<Button href="/auth/sign-in" text="Acceder" icon={LogIn} />
			{/if}
		</div>
	</div>
</header>

<slot />
