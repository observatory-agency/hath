/** @type {import('./$types').PageLoad} */
export async function load({ params, parent, data }) {

    const { storyblokAPI } = await parent();

    const response = await storyblokAPI.get("cdn/stories/home", {
        version: 'draft',
    });

    return {
        ...data, // Include server data (inventory from +page.server.js)
        story: response.data.story,
    };
}
