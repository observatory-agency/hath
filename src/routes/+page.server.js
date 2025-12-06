// Server-side load for inventory data
// This ensures Square prices are in the initial HTML for Snipcart crawler

import {
    getProductsWithInventory,
    formatSnipcartOptionsWithStock
} from '$lib/utils/square';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        const products = await getProductsWithInventory();

        // Transform to the same format as the API endpoint
        /** @type {Record<string, { options: string, stockMap: Record<string, number>, totalQuantity: number, price: number }>} */
        const inventory = {};

        for (const product of products) {
            if (product.name) {
                const { options, stockMap } = formatSnipcartOptionsWithStock(product.variations);
                const key = product.name.toLowerCase().trim();
                inventory[key] = {
                    options,
                    stockMap,
                    totalQuantity: product.variations.reduce((sum, v) => sum + v.quantity, 0),
                    price: product.variations[0]?.price ?? 0
                };
            }
        }

        return {
            inventory: {
                loaded: true,
                loading: false,
                error: null,
                products: inventory
            }
        };
    } catch (error) {
        console.error('Failed to load inventory:', error);
        return {
            inventory: {
                loaded: true,
                loading: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                products: {}
            }
        };
    }
}
