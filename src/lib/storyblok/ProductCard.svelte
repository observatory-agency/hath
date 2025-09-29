<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import { v4 as uuidv4 } from 'uuid';

	export let blok;

	// Generate a random UUID for the product
	const productId = uuidv4();
</script>

<div class="flex h-full flex-col gap-4" use:storyblokEditable={blok}>
	<div class="aspect-square w-full overflow-hidden">
		<img
			src={blok.image.filename}
			alt={blok.title}
			class="h-full w-full object-cover object-center"
		/>
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
		data-item-image={blok.image.filename}
		data-item-weight={blok.productWeight}
		data-item-url="/"
		data-item-custom1-name="Size"
		data-item-custom1-options="Small | Medium | Large | XL | XXL | XXXL"
	>
		Add to bag
	</button>
</div>
