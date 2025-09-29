<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import { hasBanner, isMobileMenuOpen } from '$lib/stores/banner.js';
	import { onMount, onDestroy } from 'svelte';

	export let blok;

	onMount(() => {
		hasBanner.set(true);
	});

	onDestroy(() => {
		hasBanner.set(false);
	});
</script>

<section
	use:storyblokEditable={blok}
	class="relative top-0 right-0 left-0 z-[15] bg-bg-dark px-4 transition-opacity duration-300 lg:px-0"
	class:opacity-0={$isMobileMenuOpen}
	class:pointer-events-none={$isMobileMenuOpen}
>
	<div
		class="container mx-auto flex flex-col items-start justify-center gap-2 py-3 sm:flex-row sm:items-center sm:gap-6"
	>
		<p class="font-header text-primary-text-light lg:text-xl">{blok.text}</p>
		<a
			href={blok.cta_link.cached_url}
			class="rounded-md border border-primary-text-light px-4 pt-2.5 pb-1.5 text-sm leading-none text-primary-text-light lg:text-base"
		>
			{blok.cta_text}
		</a>
	</div>
</section>
