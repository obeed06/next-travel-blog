import { hyphenate } from "../lib/postUtils";
import { sanityClient } from "../lib/sanity";
import Link from "../src/Link";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import { Typography } from "@mui/material";

const Figure = props => {
    const imageProps = useNextSanityImage(
        sanityClient,
        props.value
    );

    if (!imageProps) return null;

    return (
        <figure style={{ margin: '2rem 0' }}>
            <Image
                {...imageProps}
                alt={props.value.alt || ' '}
                sizes="(max-width: 800px) 100vw, 800px"
                style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px"
                }}
            />
            {props.value.caption && (
                <Typography component="figcaption" variant="caption" align="center">
                    {props.value.caption}
                </Typography>
            )}
        </figure>
    );
}

const DefaultBlockContent = {
    block: {
        h1: ({ children }) => <h1 id={hyphenate(children[0])}>{children}</h1>,
        h2: ({ children }) => <h2 id={hyphenate(children[0])}>{children}</h2>,
        h3: ({ children }) => <h3 id={hyphenate(children[0])}>{children}</h3>,
        h4: ({ children }) => <h4 id={hyphenate(children[0])}>{children}</h4>,
        h5: ({ children }) => <h5 id={hyphenate(children[0])}>{children}</h5>,
    },
    marks: {
        link: ({ value, children }) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
            return (
                <Link href={value?.href} target={target} rel={target === '_blank' && 'noindex nofollow'}
                    underline="hover">
                    {children}
                </Link>
            )
        },
        internalLink: ({ value, children }) => {
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

export default DefaultBlockContent;