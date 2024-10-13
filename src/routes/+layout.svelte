<script>
	import 'virtual:uno.css';
	import '@unocss/reset/tailwind.css';
</script>

<slot />

<style>
	:global(body) {
		--uno: 'bg-ground-0 font-geist text-common';
	}
</style>
