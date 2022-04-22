import {getClient} from './sanity'

export async function getPrivacyNotice(preview) {
    return getClient(preview)
        .fetch(`*[_type == "privacy"][0]{
                title,
                content
            }`);
}