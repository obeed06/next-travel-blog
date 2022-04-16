import {getClient} from './client'
import {getRelatedPostsForTrip} from "./postApi";

export async function getTrip(slug, preview) {
    return getClient(preview)
        .fetch(`*[_type == "trip" && slug.current == $slug][0]{
                name,
                summary,
                breakdown[]{
                    ...,
                    markDefs[]{
                        ...,
                        _type == "internalLink" => {
                            _key,
                            "slug": @.reference->slug,
                            "type": @.reference->_type,
                            "url": "/" + @.reference->_type + "/" + @.reference->slug.current
                        }
                    }
                },
                hero{
                    asset->{
                        _id,
                        url
                    },
                    alt
                },
                thumbnail{
                    asset->{
                        _id,
                        url
                    },
                    alt
                },
                itinerary->{
                    iframeLink,
                    placeholder{
                        asset->{
                            _id,
                            url
                        },
                        alt
                    }
                },
                destinations[]->{
                    name,
                    slug,
                    icon{
                        asset->{
                            _id,
                            url
                        },
                    alt
                    },
                    bgImage{
                        asset->{
                            _id,
                            url
                        },
                    alt
                    }
                }
             }`,
            {slug});
}

export async function getTripAndRelatedPosts(slug, preview) {
    return Promise.all([getTrip(slug, preview), getRelatedPostsForTrip(slug, preview)]);
}

export async function getTrips(preview) {
    return getClient(preview)
        .fetch(`*[_type == "trip"] | order(tripDate desc) {
            name,
            tagline,
            slug,
            thumbnail{
                asset->{
                    _id,
                    url
                },
                alt
            }
        }`);
}