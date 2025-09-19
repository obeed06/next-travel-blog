import { sanityClient } from './sanity'
import { getRelatedPostsForTrip } from "./postApi";

export async function getTrip(slug) {
  return sanityClient
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
                            "url": "/" + @.reference->_type + "s/" + @.reference->slug.current
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
                    'slug': slug.current,
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
      { slug });
}

export async function getTripAndRelatedPosts(slug) {
  return Promise.all([getTrip(slug), getRelatedPostsForTrip(slug)]);
}

export async function getTrips() {
  return sanityClient
    .fetch(`*[_type == "trip"] | order(tripDate desc) {
            name,
            tagline,
            'slug': slug.current,
            thumbnail{
                asset->{
                    _id,
                    url
                },
                alt
            }
        }`);
}