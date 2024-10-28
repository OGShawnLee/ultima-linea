<script lang="ts">
	import { X } from 'lucide-svelte';
	import { Input } from '$lib/components';

	export let variant: 'sign-in' | 'sign-up' = 'sign-up';
	export let enhance: (element: HTMLFormElement) => void;

	$: title = variant === 'sign-in' ? 'Acceso' : 'Registro';
</script>

<svelte:head>
	<title>{title} - Última Linea</title>
</svelte:head>

<main class="min-h-screen px-2 sm:px-0 py-12 md:grid place-content-center gap-0.5">
	<div class="h-16 px-8 flex items-center">
		<a href="/">
			<span class="uppercase text-summit-light dark:text-summit text-2xl font-black tracking-tight"> Última Linea </span>
		</a>
	</div>
	<div class="md:w-xl flex flex-col bg-ground-1-light dark:bg-ground-1 rounded-xl border border-ground-3-light dark:border-ground-3">
		<div
			class="self-stretch h-20 px-8 border-b border-ground-3-light dark:border-ground-3 justify-between items-center inline-flex"
		>
			<h1 class="heading-2">{title}</h1>
			<a
				class="w-10 h-10 flex items-center justify-center bg-ground-0-light dark:bg-ground-0 border border-ground-3-light dark:border-ground-3 rounded-xl hover:(bg-ground-4 text-white)"
				href="/"
			>
				<X />
			</a>
		</div>
		<form class="self-stretch p-8 flex-col justify-center gap-6 flex" method="post" use:enhance>
			<slot {Input} />
			<button class="w-full h-12 bg-summit-light dark:bg-summit rounded-xl justify-center items-center inline-flex">
				<div class="text-summit dark:text-summit-light font-bold">Continuar</div>
			</button>
			<a
				class="border-focus-effect h-10 px-4 self-center flex items-center justify-center rounded-full"
				href="/auth/{variant == 'sign-in' ? 'sign-up' : 'sign-in'}"
			>
				{variant === 'sign-in' ? '¿No tiene una cuenta?' : '¿Ya tiene una cuenta?'}
			</a>
		</form>
	</div>
</main>
