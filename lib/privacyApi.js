import { sanityClient } from "./sanity";

export async function getPrivacyNotice() {
    return await sanityClient
        .fetch(`*[_type == "privacy"][0]{
                title,
                content
            }`);
}