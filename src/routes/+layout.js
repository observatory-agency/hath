import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';

import Banner from '$lib/storyblok/Banner.svelte';
import Page from '$lib/storyblok/Page.svelte';
import ProductCard from '$lib/storyblok/ProductCard.svelte';
import CardGrid from '$lib/storyblok/CardGrid.svelte';
import SectionTitle from '$lib/storyblok/SectionTitle.svelte';
import PromoBanner from '$lib/storyblok/PromoBanner.svelte';
import ContactSection from '$lib/storyblok/sections/ContactSection.svelte';
import StoreSection from '$lib/storyblok/sections/StoreSection.svelte';
import ShowsSection from '$lib/storyblok/sections/ShowsSection.svelte';
import ReleasesSection from '$lib/storyblok/sections/ReleasesSection.svelte';
import Show from '$lib/storyblok/shows/Show.svelte';
import Shows from '$lib/storyblok/shows/Shows.svelte';
import Release from '$lib/storyblok/Release.svelte';

export async function load() {
    storyblokInit({
        accessToken: import.meta.env.VITE_STORYBLOK_DELIVERY_API_TOKEN,
        apiOptions: {
            region: 'eu'
        },
        use: [apiPlugin],
        components: {
            page: Page,
            banner: Banner,
            product_card: ProductCard,
            card_grid: CardGrid,
            section_title: SectionTitle,
            promo_banner: PromoBanner,
            contact_section: ContactSection,
            store_section: StoreSection,
            shows_section: ShowsSection,
            show: Show,
            shows: Shows,
            release: Release,
            releases_section: ReleasesSection,
        }
    });

    const storyblokAPI = await useStoryblokApi();

    return {
        storyblokAPI
    };
}
