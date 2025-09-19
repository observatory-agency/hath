<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import Button from '$lib/components/ui/ButtonGhostLink.svelte';

	export let blok;
</script>

<div {...storyblokEditable(blok)}>
	<div class="flex flex-col gap-4">
		<img src={blok.cover.filename} alt={blok.title || 'Release'} class="object-cover w-full" />
		<div class="flex justify-between items-start mt-8 w-full">
			<div class="flex flex-col gap-2">
				<p class="text-3xl text-primary-text-light">{blok.title}</p>
				<p class="text-2xl font-light text-secondary-text-light">{blok.description}</p>
			</div>
			<Button text="Listen" href={blok.link.cached_url} target="_blank" rel="noopener noreferrer" />
		</div>
	</div>
</div>
