<script>
	import { storyblokEditable, renderRichText } from '@storyblok/svelte';
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import GhostButton from '$lib/components/ui/ButtonGhost.svelte';

	export let blok;

	let showLightbox = false;

	function formatDate(dateString) {
		if (!dateString) return '';

		const date = new Date(dateString);
		if (isNaN(date.getTime())) return dateString; // Return original if invalid date

		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const year = date.getFullYear();

		return `${month}/${day}/${year}`;
	}

	function openLightbox() {
		showLightbox = true;
		document.body.style.overflow = 'hidden'; // Prevent background scrolling
	}

	function closeLightbox() {
		showLightbox = false;
		document.body.style.overflow = ''; // Restore scrolling
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			closeLightbox();
		}
	}

	function handleBackgroundClick(event) {
		if (event.target === event.currentTarget) {
			closeLightbox();
		}
	}
</script>

<div use:storyblokEditable={blok} class="py-12">
	<div class="grid gap-12 lg:grid-cols-12">
		<div class="lg:col-span-6">
			<button
				type="button"
				on:click={openLightbox}
				class="block w-full cursor-pointer transition-transform duration-200 hover:scale-105"
			>
				<img
					src={blok.flyer.filename}
					alt={blok.title}
					class="h-[616px] w-full transform object-cover object-top"
					loading="lazy"
					width="616"
					height="616"
				/>
			</button>
		</div>
		<div class="flex flex-col items-start gap-8 lg:col-span-5">
			<p class="text-2xl text-balance text-primary-text-light uppercase lg:text-4xl">
				{blok.title}
			</p>
			<div class="flex flex-col gap-4">
				<p class="text-3xl font-light text-primary-text-light">{formatDate(blok.date)}</p>
				<a
					href={blok.location_link.cached_url}
					class="text-3xl font-light text-primary-text-light underline transition-colors duration-200 hover:text-secondary-text-light"
					rel="noopener noreferrer"
					target="_blank">{blok.location_text}</a
				>
				<div
					class="prose prose-p:my-2.5 prose-p:text-2xl prose-p:text-pretty prose-p:text-secondary-text-light"
				>
					{@html renderRichText(blok.description)}
				</div>
			</div>
			<div>
				<GhostButton text="Buy Tickets" href={blok.tickets_link.cached_url} />
			</div>
		</div>
	</div>
</div>

<!-- Lightbox overlay -->
{#if showLightbox}
	<div
		class="bg-opacity-75 fixed inset-0 z-20 flex items-center justify-center bg-[#0F1010]/95 p-4"
		on:click={handleBackgroundClick}
		on:keydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-label="Image lightbox"
		tabindex="-1"
		transition:fade={{ duration: 200 }}
	>
		<div class="relative max-h-full max-w-full">
			<button
				type="button"
				on:click={closeLightbox}
				class="absolute -top-12 right-0 text-white transition-colors duration-200 hover:text-gray-300"
				aria-label="Close lightbox"
			>
				<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
			<img
				src={blok.flyer.filename}
				alt={blok.title}
				class="max-h-[90vh] max-w-[90vw] object-contain"
				on:click|stopPropagation
			/>
		</div>
	</div>
{/if}
