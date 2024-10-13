<script>
	import { Button } from "$lib/components";
	import { LogIn, Moon, Sun } from "lucide-svelte";
	import { mode, toggleMode } from "mode-watcher";
</script>

<header class="fixed top-0 inset-0 h-20 bg-ground-0-light/75 dark:bg-ground-0/75 backdrop-filter backdrop-blur-lg">
	<div class="h-full px-4 md:px-8 flex items-center justify-between">
		<div class="flex items-center gap-12">
			<a href="/">
				<span class="uppercase text-summit-light dark:text-summit text-2xl font-black tracking-tight"> Ultima Linea </span>
			</a>
			<nav class="hidden sm:flex">
				<a href="/">Inicio</a>
			</nav>
		</div>
    <div class="hidden sm:flex gap-2">
			<Button icon={$mode === "dark" ? Sun : Moon} on:click={toggleMode} size="size-10" />
      <Button href="/auth/sign-up" text="Acceder" icon={LogIn} />
    </div>
	</div>
</header>

<slot />