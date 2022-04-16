import {getClient} from './client'

export async function getAuthorDetails(preview) {
    return getClient(preview)
        .fetch(`*[_type == "author"][0]{
                name,
                bio,
                "destinationCount": count(*[_type == "destination" && isCountry == true]),
                "postCount": count(*[_type == "post"]),
                "earliestTrip": *[_type == "trip"]| order(tripDate asc)[0] {tripDate}
            }`);
}