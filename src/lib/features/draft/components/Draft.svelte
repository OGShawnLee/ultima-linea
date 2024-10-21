<script lang="ts">
  import type { CardDraft } from "@draft/schema";
  import { Button, Time } from "@components";
  import { ClipboardPen } from "lucide-svelte";

  export let draft: CardDraft;
</script>

<article class="inline-block mb-8">
  <div class="p-8 grid gap-6 bg-ground-1-light dark:bg-ground-1 rounded-xl">
    <a href="/dashboard/{draft.id}/editor" class="anchor-hover heading">
      <h2 class="font-semibold text-2xl">{draft.title}</h2>
    </a>
    {#if draft.summary}
      <p>{draft.summary}</p>
    {/if}
    <Time datetime={draft.updated_at} />
    <div class="flex items-center gap-4 flex-wrap">
      <Button href="/dashboard/{draft.id}/editor" icon={ClipboardPen} text="Editar" />
    </div>
  </div>
</article>