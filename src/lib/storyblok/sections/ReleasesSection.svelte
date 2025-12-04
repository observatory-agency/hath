<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let { blok } = $props();

	let sectionElement;
	let releasesWrapper;
	let horizontalContainer;
	let releasesGrid;
	let isDesktop = $state(false);

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Check if we're on desktop (1024px and above)
		const checkIsDesktop = () => {
			isDesktop = window.innerWidth >= 1024;
		};

		const createScrollAnimation = () => {
			// Only create horizontal scroll animation on desktop
			if (!isDesktop) return;

			// Get the width of the releases grid
			const gridWidth = releasesGrid.scrollWidth;
			const containerWidth = horizontalContainer.offsetWidth;
			const scrollDistance = Math.max(0, gridWidth - containerWidth);

			// Only create animation if there's content to scroll
			if (scrollDistance > 0) {
				// Create the horizontal scroll animation
				const horizontalTween = gsap.to(releasesGrid, {
					x: -scrollDistance,
					ease: 'none'
				});

				// Pin the releases wrapper (not the whole section) so the MUSIC intro scrolls away first
				ScrollTrigger.create({
					trigger: releasesWrapper,
					start: 'top top',
					end: () => `+=${scrollDistance * 3}`,
					pin: true,
					scrub: 1,
					animation: horizontalTween,
					invalidateOnRefresh: true,
					anticipatePin: 1
				});
			}
		};

		// Initial check
		checkIsDesktop();

		// Wait for layout to settle before creating animation
		setTimeout(createScrollAnimation, 100);

		// Refresh ScrollTrigger on window resize and recheck desktop
		const handleResize = () => {
			const wasDesktop = isDesktop;
			checkIsDesktop();

			// If we switched between desktop/mobile, kill all triggers and recreate
			if (wasDesktop !== isDesktop) {
				ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
				setTimeout(createScrollAnimation, 100);
			} else {
				ScrollTrigger.refresh();
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<section
	id="releases"
	class="py-16 lg:py-24"
	bind:this={sectionElement}
	use:storyblokEditable={blok}
>
	<div class="container mx-auto px-4 lg:px-0">
		{#each blok.intro as blok}
			<StoryblokComponent {blok} />
		{/each}
	</div>

	<div class="releases-wrapper" bind:this={releasesWrapper}>
		<!-- Releases Container - responsive layout -->
		<div class="releases-container" bind:this={horizontalContainer}>
			<div
				class="releases-grid"
				class:desktop-horizontal={isDesktop}
				class:mobile-grid={!isDesktop}
				bind:this={releasesGrid}
			>
				{#each blok.release as releaseBlok}
					<div class="release-item" class:desktop-item={isDesktop} class:mobile-item={!isDesktop}>
						<StoryblokComponent blok={releaseBlok} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	#releases {
		background: hsl(30deg 20% 96.08% / 0.4) url('/img/bg/releases-bg.avif');
		background-blend-mode: hard-light;
		background-size: cover, cover;
		background-position: center, center;
		background-repeat: no-repeat, no-repeat;
	}

	/* Only fix background on desktop where scrolljack is active */
	@media (min-width: 1024px) {
		#releases {
			background-attachment: fixed, fixed;
		}
	}

	.releases-wrapper {
		height: 100vh;
		display: flex;
		align-items: center;
		overflow: hidden;
		padding: 3rem 0;
	}

	.releases-container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}

	/* Desktop horizontal scroll layout */
	.releases-container:has(.desktop-horizontal) {
		overflow: hidden;
	}

	.releases-grid.desktop-horizontal {
		display: flex;
		gap: clamp(4rem, 10vw, 12rem);
		align-items: center;
		will-change: transform;
		height: 100%;
		padding-right: clamp(4rem, 10vw, 12rem);
	}

	.release-item.desktop-item {
		/* Card width scales with viewport height (album art is square) */
		/* Leave 280px for title/button + padding, card width = image height */
		flex: 0 0 calc(100vh - 280px);
		max-width: 800px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 1rem;
	}

	/* Album cover - square, scales with viewport */
	.release-item.desktop-item :global(img) {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		object-position: center;
	}

	/* Mobile/tablet grid layout */
	.releases-container:has(.mobile-grid) {
		max-width: 1200px;
		margin: 3rem auto 0;
		padding: 0 1rem;
		height: auto;
	}

	.releases-wrapper:has(.mobile-grid) {
		height: auto;
		min-height: auto;
		overflow: visible;
	}

	.releases-grid.mobile-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 3rem;
		align-items: start;
	}

	.release-item.mobile-item {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0;
	}

	.release-item.mobile-item :global(img) {
		max-height: none;
		max-width: 100%;
		width: 100%;
	}

	/* Mobile responsive adjustments */
	@media (max-width: 640px) {
		.releases-grid.mobile-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.releases-container:has(.mobile-grid) {
			padding: 0 1rem;
		}
	}
</style>
