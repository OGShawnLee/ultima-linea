<script lang="ts">
	import type { CardDraft } from '@draft/schema';
	import ButtonDelete from './ButtonDelete.svelte';
	import ButtonPublish from './ButtonPublish.svelte';
	import ButtonUpdate from './ButtonUpdate.svelte';
	import ButtonViewArticle from './ButtonViewArticle.svelte';
	import { Badge, Button, Picture, Radar, Time } from '@components';
	import { DropdownMenu } from 'bits-ui';
	import { CircleCheck, ClipboardPen, EllipsisVertical } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	export let background = true;
	export let draft: CardDraft;

	let state: 'DRAFTING' | 'PUBLISHED' | 'PUBLISHABLE' | 'UPDATABLE' = 'DRAFTING';
	$: {
		if (draft.is_published) {
			state = draft.can_be_published && draft.is_different_from_article ? 'UPDATABLE' : 'PUBLISHED';
		} else {
			state = draft.can_be_published ? 'PUBLISHABLE' : 'DRAFTING';
		}
	}
</script>

<article>
	<Picture
		rounded={background ? 'rounded-t-xl' : 'rounded-xl'}
		image={draft.image}
		caption={draft.caption}
	/>
	<div
		class="p-8 grid gap-6 {background
			? 'bg-ground-1-light dark:bg-ground-1'
			: 'bg-transparent'} rounded-xl"
	>
		{#if draft.region}
			<div class="flex items-center gap-2">
				{#if draft.featured && draft.article}
					<Badge featured />
				{/if}
				{#if draft.is_published && draft.article}
					<Badge href="/article/{draft.article.id}" published />
				{/if}
				<Badge region={draft.region} />
			</div>
		{/if}
		<a href="/dashboard/draft/{draft.id}" class="anchor-hover heading">
			<h2 class="font-semibold text-2xl">{draft.title}</h2>
		</a>
		{#if draft.summary}
			<p>{draft.summary}</p>
		{/if}
		<Time datetime={draft.updated_at} />
		<div class="flex items-center gap-2 flex-wrap">
			<Button href="/dashboard/{draft.id}/editor" icon={ClipboardPen} text="Editar" />
			<ButtonPublish {draft} square />
			<ButtonUpdate {draft} square />
			<DropdownMenu.Root>
				<div class="relative">
					{#if state === 'PUBLISHABLE'}
						<Radar colour="bg-emerald-600 dark:bg-emerald-400" />
					{/if}
					{#if state === 'UPDATABLE'}
						<Radar colour="bg-sky-600 dark:bg-sky-400" />
					{/if}
					<DropdownMenu.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							icon={EllipsisVertical}
							inverse
							label="Opciones"
							size="size-10"
						/>
					</DropdownMenu.Trigger>
				</div>
				<DropdownMenu.Content
					class="dialog--background z-90 min-w-60 p-1.25 grid gap-2"
					sameWidth={false}
					align="center"
					transition={fade}
					transitionConfig={{ duration: 150 }}
					sideOffset={8}
				>
					{#if state === 'UPDATABLE'}
						<DropdownMenu.Item asChild let:builder>
							<ButtonUpdate builders={[builder]} {draft} dropdown />
						</DropdownMenu.Item>
						<DropdownMenu.Item asChild let:builder>
							<ButtonViewArticle {draft} builders={[builder]} dropdown />
						</DropdownMenu.Item>
					{:else if state === 'PUBLISHED'}
						<DropdownMenu.Item asChild let:builder>
							<ButtonViewArticle {draft} builders={[builder]} dropdown />
						</DropdownMenu.Item>
					{:else if state === 'PUBLISHABLE'}
						<DropdownMenu.Item asChild let:builder>
							<ButtonPublish builders={[builder]} {draft} dropdown />
						</DropdownMenu.Item>
					{/if}
					<DropdownMenu.Item asChild let:builder>
						<ButtonDelete {draft} builders={[builder]} dropdown on:delete />
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
</article>
