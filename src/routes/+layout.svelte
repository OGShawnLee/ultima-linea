<script>
	import 'virtual:uno.css';
	import '@unocss/reset/tailwind.css';
	import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher defaultMode="system" />

<slot />

<style>
	:global(body) {
		--uno: 'bg-ground-0-light dark:bg-ground-0 font-satoshi text-common-light dark:text-common';
	}
</style>
