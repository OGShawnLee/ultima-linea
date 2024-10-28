<script>
	import SiteMenuLink from "../site-menu-link.svelte";
	import { LogIn, LogOut } from "lucide-svelte";
	import { UserState } from "$lib/state";

	export let square = false;

	const user = UserState.getContext();
</script>

<SiteMenuLink
	href={$user ? "/auth/sign-out" : "/auth/sign-in"}
	icon={$user ? LogOut : LogIn}
	label={$user ? "Salir" : "Acceder"}
	{square}
	on:click
/>