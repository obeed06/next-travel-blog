import {getClient} from './sanity'

const postFields = `
  _id,
  title,
  publishedAt,
  destinations[]->{name,'slug': slug.current},
  categories[]->{title, 'colourHex':colour.hex},
  'slug': slug.current,
  isFeatured,
  mainImage{
    asset->{
        _id,
        url
    },
  },
  'author': author->{name, 'picture': image.asset->url},
`


export async function getRecentPosts(preview) {
    return getClient(preview)
        .fetch(`*[_type == "post" && publishedAt <= now()][0..16] | order(publishedAt desc) {
      ${postFields}
    }`);
}

export async function getAllPosts(preview) {
    return getClient(preview)
        .fetch(`*[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
      ${postFields}
    }`);
}

export async function getPost(slug, preview) {
    return getClient(preview)
        .fetch(`*[_type == "post" && publishedAt <= now() && slug.current == $slug][0]{
                  ${postFields}
                  body
             }`,
            {slug});
}

export async function getRelatedPostsForTrip(slug, preview) {
    return getClient(preview)
        .fetch(`*[_type == "post" && publishedAt <= now() && $slug in trips[]->slug.current] | order(publishedAt desc)  {
                    ${postFields}
                }`,
            {slug});
}

export async function getRelatedPostsForDestination(slug, preview) {
    return getClient(preview)
        .fetch(`*[_type == "post" && publishedAt <= now() && $slug in destinations[]->slug.current] | order(publishedAt desc)  {
                    ${postFields}
                }`,
            {slug});
}

export async function getPostAndRelatedPostsForCategory(slug, preview) {
    return getClient(preview)
        .fetch(`*[_type == "post" && publishedAt <= now() && slug.current == $slug][0]{
                  ${postFields}
                  body[]{
                    ...,
                    _type == 'figure' => {
                        asset->{
                            _id,
                            _ref,
                            url
                        },
                        alt,
                        caption
                    }
                  },
                  "relatedPosts": *[_type == "post" && publishedAt <= now() && ^._id != _id && ^.categories[0]->title in categories[]->title] | order(publishedAt desc)[0...4]  {
                    ${postFields}
                   }
             }`,
            {slug});
}