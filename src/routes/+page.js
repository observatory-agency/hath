/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {

    const { storyblokAPI } = await parent();

    const response = await storyblokAPI.get("cdn/stories/home", {
        version: 'draft',
    });

    return {
        story: response.data.story,
    };
}
