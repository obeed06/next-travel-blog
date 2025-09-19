import { sanityClient } from "./sanity";

export async function getHomeItinerary() {
    return await sanityClient
        .fetch(`*[_type == 'itinerary' && name == 'all'][0]{
        iframeLink,
        placeholder
    }`);
}