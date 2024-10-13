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
      <a class="button button--lesser h-10 px-4 rounded-lg" href="/auth/sign-up">
        <span class="text-white"> Acceder </span>
			</a>
    </div>
	</div>
</header>

<slot />