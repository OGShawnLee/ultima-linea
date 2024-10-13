<script lang="ts">
  import { ArrowRight } from "lucide-svelte";

  export let category: string;
</script>

<a class="h-14 pl-8 pr-2 py-2 self-center flex justify-center items-center gap-4 bg-ground-3-light dark:bg-ground-3 rounded-full" href="/">
  <p class="text-sm md:text-base text-summit-light dark:text-summit font-semibold">Mira más noticias en {category}</p>
  <div class="size-10 flex items-center justify-center bg-marque rounded-full">
    <ArrowRight class="text-summit" />  
  </div>
</a>