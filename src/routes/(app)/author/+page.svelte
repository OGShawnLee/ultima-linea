<script>
	import { Header, Main, Text, Time } from '@components';
	import { Card } from '@article/components';
	import { SocialMedia } from '@user/components';
</script>

<svelte:head>
	<title>Luis Donaldo Ortiz García - Ultima Linea</title>
	<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
</svelte:head>

<Main>
	<section class="container--padding py-12 md:py-16">
		<!-- Grid Container -->
		<div class="grid gap-12 items-start place-content-center lg:grid-cols-12">
			<!-- Left Container (Author Social Media)-->
			<div class="hidden content-start gap-8 lg:(col-span-3 grid) xl:col-span-2">
				<!-- Author Profile Picture -->
				<div class="w-full">
					<img
						class="rounded-xl object-center object-cover aspect-ratio-square"
						src="https://i.pinimg.com/enabled_lo/564x/df/88/31/df8831f66e6b6211fe1212d3327f286a.jpg"
						alt="Luis Donaldo Ortiz García"
					/>
				</div>
				<!-- Author Social Media -->
				<div class="px-4 grid gap-4">
					<SocialMedia as="anchor" icon="bxl-twitter" text="@SnakeGuitar" />
					<SocialMedia as="anchor" icon="bxl-github" text="@SnakeGuitar" />
					<SocialMedia as="anchor" icon="bxl-linkedin-square" text="Luis Donaldo Ortiz García" />
				</div>
			</div>
			<!-- Right Container (Author Information) -->
			<div class="max-w-2xl grid gap-8 lg:(col-span-9 max-w-initial) xl:col-span-6">
				<!-- Author Header -->
				<header class="flex flex-col gap-8 lt-md:(items-center text-center) md:flex-row">
					<div class="size-32 lt-md:self-center lg:hidden">
						<!-- Author Profile Picture -->
						<img
							class="rounded-xl object-center object-cover aspect-ratio-square"
							src="https://i.pinimg.com/enabled_lo/564x/df/88/31/df8831f66e6b6211fe1212d3327f286a.jpg"
							alt="Luis Donaldo Ortiz García"
						/>
					</div>
					<div class="h-min grid gap-4">
						<h1 class="heading-1">Luis Donaldo Ortiz García</h1>
						<p class="text-xl">
							I cover climate change and the environment in the New York City region.
						</p>
						<Time variant="joined" />
					</div>
				</header>
				<!-- Author Biography -->
				<Text.Group>
					<h2 class="heading-2">What I cover</h2>
					<p>
						I write about how New Yorkers are adjusting to global warming. My reporting includes
						coverage of extreme weather events, stories about how the city is adapting to
						climate-related challenges, explanatory pieces and profiles.
					</p>
					<h2 class="heading-2">My Background</h2>
					<p>
						Most recently, I was a features editor for Metropolitan, a weekly section about the New
						York region published every Sunday. Before that, I edited a debate series for the Times
						Opinion section and was a freelance writer for the Travel and Style sections.
					</p>
					<h2 class="heading-2">Journalistic Ethics</h2>
					<p>
						Like all Times journalists, I am committed to upholding the standards of integrity
						outlined in our Ethical Journalism Handbook. Before I came to The Times, I waited tables
						and worked as a temp at organizations including nonprofits, literary agencies and
						investment banks. Everywhere I worked, I listened to the stories of colleagues and
						customers, relishing the multiple points of view. I strive to do the same in my
						reporting, while keeping accuracy and fairness front of mind.
					</p>
				</Text.Group>
				<!-- Author Contact -->
				<div class="grid gap-4 lg:hidden">
					<h2 class="heading-2">Contact</h2>
					<div class="flex items-center gap-4 flex-wrap">
						<SocialMedia as="button" icon="bxl-twitter" text="SnakeGuitar" />
						<SocialMedia as="button" icon="bxl-github" text="SnakeGuitar" />
						<SocialMedia as="button" icon="bxl-linkedin" text="Luis Donaldo Ortiz García" />
					</div>
				</div>
			</div>
			<!-- Advertisement -->
			<div class="hidden xl:(grid col-span-4)">
				<img
					class="rounded-xl"
					src="https://asset-cdn.campaignbrief.com/wp-content/uploads/2020/12/16094942/SAC_ATL_Bogan-Haylz.jpg"
					alt=""
				/>
			</div>
		</div>
	</section>
	<section
		class="py-12 md:py-16 container--padding flex flex-col gap-8 bg-ground-1-light dark:bg-ground-1 2xl:rounded-xl"
	>
		<Header variant="heading-2">Noticias Destacadas</Header>
		<div class="grid gap-8 md:gap-16">
			<Card variant="horizontal" />
			<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 xl:gap-x-8 gap-8">
				{#each { length: 6 } as _}
					<Card variant="medium" />
				{/each}
			</div>
		</div>
	</section>
</Main>