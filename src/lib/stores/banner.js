import { writable } from 'svelte/store';

// Store to track if banner is present
export const hasBanner = writable(false);
