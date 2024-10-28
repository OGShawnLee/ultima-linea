<script>
	import { Button } from '@components';
	import { SiteButton, SiteMenu } from '@layout';
	import { Search } from 'lucide-svelte';
	import { UserState } from '@state';
	import { LogIn, LogOut } from 'lucide-svelte';

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
			<nav class="hidden md:(flex items-center gap-8)">
				<a class="anchor-hover" href="/">Inicio</a>
				{#if $currentUser}
					<a class="anchor-hover" href="/dashboard">Dashboard</a>
					<a class="anchor-hover" href="/dashboard/editor">Editor</a>
				{/if}
			</nav>
		</div>
		<SiteMenu>
			<Button
				background={false}
				href="/search"
				icon={Search}
				label="Buscar Artículos"
				size="size-10"
			/>
			<SiteButton.ToggleMode />
			{#if $currentUser}
				<Button href="/auth/sign-out" icon={LogOut} text="Salir" />
			{:else}
				<Button href="/auth/sign-in" icon={LogIn} text="Acceder" />
			{/if}
		</SiteMenu>
	</div>
</header>

<slot />
