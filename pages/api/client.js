import sanityClient from '@sanity/client'

export const getClient = (usePreview) => (usePreview ? previewClient : client)

const config = {
    // dataset: process.env.PUBLIC_SANITY_DATASET,
    // projectId: process.env.SANITY_PROJECT_ID,
    dataset: "production",
    projectId: "ho3u0oh3",
    apiVersion: '2022-03-13',
}

export const client = sanityClient({
    ...config,
    useCdn: true,
})

export const  previewClient = sanityClient({
    ...config,
    useCdn: false,
})

export default client
