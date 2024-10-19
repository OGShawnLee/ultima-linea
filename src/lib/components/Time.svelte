<script lang="ts">
  export let datetime = new Date("2024-09-24");
  export let variant: "joined" | "published" = "published";

  const formatter = new Intl.DateTimeFormat("es-MX", {
    dateStyle: "full",
    timeStyle: "short",
  });
</script>

<div>
  {#if variant === "joined"}
    <span class="text-xs text-lesser-light dark:text-lesser font-medium">Se unió el </span>
  {/if}
  <time class="text-xs text-lesser-light dark:text-lesser font-medium" datetime="">
    {formatter.format(datetime)}
  </time>
</div>