<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { fly, fade } from 'svelte/transition';

	export let blok;

	// Generate a random UUID for the product
	const productId = uuidv4();

	// Card carousel state
	let currentImageIndex = 0;
	let previousIndex = 0;

	// Lightbox state
	let showLightbox = false;
	let imagesPreloaded = false;
	let lightboxImageIndex = 0;
	let lightboxPreviousIndex = 0;

	// Preload images for smoother transitions
	function preloadImages() {
		if (!imagesPreloaded && images.length > 0) {
			images.forEach((img) => {
				const image = new Image();
				image.src = img.filename;
			});
			imagesPreloaded = true;
		}
	}

	// Card carousel navigation
	function nextImage() {
		if (blok.images && blok.images.length > 0) {
			previousIndex = currentImageIndex;
			currentImageIndex = (currentImageIndex + 1) % blok.images.length;
		}
	}

	function previousImage() {
		if (blok.images && blok.images.length > 0) {
			previousIndex = currentImageIndex;
			currentImageIndex = (currentImageIndex - 1 + blok.images.length) % blok.images.length;
		}
	}

	function goToImage(index) {
		if (blok.images && blok.images.length > 0) {
			previousIndex = currentImageIndex;
			currentImageIndex = index;
		}
	}

	// Lightbox carousel navigation
	function nextLightboxImage() {
		if (blok.images && blok.images.length > 0) {
			lightboxPreviousIndex = lightboxImageIndex;
			lightboxImageIndex = (lightboxImageIndex + 1) % blok.images.length;
		}
	}

	function previousLightboxImage() {
		if (blok.images && blok.images.length > 0) {
			lightboxPreviousIndex = lightboxImageIndex;
			lightboxImageIndex = (lightboxImageIndex - 1 + blok.images.length) % blok.images.length;
		}
	}

	function goToLightboxImage(index) {
		if (blok.images && blok.images.length > 0) {
			lightboxPreviousIndex = lightboxImageIndex;
			lightboxImageIndex = index;
		}
	}

	function openLightbox() {
		lightboxImageIndex = currentImageIndex; // Start lightbox at current card image
		lightboxPreviousIndex = currentImageIndex;
		showLightbox = true;
		preloadImages(); // Preload images for smooth navigation
		document.body.style.overflow = 'hidden'; // Prevent background scrolling
	}

	function closeLightbox() {
		showLightbox = false;
		document.body.style.overflow = ''; // Restore scrolling
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			closeLightbox();
		} else if (event.key === 'ArrowRight') {
			nextLightboxImage();
		} else if (event.key === 'ArrowLeft') {
			previousLightboxImage();
		}
	}

	function handleBackgroundClick(event) {
		if (event.target === event.currentTarget) {
			closeLightbox();
		}
	}

	$: images = blok.images || [];
	$: currentImage = images[currentImageIndex]?.filename || '';
	// Calculate slide offset based on direction
	$: slideOffset = currentImageIndex > previousIndex ? 250 : -250;
	// Get the primary image for Snipcart (first image in array)
	$: primaryImage = images[0]?.filename || '';
</script>

<div class="flex h-full flex-col gap-4" use:storyblokEditable={blok}>
	<div class="group relative aspect-square w-full overflow-hidden">
		{#key currentImageIndex}
			<button
				type="button"
				on:click={openLightbox}
				class="h-full w-full cursor-pointer"
				in:fly|local={{ x: slideOffset, duration: 300 }}
				out:fly|local={{ x: -slideOffset, duration: 300 }}
			>
				<img src={currentImage} alt={blok.title} class="h-full w-full object-cover object-center" />
			</button>
		{/key}

		{#if images.length > 1}
			<!-- Previous button -->
			<button
				type="button"
				on:click={previousImage}
				class="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-black/70"
				aria-label="Previous image"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			<!-- Next button -->
			<button
				type="button"
				on:click={nextImage}
				class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-black/70"
				aria-label="Next image"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>

			<!-- Image indicators -->
			<div class="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
				{#each images as _, index}
					<button
						type="button"
						on:click={() => goToImage(index)}
						class="h-2 w-2 rounded-full transition-all duration-300 {index === currentImageIndex
							? 'w-6 bg-white'
							: 'bg-white/50'}"
						aria-label={`Go to image ${index + 1}`}
					></button>
				{/each}
			</div>
		{/if}
	</div>
	<div class="flex flex-grow flex-col gap-4">
		<div class="flex flex-col items-center justify-between gap-4">
			<p class="text-center font-header text-2xl font-medium text-primary-text uppercase">
				${blok.price}
			</p>
			<p class="text-center font-header text-xl text-primary-text uppercase">{blok.title}</p>
		</div>
		<p class="text-center text-lg text-secondary-text">{blok.description}</p>
	</div>
	<button
		class="snipcart-add-item mx-auto w-fit cursor-pointer rounded-xs bg-primary-color px-10 pt-4 pb-3 font-header text-xl leading-none text-primary-text-light uppercase transition-colors duration-300 hover:bg-bg-dark"
		data-item-id={productId}
		data-item-name={blok.title}
		data-item-price={blok.price}
		data-item-description={blok.description}
		data-item-image={primaryImage}
		data-item-weight={blok.productWeight}
		data-item-url="/"
		data-item-custom1-name="Size"
		data-item-custom1-options="Small | Medium | Large | XL | XXL | XXXL"
	>
		Add to bag
	</button>
</div>

<!-- Lightbox overlay -->
{#if showLightbox}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1010]/95 p-4"
		on:click={handleBackgroundClick}
		on:keydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-label="Product image lightbox"
		tabindex="-1"
		transition:fade={{ duration: 200 }}
	>
		<div class="relative max-h-full max-w-full">
			<!-- Close button -->
			<button
				type="button"
				on:click={closeLightbox}
				class="absolute -top-12 right-0 cursor-pointer text-white transition-colors duration-200 hover:text-gray-300"
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

			<!-- Lightbox image carousel -->
			<div class="group relative flex min-h-[85vh] w-[90vw] items-center justify-center">
				{#each images as image, index (image.filename)}
					{#if index === lightboxImageIndex}
						<div
							class="absolute inset-0 flex items-center justify-center"
							in:fade={{ duration: 250, delay: 100 }}
							out:fade={{ duration: 100 }}
							on:click|stopPropagation
							role="presentation"
						>
							<img
								src={image.filename}
								alt={blok.title}
								class="max-h-[85vh] max-w-[90vw] object-contain"
							/>
						</div>
					{/if}
				{/each}

				{#if images.length > 1}
					<!-- Previous button -->
					<button
						type="button"
						on:click={previousLightboxImage}
						class="absolute top-1/2 left-4 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-black/70"
						aria-label="Previous image"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-8 w-8"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>

					<!-- Next button -->
					<button
						type="button"
						on:click={nextLightboxImage}
						class="absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-black/70"
						aria-label="Next image"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-8 w-8"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>

					<!-- Image indicators -->
					<div class="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
						{#each images as _, index}
							<button
								type="button"
								on:click={() => goToLightboxImage(index)}
								class="h-2 w-2 rounded-full transition-all duration-300 {index ===
								lightboxImageIndex
									? 'w-6 bg-white'
									: 'bg-white/50'}"
								aria-label={`Go to image ${index + 1}`}
							></button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
