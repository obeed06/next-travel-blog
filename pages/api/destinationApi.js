import {getClient} from './client'
import {getRelatedPostsForDestination} from "./postApi";

export async function getDestination(slug, preview) {
    return getClient(preview)
        .fetch(`*[_type == "destination" && slug.current == $slug][0]{
                name,
                summary,
                continent->{name,slug},
                regions[]->{name,slug},
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
                "countries": *[^.isRegion == true && _type == "destination" && isCountry == true &&
                    ^._id in regions[]->_id] | order(name asc) {
                        name,
                        slug
                },     
                "trips": *[^.isCountry == true && _type == "trip" &&
                    ^._id in destinations[]->_id] | order(name asc) {
                        name,
                        slug
                },       
             }`,
            {slug});
}

export async function getDestinationAndRelatedPosts(slug, preview) {
    return Promise.all([getDestination(slug, preview), getRelatedPostsForDestination(slug, preview)]);
}

export async function getDestinations(preview) {
    return getClient(preview)
        .fetch(`*[_type == "destination"] | order(name asc) {
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
             }`);
}

export async function getCountryDestinations(preview) {
    return getClient(preview)
        .fetch(`*[_type == "destination" && isCountry == true] | order(name asc) {
            name,
            slug,
            'continent': continent->{name, slug},
            regions[]->{name,slug},
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
        .fetch(`*[_type == "destination" && isContinent == true && 
            count(*[_type == "destination" && isCountry == true && continent._ref == ^._id]) > 0] | order(name asc) {
                name,
                slug,
                "regions": *[_type == "destination" && isRegion == true && continent._ref == ^._id &&
                    count(*[_type == "destination" && isCountry == true && ^._id in regions[]->_id]) > 0] | order(name asc) {
                        name,
                        slug
                    }
            }       
`);
}