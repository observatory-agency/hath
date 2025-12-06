// Server-side API endpoint to fetch Square inventory
// This runs on Netlify Functions, keeping your API keys secure

import { json, type RequestHandler } from '@sveltejs/kit';
import {
	getProductsWithInventory,
	getInventoryByName,
	formatSnipcartOptionsWithStock
} from '$lib/utils/square';

export const GET: RequestHandler = async ({ url }) => {
	try {
		// Optional: filter by product name
		const productName = url.searchParams.get('product');

		if (productName) {
			// Return inventory for a specific product
			const inventoryByName = await getInventoryByName();
			const normalizedName = productName.toLowerCase().trim();
			const productData = inventoryByName[normalizedName];

			if (!productData) {
				return json({ error: 'Product not found' }, { status: 404 });
			}

			const { options, stockMap } = formatSnipcartOptionsWithStock(productData.variations);

			return json(
				{
					product: productName,
					options,
					stockMap,
					totalQuantity: productData.totalQuantity,
					variations: productData.variations
				},
				{
					headers: {
						'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
					}
				}
			);
		}

		// Return all products with inventory
		const products = await getProductsWithInventory();

		// Transform to a more frontend-friendly format
		const inventory = products.map((product) => {
			const { options, stockMap } = formatSnipcartOptionsWithStock(product.variations);
			// Get base price from first variation (they usually share the same price)
			const basePrice = product.variations[0]?.price ?? 0;
			return {
				id: product.id,
				name: product.name,
				price: basePrice,
				options,
				stockMap,
				totalQuantity: product.variations.reduce((sum, v) => sum + v.quantity, 0),
				variations: product.variations
			};
		});

		return json(
			{ inventory },
			{
				headers: {
					// Cache for 5 minutes at CDN, serve stale while revalidating for up to 10 min
					'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
				}
			}
		);
	} catch (error) {
		console.error('Error fetching Square inventory:', error);
		return json(
			{
				error: 'Failed to fetch inventory',
				message: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};
