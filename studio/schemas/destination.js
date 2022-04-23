export default {
    name: 'destination',
    title: 'Destination',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Destination Name',
            type: 'string',
        },
        {
            name: 'icon',
            title: 'Destination Icon',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'bgImage',
            title: 'Destination Background',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            title: 'Region Types',
            name: 'regionTypes',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                list: [
                    {title: 'Continent', value: 'continent'},
                    {title: 'Region', value: 'region'},
                    {title: 'Country', value: 'country'},
                    {title: 'Area', value: 'area'}
                ]
            }
        },
        {
            name: 'relatedDestinations',
            title: 'Related Destinations',
            type: 'array',
            of: [{type: 'reference', to: {type: 'destination'}}],
            hidden: ({document}) => document?.regionTypes.includes("continent"),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        {
            name: 'summary',
            title: 'Summary',
            type: 'text',
        },
    ],
    orderings: [
        {
            title: 'Destination Name',
            name: 'destinationNameAsc',
            by: [
                {field: 'name', direction: 'asc'}
            ]
        }
    ],
    preview: {
        select: {
            title: 'name',
            media: 'icon',
        },
    },
}
