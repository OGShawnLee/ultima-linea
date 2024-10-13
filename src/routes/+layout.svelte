<script>
	import 'virtual:uno.css';
	import '@unocss/reset/tailwind.css';
</script>

<header class="fixed top-0 inset-0 h-20 bg-ground-0/75 backdrop-filter backdrop-blur-lg">
	<div class="h-full px-4 md:px-8 flex items-center justify-between">
		<div class="flex items-center gap-12">
			<a href="/">
				<span class="uppercase text-white text-2xl font-black tracking-tight"> Ultima Linea </span>
			</a>
			<nav class="hidden sm:flex">
				<a href="/">Inicio</a>
			</nav>
		</div>
    <div class="hidden sm:flex">
      <button class="button h-10 px-4 bg-ground-3 rounded-lg">
        <span class="text-white"> Acceder </span>
      </button>
    </div>
	</div>
</header>

<slot />

<style>
	:global(body) {
		--uno: 'bg-ground-0 font-geist text-common';
	}
</style>
