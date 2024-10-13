<script>
  export let datetime = new Date("2024-09-24");

  const formatter = new Intl.DateTimeFormat("es-MX", {
    dateStyle: "full",
    timeStyle: "short",
  });
</script>

<div>
  <time class="text-xs text-lesser font-medium" datetime="">
    {formatter.format(datetime)}
  </time>
</div>