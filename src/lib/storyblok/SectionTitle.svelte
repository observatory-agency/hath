<script>
	import { storyblokEditable } from '@storyblok/svelte';

	export let blok;

	// Determine theme classes based on Storyblok selection
	$: textClass = blok.text_color === 'light' ? 'text-primary-text-light' : 'text-primary-text';
	$: borderClass =
		blok.text_color === 'light' ? 'border-primary-text-light' : 'border-primary-text';
</script>

<div use:storyblokEditable={blok} class="section-title">
	<h2
		class="text-4xl font-semibold tracking-tight text-balance uppercase lg:text-[128px] {textClass}"
	>
		{blok.title}
	</h2>
	<hr class="pt-2 {borderClass}" />
</div>
