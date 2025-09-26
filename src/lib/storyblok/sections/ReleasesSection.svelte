<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let { blok } = $props();

	let sectionElement;
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

				// Create ScrollTrigger that pins the section and drives the horizontal scroll
				ScrollTrigger.create({
					trigger: sectionElement,
					start: 'top+=200px top',
					end: () => `+=${scrollDistance * 3}`, // Make scroll feel more natural
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
	<div class="h-full">
		<div class="mx-auto flex max-w-3xl flex-col gap-8 px-4 text-center lg:px-0">
			<h1 class="text-3xl font-semibold text-balance text-primary-text-light uppercase lg:text-6xl">
				{blok.header}
			</h1>
			<div class="prose text-balance prose-p:text-lg prose-p:text-secondary-text-light">
				{@html renderRichText(blok.copy)}
			</div>
		</div>

		<!-- Releases Container - responsive layout -->
		<div class="releases-container my-24" bind:this={horizontalContainer}>
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

	.releases-container {
		width: 100%;
	}

	/* Desktop horizontal scroll layout */
	.releases-container:has(.desktop-horizontal) {
		height: 75vh;
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	.releases-grid.desktop-horizontal {
		display: flex;
		gap: 8rem;
		height: 100%;
		align-items: center;
		will-change: transform;
	}

	.release-item.desktop-item {
		flex: 0 0 800px;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1rem;
	}

	/* Mobile/tablet grid layout */
	.releases-container:has(.mobile-grid) {
		max-width: 1200px;
		margin: 3rem auto 0;
		padding: 0 1rem;
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
