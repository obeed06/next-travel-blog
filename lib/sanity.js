import sanityClient from '@sanity/client'

export const getClient = (usePreview) => (usePreview ? previewClient : sanity)

const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2022-03-13',
}

export const sanity = sanityClient({
    ...config,
    useCdn: true,
})

export const  previewClient = sanityClient({
    ...config,
    useCdn: false,
})

export default sanity
