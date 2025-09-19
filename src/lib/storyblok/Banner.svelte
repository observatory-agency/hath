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

<section {...storyblokEditable(blok)} class="bg-bg-dark">
	<div class="container mx-auto flex items-center justify-center gap-6 py-3">
		<p class="font-header text-xl text-dark-text">{blok.text}</p>
		<a
			href={blok.cta_link.cached_url}
			class="rounded-md border border-dark-text px-4 pt-2.5 pb-1.5 leading-none text-dark-text"
		>
			{blok.cta_text}
		</a>
	</div>
</section>
