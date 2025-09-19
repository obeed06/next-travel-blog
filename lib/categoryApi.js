import { sanityClient } from "./sanity";

//&& count(*[_type == "post" && ^._id in categories[]->_id]) > 0 -- if creating more categories that dont have posts yet
export async function getCategories() {
    return await sanityClient
        .fetch(`*[_type == "category"] | order(title asc) {
                title,
                description,
                'colourHex':colour.hex
            }       
`);
}