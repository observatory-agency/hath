<script>
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	let { blok } = $props();
</script>

<section id="shows" class="py-40" use:storyblokEditable={blok}>
	<div class="container mx-auto">
		{#each blok.intro as blok}
			<StoryblokComponent {blok} />
		{/each}
		<StoryblokComponent blok={{ shows: blok.shows, component: 'shows' }} />
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
