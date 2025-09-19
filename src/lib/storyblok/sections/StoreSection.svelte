<script>
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import WillowtipLogo from '$lib/assets/willowtip.png';
	import MassacreLogo from '$lib/assets/massacre.png';

	let { blok } = $props();
</script>

<section id="store" class="py-40" {...storyblokEditable(blok)}>
	<div class="container mx-auto">
		{#each blok.intro as blok}
			<StoryblokComponent {blok} />
		{/each}
		{#each blok.products as blok}
			<StoryblokComponent {blok} />
		{/each}
		<div class="mt-18 flex flex-col items-center justify-center gap-4">
			<p class="text-2xl text-primary-text">Looking for more designs? Check out</p>
			<div class="flex items-center gap-16">
				<a
					href="https://www.willowtip.com/bands/details/hath.aspx"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={WillowtipLogo} alt="Willowtip" />
				</a>
				<a
					href="https://massacremerch.com/collections/hath"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={MassacreLogo} alt="Massacre" />
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
		background: hsl(30deg 20% 96.08% / 0.4) url('store-bg.avif');
		background-blend-mode: hard-light;
		background-size: cover, cover;
		background-position: center, center;
		background-repeat: no-repeat, no-repeat;
	}
</style>
