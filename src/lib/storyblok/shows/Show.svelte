<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import GhostButton from '$lib/components/ui/ButtonGhost.svelte';

	export let blok;
</script>

<div use:storyblokEditable={blok} class="py-12">
	<div class="grid grid-cols-12 gap-12">
		<div class="col-span-6">
			<img
				src={blok.flyer.filename}
				alt={blok.title}
				class="h-[616px] w-full transform object-cover object-top"
				loading="lazy"
				width="616"
				height="616"
			/>
		</div>
		<div class="col-span-5 flex flex-col items-start gap-8">
			<p class="text-5xl text-primary-text-light uppercase">
				{blok.title}
			</p>
			<div class="flex flex-col gap-2">
				<p class="text-3xl font-light text-primary-text-light">{blok.date}</p>
				<a
					href={blok.location_link.cached_url}
					class="text-3xl font-light text-primary-text-light underline transition-colors duration-200 hover:text-secondary-text-light"
					rel="noopener noreferrer"
					target="_blank">{blok.location_text}</a
				>
				<p class="mt-4 text-2xl text-secondary-text-light">{blok.description}</p>
			</div>
			<div>
				<GhostButton text="Buy Tickets" href={blok.tickets_link.cached_url} />
			</div>
		</div>
	</div>
</div>
