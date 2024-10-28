<script lang="ts">
	import SiteLogo from "@layout/site-logo.svelte";
	import SiteMenuLink from "@layout/site-menu-link.svelte";
	import { SiteButton } from "@layout/site-button";
	import { Button, Separator } from "@components";
	import { Status } from "@user/components";
	import { Dialog } from "bits-ui";
	import { Home, LayoutDashboard, Menu, Search } from "lucide-svelte";
	import { UserState } from "@state";
	import { fade } from "svelte/transition";

	const user = UserState.getContext();

	let open = false;
</script>

<!-- * MOBILE-MENU -->
<div class="md:hidden">
	<Dialog.Root bind:open openFocus={null}>
		<Dialog.Trigger asChild let:builder>
      <Button builders={[builder]} icon={Menu} label="Abrir Menu" size="size-10" />
		</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Content
				class="fixed inset-x-0 inset-y-0 z-50 px-4 bg-ground-0-light/90 dark:bg-ground-0/90 backdrop-filter backdrop-blur-lg overflow-y-auto overflow-x-hidden"
				transition={fade}
				transitionConfig={{ duration: 150 }}
			>
				<header class="h-20 flex items-center justify-between">
					<SiteLogo on:click={() => (open = false)} />
					<Dialog.Close asChild let:builder>
            <Button builders={[builder]} icon={Menu} label="Abrir Menu" size="size-10" />
					</Dialog.Close>
				</header>
				<div>
					<Status on:click={() => (open = false)} />
					<Separator class="-mx-8" orientation="horizontal" />
					<div class="py-4 grid gap-4">
						<SiteMenuLink href="/" icon={Home} label="Inicio" on:click={() => (open = false)} />
						{#if $user}
							<SiteMenuLink
								href="/dashboard"
								icon={LayoutDashboard}
								label="Dashboard"
								on:click={() => (open = false)}
							/>
							<!-- <SiteMenuLink
								href="/dashboard/editor"
								icon={NotebookPen}
								label="Editor"
								on:click={() => (open = false)}
							/> -->
						{/if}
					</div>
					<Separator class="-mx-8" orientation="horizontal" />
					<div class="py-4 grid gap-4">
						<SiteMenuLink
							href="/search"
							icon={Search}
							label="Busqueda"
							on:click={() => (open = false)}
						/>
						<SiteButton.SignInOut />
					</div>
					<Separator class="-mx-8" orientation="horizontal" />
					<div class="py-4 grid gap-4">
						<SiteButton.ToggleMode variant="options" />
					</div>
				</div>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
</div>

<!-- * DESKTOP-MENU-CONTAINER -->
<div class="hidden md:(flex gap-2)">
	<slot />
</div>