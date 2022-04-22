export default {
    name: 'privacy',
    title: 'Privacy',
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
            name: 'content',
            title: 'Content',
            type: 'blockContent',
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
}
