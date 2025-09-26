<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import SubscribeForm from '$lib/components/SubscribeForm.svelte';

	export let blok;
</script>

<div
	class="promo-banner container mx-auto mt-32 lg:rounded-xl"
	use:storyblokEditable={blok}
	style="background-image: url({blok.image.filename});"
>
	<div class="px-6 py-24 sm:py-48 lg:px-8">
		<div class="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
			<h2
				class="text-4xl font-semibold tracking-tight text-balance text-primary-text-light sm:text-5xl"
			>
				{blok.title}
			</h2>
			<p class="mx-auto mt-2 max-w-xl text-lg/8 text-pretty text-secondary-text-light">
				{blok.description}
			</p>
			<SubscribeForm />
		</div>
	</div>
</div>

<style>
	.promo-banner {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
