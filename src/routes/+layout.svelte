<script>
	import 'virtual:uno.css';
	import '@unocss/reset/tailwind-compat.css';
	import { ModeWatcher } from 'mode-watcher';
	import { UserState } from '@state';
	import { Toaster } from "@components";

	export let data;

	const currentUser = UserState.mount(data.currentUser);
	$: currentUser.set(data.currentUser);
</script>

<ModeWatcher defaultMode="system" />
<Toaster />

<slot />

<style>
	:global(body) {
		--uno: 'bg-ground-0-light dark:bg-ground-0 font-satoshi text-common-light dark:text-common';
	}

	:global(button, [type='button'], [type='reset'], [type='submit']) {
		background-image: none;
	}
</style>
