// Inventory store - fetches Square inventory once and shares across all ProductCards
import { writable } from 'svelte/store';

function createInventoryStore() {
    const { subscribe, set, update } = writable({
        loaded: false,
        loading: false,
        error: null,
        /** @type {Record<string, { options: string, stockMap: Record<string, number>, totalQuantity: number, price: number }>} */
        products: {}
    });

    let fetchPromise = null;

    return {
        subscribe,

        /**
         * Fetch all inventory from Square (called once at page level)
         * Returns a promise that resolves when data is loaded
         */
        async fetch() {
            // If already loaded or loading, return existing promise
            if (fetchPromise) return fetchPromise;

            update((state) => ({ ...state, loading: true }));

            fetchPromise = (async () => {
                try {
                    const response = await fetch('/api/inventory');
                    if (!response.ok) {
                        throw new Error(`Failed to fetch inventory: ${response.status}`);
                    }

                    const data = await response.json();

                    // Transform array into lookup by normalized product name
                    /** @type {Record<string, { options: string, stockMap: Record<string, number>, totalQuantity: number, price: number }>} */
                    const products = {};

                    if (data.inventory) {
                        for (const product of data.inventory) {
                            if (product.name) {
                                const key = product.name.toLowerCase().trim();
                                products[key] = {
                                    options: product.options,
                                    stockMap: product.stockMap,
                                    totalQuantity: product.totalQuantity,
                                    price: product.price ?? 0
                                };
                            }
                        }
                    }

                    set({
                        loaded: true,
                        loading: false,
                        error: null,
                        products
                    });
                } catch (error) {
                    console.error('[inventory store] Failed to fetch:', error);
                    set({
                        loaded: true,
                        loading: false,
                        error: error.message,
                        products: {}
                    });
                }
            })();

            return fetchPromise;
        },

        /**
         * Get inventory for a specific product by name
         * @param {Record<string, { options: string, stockMap: Record<string, number>, totalQuantity: number, price: number }>} products
         * @param {string} productName
         */
        getProduct(products, productName) {
            if (!productName) return null;
            const key = productName.toLowerCase().trim();
            return products[key] || null;
        },

        /**
         * Initialize store with server-side data (for SSR)
         * @param {{ loaded: boolean, loading: boolean, error: string | null, products: Record<string, { options: string, stockMap: Record<string, number>, totalQuantity: number, price: number }> }} data
         */
        init(data) {
            if (data && data.loaded) {
                set(data);
                // Mark as already fetched so we don't re-fetch
                fetchPromise = Promise.resolve();
            }
        },

        /**
         * Reset store (useful for testing or manual refresh)
         */
        reset() {
            fetchPromise = null;
            set({
                loaded: false,
                loading: false,
                error: null,
                products: {}
            });
        }
    };
}

export const inventory = createInventoryStore();
