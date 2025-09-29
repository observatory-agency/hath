import { writable } from 'svelte/store';

// Store to track if banner is present
export const hasBanner = writable(false);

// Store to track if mobile menu is open
export const isMobileMenuOpen = writable(false);
