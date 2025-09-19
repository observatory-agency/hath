<script>
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok;
</script>

<section {...storyblokEditable(blok)} class="card-grid mx-auto mt-12 lg:mt-24">
	{#if blok.number_of_columns === '1'}
		<div class="grid grid-cols-1 gap-10">
			{#each blok.columns as blok}
				<StoryblokComponent {blok} />
			{/each}
		</div>
	{:else if blok.number_of_columns === '2'}
		<div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
			{#each blok.columns as blok}
				<StoryblokComponent {blok} />
			{/each}
		</div>
	{:else if blok.number_of_columns === '3'}
		<div class="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
			{#each blok.columns as blok}
				<StoryblokComponent {blok} />
			{/each}
		</div>
	{:else if blok.number_of_columns === '4'}
		<div class="grid grid-cols-1 gap-10 md:grid-cols-4">
			{#each blok.columns as blok}
				<StoryblokComponent {blok} />
			{/each}
		</div>
	{:else if blok.number_of_columns === '12'}
		<div class="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-10">
			{#each blok.columns as blok}
				<StoryblokComponent {blok} />
			{/each}
		</div>
	{/if}
</section>
