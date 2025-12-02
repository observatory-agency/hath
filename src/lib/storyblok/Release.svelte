<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import Button from '$lib/components/ui/ButtonGhostLink.svelte';

	export let blok;
</script>

<div use:storyblokEditable={blok}>
	<div class="flex flex-col gap-4">
		<img src={blok.cover.filename} alt={blok.title || 'Release'} class="w-full object-cover" />
		<div
			class="mt-4 flex w-full flex-col items-start justify-between gap-4 lg:flex-row lg:items-center lg:gap-0"
		>
			<div class="flex flex-col gap-1">
				<p class="text-2xl text-primary-text-light lg:text-3xl">{blok.title}</p>
				<p class="text-lg font-light text-secondary-text-light lg:text-xl">{blok.description}</p>
			</div>
			<Button text="Listen" href={blok.link.cached_url} target="_blank" rel="noopener noreferrer" />
		</div>
	</div>
</div>
