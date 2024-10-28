<script lang="ts">
	import { UserState } from '@state';

	const user = UserState.getContext();
</script>

{#if $user}
	<a class="py-4 flex justify-between outline-none" href="/author" on:click>
		<div class="grid">
			<span class="font-medium text-lg text-summit-light dark:text-summit">
				{$user.name}
			</span>
			<span class="text-sm text-lesser-light dark:text-lesser">
				{$user.display_name}
			</span>
		</div>
	</a>
{/if}
