<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import { v4 as uuidv4 } from 'uuid';

	export let blok;

	// Generate a random UUID for the product
	const productId = uuidv4();
</script>

<div class="flex flex-col gap-4" use:storyblokEditable={blok}>
	<img src={blok.image.filename} alt={blok.title} />
	<div class="flex flex-col gap-4">
		<div class="flex items-center justify-between">
			<p class="font-header text-xl text-primary-text uppercase">{blok.title}</p>
			<p class="font-header text-xl text-primary-text uppercase">${blok.price}</p>
		</div>
		<p class="text-center text-lg text-secondary-text">{blok.description}</p>
	</div>
	<button
		class="snipcart-add-item mx-auto w-fit cursor-pointer rounded-xs bg-primary-color px-10 py-4 font-header text-2xl leading-none text-primary-text-light uppercase transition-colors duration-300 hover:bg-bg-dark"
		data-item-id={productId}
		data-item-name={blok.title}
		data-item-price={blok.price}
		data-item-description={blok.description}
		data-item-image={blok.image.filename}
		data-item-weight={blok.productWeight}
		data-item-url="/"
		data-item-custom1-name="Size"
		data-item-custom1-options="Small | Medium | Large | XL | XXL | XXXL"
	>
		Add to bag
	</button>
</div>
