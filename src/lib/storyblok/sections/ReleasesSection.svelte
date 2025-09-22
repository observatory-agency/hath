<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let { blok } = $props();

	let sectionElement;
	let horizontalContainer;
	let releasesGrid;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const createScrollAnimation = () => {
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

		// Wait for layout to settle before creating animation
		setTimeout(createScrollAnimation, 100);

		// Refresh ScrollTrigger on window resize
		const handleResize = () => {
			ScrollTrigger.refresh();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<section id="releases" class="py-24" bind:this={sectionElement} use:storyblokEditable={blok}>
	<div class="h-full">
		<div class="mx-auto flex max-w-3xl flex-col gap-8 pt-16 pb-16 text-center">
			<h1 class="text-6xl font-semibold text-balance text-primary-text-light uppercase">
				{blok.header}
			</h1>
			<div class="prose text-balance prose-p:text-lg prose-p:text-secondary-text-light">
				{@html renderRichText(blok.copy)}
			</div>
		</div>

		<!-- Horizontal Scroll Container -->
		<div class="horizontal-scroll-container mb-24" bind:this={horizontalContainer}>
			<div class="releases-grid" bind:this={releasesGrid}>
				{#each blok.release as releaseBlok}
					<div class="release-item">
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

	.horizontal-scroll-container {
		height: 75vh;
		width: 100%;
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	.releases-grid {
		display: flex;
		gap: 8rem;
		height: 100%;
		align-items: center;
		will-change: transform;
	}

	.release-item {
		flex: 0 0 800px;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1rem;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.release-item {
			flex: 0 0 320px;
		}

		.horizontal-scroll-container {
			height: 50vh;
		}
	}

	@media (max-width: 480px) {
		.release-item {
			flex: 0 0 280px;
		}

		.horizontal-scroll-container {
			height: 45vh;
		}
	}
</style>
