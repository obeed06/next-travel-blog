export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            options: {
                source: doc => `${doc.title}-${doc.publishedAt}`,
                maxLength: 60,
            },
        },
        {
            name: 'summary',
            title: 'Summary',
            type: 'string',
            options: {
                source: doc => `${doc.title}-${doc.publishedAt}`,
                maxLength: 160,
            },
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: doc => `${doc.title}-${doc.publishedAt}`,
                maxLength: 96,
            },
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: {type: 'author'},
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'destinations',
            title: 'Destinations',
            type: 'array',
            of: [{type: 'reference', to: {type: 'destination'}}],
        },
        {
            name: 'trips',
            title: 'Trips',
            type: 'array',
            of: [{type: 'reference', to: {type: 'trip'}}],
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{type: 'reference', to: {type: 'category'}}],
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'date',
        },
        {
            name: 'isFeatured',
            title: 'Is Featured Post?',
            type: 'boolean',
        },
        {
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        },
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const {author} = selection
            return Object.assign({}, selection, {
                subtitle: author && `by ${author}`,
            })
        },
    },
}
