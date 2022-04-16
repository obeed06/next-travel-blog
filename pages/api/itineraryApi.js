import {getClient} from './client'

export async function getHomeItinerary(preview) {
    return getClient(preview)
        .fetch(`*[_type == 'itinerary' && name == 'all'][0]{
            iframeLink,
            placeholder{
                asset->{
                    _id,
                    url
                },
                alt
            }
        }`)
}