export default {
    name: 'itinerary',
    title: 'Itinerary',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'name',
            type: 'string',
        },
        {
            name: 'placeholder',
            title: 'placeholder',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            title: 'Iframe Link',
            name: 'iframeLink',
            type: 'url',
            validation: Rule => Rule.uri({
                scheme: ['http', 'https']
            })
        }
    ],

    preview: {
        select: {
            title: 'name',
            media: 'placeholder',
        },
    },
}
