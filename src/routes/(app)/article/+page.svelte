<script>
	import { Bookmark, Share2 as Share } from 'lucide-svelte';
	import { Button, Card, Badge, Main, Picture, Time } from '$lib/components';

	function handleShare() {
		navigator.share({
			title:
				'El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD. 2017 el año en que AMLO los llamó, pero ellos no le hicieron caso',
			text: 'Mira la noticia en Ultima Linea.',
			url: window.location.href
		});
	}
</script>

<svelte:head>
	<title>
		El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD. 2017 el
		año en que AMLO los llamó, pero ellos no le hicieron caso
	</title>
	<meta name="description" content="Después de muchos años, el PRD ha perdido su registro a nivel nacional." />
	<meta
		name="og:title"
		content="El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD. 2017 el año en que AMLO los llamó, pero ellos no le hicieron caso"
	/>
	<meta
		name="og:image"
		content="https://utfs.io/f/6843c429-5103-48ae-a99f-833082026e41-57p9e8.jpeg"
	/>
	<meta name="twitter:card" content="summary" />
	<meta
		name="twitter:title"
		content="El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD. 2017 el año en que AMLO los llamó, pero ellos no le hicieron caso"
	/>
	<meta name="twitter:description" content="Mira la noticia en Ultima Linea." />
	<meta
		name="twitter:image"
		content="https://utfs.io/f/6843c429-5103-48ae-a99f-833082026e41-57p9e8.jpeg"
	/>
</svelte:head>

<Main>
	<div class="container--padding py-12 md:py-16">
		<div class="grid xl:grid-cols-12 items-start gap-y-12 lg:gap-x-8 xl:gap-x-12">
			<article class="xl:col-span-8 grid gap-12">
				<header class="md:px-16 grid gap-6">
					<div class="flex items-center gap-4 flex-wrap">
						<Badge badge="Nacional" earth />
						<Badge badge="Política" />
					</div>
					<h1 class="heading-1">
						El PRD pierde su registro a nivel nacional. 2012, el año que López Obrador dejó el PRD.
						2017 el año en que AMLO los llamó, pero ellos no le hicieron caso
					</h1>
					<div>
						<p class="text-xs">
							Por
							<a class="font-semibold hover:(text-marque-light dark:text-marque)" href="/author">Luis Donaldo Ortiz García</a> 
						</p>
						<Time />
					</div>
					<div>
						<p>
							Después de muchos años, el PRD ha perdido su registro a nivel nacional. Obrador se
							despide emotivamente y sin rencores hacia el partido que alguna vez figuro como la
							casa del actual presidente, Andres Manuel López Obrador.
						</p>
					</div>
					<div class="flex items-center justify-end gap-2">
						<Button icon={Bookmark} size="size-10" />
						<Button icon={Share} text="Compartir" on:click={handleShare} />
					</div>
				</header>
				<Picture label />
				<div class="grid gap-4">
					<p class="md:px-16 leading-loose">
						<strong class="text-summit-light dark:text-summit">
							En septiembre de 2012, después de perder las elecciones presidenciales frente a
							Enrique Peña Nieto, López Obrador anunció su salida del Partido de la Revolución
							Democrática. Ese año, en un mitin realizado en el Zócalo de la CDMX declaro:
						</strong>
					</p>
					<blockquote
						class="my-4 md:mx-6 px-10 py-4 bg-ground-1-light dark:bg-ground-1 border-l-4 border-ground-4 rounded-r-xl leading-loose"
					>
						<p>
							No se trata de una ruptura, me despido en los mejores términos. Agradezco, en
							especial, a los militantes y dirigentes del PRD, partido en el que me tocó participar
							desde su fundación, del cual fui dirigente y en el que milité durante estos últimos 23
							años. Tengo en el PRD muchos amigos que en todo momento me dieron su confianza y
							respaldo y, en correspondencia, considero que les di lo mejor de mí y los representé
							con entrega y dignidad. Estamos a mano y en paz.
						</p>
					</blockquote>
					<p class="md:px-16 leading-loose">
						<strong class="text-summit-light dark:text-summit">
							Ya para entonces López Obrador venía conformando un movimiento que se llamaría Morena,
							Movimiento de Regeneración Nacional.
						</strong>
						Muchos militantes del PRD se pasaron a Morena, ahí empezó la debacle del PRD que, después
						de estas elecciones pierde su registro a nivel nacional al no alcanzar el 3 por ciento de
						la votación en las elecciones del 2 de junio.
					</p>
					<p class="md:px-16 leading-loose">
						Todavía en 2017 López Obrador hizo un llamado a la dirigencia del PRD para que se
						unieran a Morena en las elecciones del Estado de México; pero el PRD no hizo caso:
					</p>
					<blockquote
						class="my-4 md:mx-6 px-10 py-4 bg-ground-1-light dark:bg-ground-1 border-l-4 border-ground-4 rounded-r-xl leading-loose"
					>
						<p>
							Aquí en el Estado de México lo digo con toda claridad, con franqueza: si en la entidad
							en estos días no hay un deslinde de PRD, PT y de Movimiento Ciudadano, y siguen
							apoyando a (Enrique) Peña Nieto y al régimen corrupto, no va a haber ningún compromiso
							hacia adelante; en 2018 no vamos a ir con ellos.
						</p>
					</blockquote>
					<p class="md:px-16 leading-loose">
						<strong class="text-summit-light dark:text-summit">
							Hoy muchos perredistas han de estar lamentando no haber hecho caso a ese llamado.
						</strong>
					</p>
				</div>
			</article>
			<section class="xl:col-span-4 flex flex-col gap-8">
				<header class="section-header">
					<h2 class="heading-2">Ultimas Noticias</h2>
				</header>
				<div class="xl:hidden">
					<Card variant="horizontal" />
				</div>
				<div class="hidden xl:block">
					<Card />
				</div>
				<div class="grid md:grid-cols-2 xl:(flex flex-col) gap-4">
					{#each { length: 4 } as _}
						<Card variant="vertical-small" />
					{/each}
				</div>
			</section>
		</div>
	</div>
	<section class="container--padding py-12 md:py-16 flex flex-col gap-8 bg-ground-1-light dark:bg-ground-1 2xl:rounded-xl">
		<header class="section-header">
			<h2 class="heading-2">Noticias Relacionadas</h2>
		</header>
		<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 xl:gap-x-8 gap-8">
			{#each { length: 12 } as _}
				<Card background={false} />
			{/each}
		</div>
	</section>
</Main>
