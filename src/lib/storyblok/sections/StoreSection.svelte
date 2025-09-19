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
		<div class="flex flex-col gap-4 justify-center items-center mt-18">
			<p class="text-2xl text-primary-text">Looking for more designs? Check out</p>
			<div class="flex gap-16 items-center">
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
		background: hsl(30deg 20% 96.08% / 0.4) url('/img/bg/store-bg.avif');
		background-blend-mode: hard-light;
		background-size: cover, cover;
		background-position: center, center;
		background-repeat: no-repeat, no-repeat;
	}
</style>
