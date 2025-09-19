<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import { v4 as uuidv4 } from 'uuid';

	export let blok;

	// Generate a random UUID for the product
	const productId = uuidv4();
</script>

<div class="flex flex-col gap-4">
	<img src={blok.image.filename} alt={blok.title} />
	<div class="flex flex-col gap-4">
		<div class="flex justify-between items-center">
			<p class="text-xl uppercase font-header text-primary-text">{blok.title}</p>
			<p class="text-xl uppercase font-header text-primary-text">${blok.price}</p>
		</div>
		<p class="text-lg text-center text-secondary-text">{blok.description}</p>
	</div>
	<button
		class="px-10 py-4 mx-auto text-2xl leading-none uppercase transition-colors duration-300 cursor-pointer snipcart-add-item w-fit rounded-xs bg-primary-color font-header text-primary-text-light hover:bg-bg-dark"
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
