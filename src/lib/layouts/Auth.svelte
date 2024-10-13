<script lang="ts">
	import { X } from 'lucide-svelte';
	import { Input } from '$lib/components';

	export let variant: 'sign-in' | 'sign-up' = 'sign-up';

	$: title = variant === 'sign-in' ? 'Acceso' : 'Registro';
</script>

<svelte:head>
	<title>Ultima Linea - {title}</title>
</svelte:head>

<div class="min-h-screen px-2 sm:px-0 py-12 bg-black md:grid place-content-center gap-0.5">
	<div class="h-16 px-8 flex items-center">
		<a href="/">
			<span class="uppercase text-white text-2xl font-black tracking-tight"> Ultima Linea </span>
		</a>
	</div>
	<div class="md:w-xl flex flex-col bg-ground-1 rounded-xl border border-ground-3">
		<div
			class="self-stretch h-20 px-8 border-b border-ground-3 justify-between items-center inline-flex"
		>
			<div class="text-white text-3xl font-bold">{title}</div>
			<a
				class="w-10 h-10 flex items-center justify-center bg-black border border-ground-3 rounded-xl hover:(bg-ground-4 text-white)"
				href="/"
			>
				<X />
			</a>
		</div>
		<div class="self-stretch p-8 flex-col justify-center items-center gap-6 flex">
			<slot {Input} />
			<button class="w-full h-12 bg-white rounded-xl justify-center items-center inline-flex">
				<div class="text-black font-bold">Continuar</div>
			</button>
			<a
				class="border-focus-effect h-10 px-4 flex items-center justify-center rounded-full"
				href="/auth/{variant == 'sign-in' ? 'sign-up' : 'sign-in'}"
			>
				{variant === 'sign-in' ? '¿No tiene una cuenta?' : '¿Ya tiene una cuenta?'}
			</a>
		</div>
	</div>
</div>
