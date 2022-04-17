import sanityClient from '@sanity/client'

const config = {
    dataset: process.env.REACT_APP_PUBLIC_SANITY_DATASET,
    projectId: process.env.REACT_APP_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2022-03-13',
    useCdn: true,
    token: process.env.REACT_APP_PUBLIC_SANITY_WRITE_KEY,
}
const client = sanityClient(config)

export async function createComment({_id, name, email, comment}) {
    return client.create({
        _type: 'comment',
        post: {
            _type: 'reference',
            _ref: _id,
        },
        name,
        email,
        comment
    });
}