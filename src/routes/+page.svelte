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

	// Extract banner blocks to render them first
	const bannerBlocks = $derived(
		story?.content?.body?.filter((blok) => blok.component === 'banner') || []
	);
	const nonBannerBlocks = $derived(
		story?.content?.body?.filter((blok) => blok.component !== 'banner') || []
	);
</script>

<!-- Render banners before hero -->
{#each bannerBlocks as blok}
	<StoryblokComponent {blok} />
{/each}

<Hero />

<!-- Render non-banner content -->
{#if story?.content && nonBannerBlocks.length > 0}
	<StoryblokComponent blok={{ ...story.content, body: nonBannerBlocks }} />
{/if}
