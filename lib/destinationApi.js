import {getClient} from './sanity'
import {getRelatedPostsForDestination} from "./postApi";

export async function getDestination(slug, preview) {
    return getClient(preview)
        .fetch(`*[_type == "destination" && slug.current == $slug][0]{
                name,
                summary,
                relatedDestinations[] | order('continent' in ^.regionTypes) | order('regions' in ^.regionTypes) -> {
                    name,
                    regionTypes,
                    'slug': slug.current
                },
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
                },
                "regions": *['continent' in ^.regionTypes && _type == 'destination' && 'region' in regionTypes &&
                    ^._id in relatedDestinations[]->_id] | order(name asc) {
                        name,
                        'slug': slug.current
                },     
                "countries": *[('region' in ^.regionTypes || 'continent' in ^.regionTypes) && _type == 'destination' && 'country' in regionTypes &&
                    ^._id in relatedDestinations[]->_id] | order(name asc) {
                        name,
                        'slug': slug.current
                },     
                "areas": *['country' in ^.regionTypes && _type == 'destination' && 'area' in regionTypes &&
                    ^._id in relatedDestinations[]->_id] | order(name asc) {
                        name,
                        'slug': slug.current
                },     
                "trips": *['country' in ^.regionTypes && _type == "trip" &&
                    ^._id in destinations[]->_id] | order(name asc) {
                        name, 
                        'slug': slug.current
                },       
             }`,
            {slug}).catch(reason => console.error(reason));
}

export async function getDestinationAndRelatedPosts(slug, preview) {
    return Promise.all([getDestination(slug, preview), getRelatedPostsForDestination(slug, preview)]);
}

export async function getDestinations(preview) {
    return getClient(preview)
        .fetch(`*[_type == "destination"] | order(name asc) {
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
             }`);
}

export async function getCountryDestinations(preview) {
    return getClient(preview)
        .fetch(`*[_type == "destination" && 'country' in regionTypes] | order(name asc) {
            name,
            'slug': slug.current,
            relatedDestinations[]->{
                name
            },
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
            },
        }        
`);
}

export async function getContinentsAndRegions(preview) {
    return getClient(preview)
        .fetch(`*[_type == "destination" && 'continent' in regionTypes && 
        count(*[_type == "destination" && 'country' in regionTypes && ^._id in relatedDestinations[]->_id]) > 0] | order(name asc) {
                name,
                'slug': slug.current,
                "regions": *[_type == "destination" && 'region' in regionTypes && ^._id in relatedDestinations[]->_id && 
                    count(*[_type == "destination" && 'country' in regionTypes && ^._id in relatedDestinations[]->_id]) > 0] | order(name asc) {
                        name,
                        'slug': slug.current
                    }
            }       
`);
}