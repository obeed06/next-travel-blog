const headings = ["h2", "h3"]

export const getHeadingsFromPostBodyJson = body => {
    if (!body && !Array.isArray(body))
        return [];

    return getNestedHeadings(body.filter(entry => headings.includes(entry?.style)));
}

const getNestedHeadings = (headings) => {
    const nestedHeadings = [];

    headings.forEach((heading, index) => {
        const title = heading.children[0].text;
        const id = hyphenate(title);

        if (heading.style === "h2") {
            nestedHeadings.push({ id, title, items: [] });
        } else if (heading.style === "h3" && nestedHeadings.length > 0) {
            nestedHeadings[nestedHeadings.length - 1].items.push({
                id,
                title,
            });
        }
    });

    return nestedHeadings;
};

export function hyphenate(str) {
    return str.replace(/[^\w\s]|_/g, '')
        // replace groups of 1 or more whitespace with hyphens
        .replace(/\s+/g, '-')
        // lower case
        .toLowerCase()
}