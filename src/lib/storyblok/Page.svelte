<script>
	import { StoryblokComponent } from '@storyblok/svelte';

	export let blok;
</script>

{#each blok.body as blok}
	<StoryblokComponent {blok} />
{/each}
