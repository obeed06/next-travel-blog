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
            name: 'isCountry',
            title: 'Is Country?',
            type: 'boolean',
        },
        {
            name: 'isContinent',
            title: 'Is Continent?',
            type: 'boolean',
        },
        {
            name: 'isRegion',
            title: 'Is Region?',
            type: 'boolean',
        },
        {
            name: 'continent',
            title: 'Continent',
            type: 'reference',
            to: {type: 'destination'},
            options: { filter: "isContinent == true"}
        },
        {
            name: 'regions',
            title: 'Regions',
            type: 'array',
            of: [{type: 'reference', to: {type: 'destination'}, options: { filter: "isRegion == true"}}],
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
