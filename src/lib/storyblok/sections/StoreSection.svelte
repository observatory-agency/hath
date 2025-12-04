<script>
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import WillowtipLogo from '$lib/assets/willowtip.png';
	import MassacreLogo from '$lib/assets/massacre.png';

	let { blok } = $props();
</script>

<section id="store" class="py-24 lg:py-40" use:storyblokEditable={blok}>
	<div class="container mx-auto px-4 lg:px-0">
		{#each blok.intro as blok}
			<StoryblokComponent {blok} />
		{/each}
		{#each blok.products as blok}
			<StoryblokComponent {blok} />
		{/each}
		<div class="mt-16 flex flex-col items-center justify-center gap-4 lg:mt-32">
			<p class="text-center text-2xl text-balance text-primary-text sm:text-left">
				Looking for more designs? Check out
			</p>
			<div class="mt-6 flex flex-col items-center gap-16 px-12 lg:flex-row lg:px-0">
				<a
					href="https://massacremerch.com/collections/hath"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={MassacreLogo} alt="Massacre" />
				</a>
				<a
					href="https://www.willowtip.com/bands/details/hath.aspx"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={WillowtipLogo} alt="Willowtip" />
				</a>
			</div>
		</div>
	</div>
	{#each blok.promo_banner as blok}
		<StoryblokComponent {blok} />
	{/each}
</section>

<style>
	#store {
		background: hsl(30deg 20% 96.08% / 0.4) url('/img/bg/store-bg.avif');
		background-blend-mode: hard-light;
		background-size: cover, cover;
		background-position: center, center;
		background-repeat: no-repeat, no-repeat;
	}
</style>
