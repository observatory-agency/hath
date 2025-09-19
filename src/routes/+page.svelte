<script>
	import { StoryblokComponent, useStoryblokBridge } from '@storyblok/svelte';
	import { onMount } from 'svelte';
	import Hero from '$lib/components/Hero.svelte';

	onMount(() => {
		useStoryblokBridge(story?.id, (newStory) => {
			story = newStory;
		});
	});

	let { data } = $props();

	let story = $state(data.story);
</script>

<Hero />
<StoryblokComponent blok={story.content} />
