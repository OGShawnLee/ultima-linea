<script lang="ts">
  import { concat } from "$lib";

  let className = "";

  export { className as class };
</script>

<div class={concat("flex flex-col gap-2", className)}>
  <slot />
</div>