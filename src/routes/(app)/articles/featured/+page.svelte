<script>
  import { Header, Main } from  "@components";
  import { Card } from  "@article/components";

  export let data;
</script>

<svelte:head>
  <title>Noticias Destacadas - Última Linea</title>
  <meta name="description" content="Noticias destacadas" />
  <meta name="og:title" content="Noticias destacadas" />
  <meta name="og:image" content={data.articles[0].image.image_url} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Noticias destacadas" />
  <meta name="twitter:description" content="Mira noticias destacadas en Última Linea." />
  <meta name="twitter:image" content={data.articles[0].image.image_url} />
</svelte:head>

<Main>
  <section class="container--padding py-12 md:py-16 grid gap-8">
    <Header variant="heading-1">
      Noticias Destacadas
    </Header>
    <div class="grid gap-8 md:gap-16">
      <Card article={data.articles[0]} variant="hero" />
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 xl:gap-x-8 gap-8">
        {#each data.articles.slice(1) as article (article.id)}
          <Card {article} background variant="medium" />
        {/each}
      </div>
    </div>
  </section>
</Main>