export default {
    name: 'figure',
    type: 'image',
    title: 'Figure',
    fields: [
        {
            name: 'alt',
            type: 'string',
            title: 'Alternative text',
            description: `Describe the image for people who can't see it`,
            isHighlighted: true
        },
        {
            name: 'caption',
            type: 'string',
            title: 'Caption',
            description: `Text that's displayed with the image`,
            isHighlighted: true
        }
    ],
    options: {
        hotspot: true
    }
}