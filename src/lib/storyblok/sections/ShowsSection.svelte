<script>
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	let { blok } = $props();
</script>

<section id="shows" use:storyblokEditable={blok}>
	<div class="container mx-auto px-4 py-24 lg:px-0 lg:py-40">
		{#each blok.intro as blok}
			<StoryblokComponent {blok} />
		{/each}
		{#if blok.shows && blok.shows.length > 0}
			<StoryblokComponent blok={{ shows: blok.shows, component: 'shows' }} />
		{:else}
			<p class="mt-12 text-center text-3xl text-primary-text-light italic lg:mt-24">
				No shows scheduled right now. We're working on riffs. 💪
			</p>
		{/if}
	</div>
</section>

<style>
	#shows {
		background: hsl(30deg 20% 96.08% / 0.4) url('/img/bg/shows-bg.avif');
		background-blend-mode: hard-light;
		background-size: cover, cover;
		background-position: center, center;
		background-repeat: no-repeat, no-repeat;
	}
</style>
