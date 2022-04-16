import React from 'react';
import {hyphenate} from "../pages/api/postUtils";
import {getImageDimensions} from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import {getClient} from "../pages/api/client";
import Link from "../src/Link";

const DefaultBlockContent = {
    block: {
        h1: ({children}) => <h1 id={hyphenate(children[0])}>{children}</h1>,
        h2: ({children}) => <h2 id={hyphenate(children[0])}>{children}</h2>,
        h3: ({children}) => <h3 id={hyphenate(children[0])}>{children}</h3>,
        h4: ({children}) => <h4 id={hyphenate(children[0])}>{children}</h4>,
        h5: ({children}) => <h5 id={hyphenate(children[0])}>{children}</h5>,

    },
    marks: {
        link: ({value, children}) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
            return (
                <Link href={value?.href} target={target} rel={target === '_blank' && 'noindex nofollow'} underline="hover">
                    {children}
                </Link>
            )
        },
        internalLink: ({value, children}) => {
            return (
                <Link href={value?.url} underline="hover">
                    {children}
                </Link>
            )
        },

    },
    types: {
        figure: props => {
            const {width, height} = getImageDimensions(props.value)
            return (
                <img
                    src={urlBuilder(getClient(false))
                        .image(props.value)
                        .fit('max')
                        .auto('format')
                        .url()}
                    alt={props.value.alt || ' '}
                    loading="lazy"
                    style={{
                        // Display alongside text if image appears inside a block text span
                        display: props.isInline ? 'inline-block' : 'block',
                        width: "100%",
                        // Avoid jumping around with aspect-ratio CSS property
                        aspectRatio: width / height,
                    }}
                />
            )
        },

    }
};

export default DefaultBlockContent
