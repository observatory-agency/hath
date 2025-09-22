<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import { hasBanner } from '$lib/stores/banner.js';
	import { onMount, onDestroy } from 'svelte';

	export let blok;

	onMount(() => {
		hasBanner.set(true);
	});

	onDestroy(() => {
		hasBanner.set(false);
	});
</script>

<section use:storyblokEditable={blok} class="bg-bg-dark">
	<div class="container mx-auto flex items-center justify-center gap-6 py-3">
		<p class="text-dark-text font-header text-xl">{blok.text}</p>
		<a
			href={blok.cta_link.cached_url}
			class="border-dark-text text-dark-text rounded-md border px-4 pt-2.5 pb-1.5 leading-none"
		>
			{blok.cta_text}
		</a>
	</div>
</section>
