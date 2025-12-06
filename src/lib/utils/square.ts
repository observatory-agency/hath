// lib/utils/square.ts
// Square SDK v43+ API integration for inventory management
import { SquareClient, SquareEnvironment, type CatalogObject } from 'square';
import { SQUARE_ACCESS_TOKEN, SQUARE_LOCATION_ID } from '$env/static/private';

// Types for Square inventory data
export interface SquareVariation {
	id: string;
	name: string;
	price: number;
	sku: string | undefined;
	quantity: number;
}

export interface SquareProduct {
	id: string;
	name: string | undefined;
	description: string | undefined;
	variations: SquareVariation[];
}

export interface SquareInventoryMap {
	[key: string]: {
		variations: SquareVariation[];
		totalQuantity: number;
	};
}

/**
 * Creates a Square API client
 * Requires SQUARE_ACCESS_TOKEN environment variable
 */
function getClient(): SquareClient {
	if (!SQUARE_ACCESS_TOKEN) {
		throw new Error('SQUARE_ACCESS_TOKEN environment variable is not set');
	}

	return new SquareClient({
		token: SQUARE_ACCESS_TOKEN,
		environment: SquareEnvironment.Production
	});
}

/**
 * Extracts variation data from a CatalogObject that's an ITEM_VARIATION
 */
function extractVariationData(obj: CatalogObject): SquareVariation | null {
	if (obj.type !== 'ITEM_VARIATION') return null;

	// When type is ITEM_VARIATION, the object has itemVariationData
	const variationObj = obj as CatalogObject.ItemVariation;
	const variationData = variationObj.itemVariationData;
	if (!variationData) return null;

	return {
		id: obj.id ?? '',
		name: variationData.name ?? '',
		price: Number(variationData.priceMoney?.amount ?? 0n) / 100,
		sku: variationData.sku ?? undefined,
		quantity: 0 // Will be populated from inventory
	};
}

/**
 * Fetches all products with their inventory counts from Square
 * Combines Catalog API and Inventory API to get complete product data
 */
export async function getProductsWithInventory(): Promise<SquareProduct[]> {
	const client = getClient();

	if (!SQUARE_LOCATION_ID) {
		throw new Error('SQUARE_LOCATION_ID environment variable is not set');
	}

	// 1. Get all ITEM type objects from Catalog API
	const catalogItems: SquareProduct[] = [];
	const variationIds: string[] = [];

	// Use pagination to get all items
	for await (const item of await client.catalog.list({ types: 'ITEM' })) {
		if (item.type === 'ITEM' && item.itemData) {
			const variations: SquareVariation[] = [];

			// Process each variation in the item
			if (item.itemData.variations) {
				for (const variationObj of item.itemData.variations) {
					const variation = extractVariationData(variationObj);
					if (variation && variation.id) {
						variations.push(variation);
						variationIds.push(variation.id);
					}
				}
			}

			catalogItems.push({
				id: item.id,
				name: item.itemData.name ?? undefined,
				description: item.itemData.description ?? undefined,
				variations
			});
		}
	}

	if (variationIds.length === 0) {
		return catalogItems;
	}

	// 2. Batch fetch inventory counts from Inventory API
	const inventoryMap = new Map<string, number>();

	// Use pagination to get all inventory counts
	for await (const count of await client.inventory.batchGetCounts({
		catalogObjectIds: variationIds,
		locationIds: [SQUARE_LOCATION_ID]
	})) {
		if (count.catalogObjectId && count.state === 'IN_STOCK') {
			const qty = parseInt(count.quantity ?? '0', 10);
			// Sum quantities if multiple counts for same item (shouldn't happen, but be safe)
			inventoryMap.set(count.catalogObjectId, (inventoryMap.get(count.catalogObjectId) ?? 0) + qty);
		}
	}

	// 3. Merge inventory counts into catalog items
	for (const product of catalogItems) {
		for (const variation of product.variations) {
			variation.quantity = inventoryMap.get(variation.id) ?? 0;
		}
	}

	return catalogItems;
}

/**
 * Creates a lookup map by SKU for easy matching with Storyblok products
 * Use this when Storyblok products have a SKU field that matches Square
 */
export async function getInventoryBySku(): Promise<SquareInventoryMap> {
	const products = await getProductsWithInventory();
	const skuMap: SquareInventoryMap = {};

	for (const product of products) {
		for (const variation of product.variations) {
			if (variation.sku) {
				// Group by base SKU (e.g., "TSHIRT-001" from "TSHIRT-001-S")
				const baseSku = variation.sku.split('-').slice(0, -1).join('-') || variation.sku;

				if (!skuMap[baseSku]) {
					skuMap[baseSku] = { variations: [], totalQuantity: 0 };
				}
				skuMap[baseSku].variations.push(variation);
				skuMap[baseSku].totalQuantity += variation.quantity;
			}
		}
	}

	return skuMap;
}

/**
 * Creates a lookup map by product name for matching with Storyblok
 * Useful when you don't have SKUs but product names match between systems
 */
export async function getInventoryByName(): Promise<SquareInventoryMap> {
	const products = await getProductsWithInventory();
	const nameMap: SquareInventoryMap = {};

	for (const product of products) {
		if (product.name) {
			const normalizedName = product.name.toLowerCase().trim();
			nameMap[normalizedName] = {
				variations: product.variations,
				totalQuantity: product.variations.reduce((sum, v) => sum + v.quantity, 0)
			};
		}
	}

	return nameMap;
}

/**
 * Formats Square variations for Snipcart's custom field options
 * Returns format: "Size1|Size2|Size3"
 * Only includes sizes that are in stock
 */
export function formatSnipcartOptions(variations: SquareVariation[]): string {
	return variations
		.filter((v) => v.quantity > 0)
		.map((v) => v.name)
		.join('|');
}

/**
 * Formats Square variations for Snipcart with stock info
 * Returns all options (in stock or not) plus a stock map
 */
export function formatSnipcartOptionsWithStock(variations: SquareVariation[]): {
	options: string;
	stockMap: { [size: string]: number };
} {
	const stockMap: { [size: string]: number } = {};

	for (const v of variations) {
		stockMap[v.name] = v.quantity;
	}

	// Only return in-stock options for Snipcart dropdown
	const options = variations
		.filter((v) => v.quantity > 0)
		.map((v) => v.name)
		.join('|');

	return { options, stockMap };
}
