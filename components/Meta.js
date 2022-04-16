import React from 'react';
import Helmet from "react-helmet";

const Meta = props => {
    return (
        <Helmet>
            <title>{props.title}</title>
            <meta name="description" content={props.title} />
            <meta name="keywords" content={props.keywords} />
            <link href="https://www.wheresobee.blog/" rel="canonical"/>
            <link rel="shortcut icon" href="/favicon-32x32.png"/>
            {/*Facebook Meta Tags*/}
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:image" content={props.image} />
            <meta property="og:type" content={props.type} />
            <meta property="og:url" content={props.domain + props.path} />
            {/* Twitter Meta Tags*/}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="wheresobee.blog" />
            <meta property="twitter:url" content={props.domain + props.path} />
            <meta name="twitter:title" content={props.title} />
            <meta name="twitter:description" content={props.description} />
            <meta name="twitter:image" content={props.image} />
        </Helmet>
    );
};

Meta.defaultProps = {
        title: "Where's Obee Blog - Developer Tantrums and Travel Musings",
        description: "Where's Obee Blog is a solo backpacking travel blog featuring thoughts of a caffeinated developer, travel guides, packing lists, hiking guides and itineraries.",
        keywords: "solo travel, itinerary, travel guide, budget, backpacking, adventure, hiking, software developer",
        image: "https://www.wheresobee.blog/social-thumbnail.jpg",
        type: "website",
        domain: "https://www.wheresobee.blog",
        path: "/"
};

export default Meta;