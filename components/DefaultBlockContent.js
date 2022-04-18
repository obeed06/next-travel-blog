import React from 'react';
import {hyphenate} from "../lib/postUtils";
import {getImageDimensions} from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import {getClient} from "../lib/sanity";
import Link from "../src/Link";
import {useNextSanityImage} from "next-sanity-image";
import Img from "next/image";

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
            return Figure(props)
        },

    }
};

const Figure = props => {
    const imageProps = useNextSanityImage(
        getClient(false),
        props.value,
        {imageBuilder: blockContentImageBuilder}
    );
    return <Img {...imageProps} layout="responsive"
                sizes="(max-width: 800px) 100vw, 800px" alt={props.value.alt || ' '}/>
}

const blockContentImageBuilder = (imageUrlBuilder, options) => {
    return imageUrlBuilder
        .width(options.width || Math.min(options.originalImageDimensions.width, 800))
        .fit('max')
        .auto('format')
};

export default DefaultBlockContent
