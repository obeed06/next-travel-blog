import styles from '../../styles/posts/[slug].module.css'
import React, { useRef } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { format } from "date-fns";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Chip from "@mui/material/Chip";
import DefaultBlockContent from "../../components/DefaultBlockContent";
import { PortableText } from "@portabletext/react";
import { getPostAndRelatedPostsForCategory } from "../../lib/postApi";
import { getHeadingsFromPostBodyJson } from "../../lib/postUtils";
import HeaderAndFooter from "../../components/HeaderAndFooter";
import TableOfContentsDrawer from "../../components/post/toc/TableOfContentsDrawer";
import FeaturedPosts from "../../components/post/FeaturedPosts";
import Button from "@mui/material/Button";
import Meta from "../../components/Meta";
import { sanityClient } from "../../lib/sanity";
import urlBuilder from "@sanity/image-url";
import Link from "../../src/Link";

export default function Post({ post, nestedHeadings }) {
    const postBodyTopRef = useRef(null)
    const postBodyBottomRef = useRef(null)

    return <>
        <Meta type="article" title={post?.title + " | Where's Obee Blog"}
            {...(post?.summary ? { description: post.summary } : {})}
            {...(post?.mainImage ? {
                image: (urlBuilder(sanityClient)
                    .image(post?.mainImage)
                    .fit('crop')
                    .width(1200)
                    .height(630)
                    .url())
            } : {})} />
        <HeaderAndFooter>
            {
                typeof (post) !== 'undefined' ? (
                    <Box>
                        <Box
                            className={styles.postLanding}
                            sx={{
                                "&::after": {
                                    backgroundColor: 'background.default',
                                },
                                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)), url(${post?.mainImage?.asset?.url})`
                            }}
                        >
                            <Grid sx={{ height: "100%" }} container direction="column" justifyContent="center"
                                alignItems="center">
                                <Stack direction="column" justifyContent="flex-end" alignItems="center" spacing={1}
                                    style={{ height: "80%" }}>
                                    <Typography
                                        gutterBottom
                                        variant="h3"
                                        component="h1"
                                    >
                                        {post?.title}
                                    </Typography>
                                    <Divider style={{ borderColor: "rgba(255, 255, 255, 0.15)", width: "75%" }} />
                                    <span
                                        className={styles.postCardAuthor}>By {post?.author?.name} on {format(post?.publishedAt, 'dd MMM yyyy')}</span>
                                </Stack>
                            </Grid>
                        </Box>
                        <Container maxWidth='lg' sx={{ my: 5 }}>
                            <DestinationBreadcrumbs destinations={post?.destinations} />
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 8 }}>
                                    <Box ref={postBodyBottomRef} className="postContent">
                                        <span ref={postBodyTopRef}></span>
                                        <PortableText value={post?.body} components={DefaultBlockContent} />
                                    </Box>
                                </Grid>
                            </Grid>
                            <ChipCategories categories={post?.categories} />
                        </Container>
                        <Container maxWidth='lg'>
                            {/*<Comments comments={post.comments} />*/}
                            {/*<Form _id={post._id} />*/}
                            <FeaturedPosts featuredPostsData={post?.relatedPosts} headingTitle="Related Posts." />
                        </Container>
                        <TableOfContentsDrawer nestedHeadings={nestedHeadings} intersectTopRef={postBodyTopRef}
                            intersectBottomRef={postBodyBottomRef} />
                    </Box>
                ) : (
                    <Box>
                        <Box className={styles.postLanding}>
                            <Grid sx={{ height: "100%" }} container direction="row" justifyContent="center"
                                alignItems="end">
                                <Skeleton sx={{ mb: 5 }} height={80} width={"40%"} />
                            </Grid>
                        </Box>
                    </Box>
                )
            }
        </HeaderAndFooter>
    </>
};

const DestinationBreadcrumbs = ({ destinations }) => {
    return <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb">
        <Link href={"/"} underline="none"><Button color="primary" size="small">Home</Button></Link>
        {
            destinations && Array.isArray(destinations) ?
                (
                    destinations.map((d, i) => <Link key={i + d.name} underline="none" href={"/destinations/" + d?.slug}>
                        <Button color="primary" size="small" >{d.name}</Button>
                    </Link>)
                ) : ""
        }
    </Breadcrumbs>
}

const ChipCategories = ({ categories }) => {
    return categories && Array.isArray(categories) ?
        <React.Fragment>
            <Stack direction="row" spacing={1} alignItems="center">
                <strong>CATEGORIES</strong>
                {categories.map((c, i) => (
                    <Chip key={i + c.title} clickable style={{ color: c?.colourHex, borderColor: c?.colourHex }}
                        component={Link}
                        href={"/posts?category=" + c.title}
                        variant="outlined"
                        size="small"
                        label={c?.title} />))}
            </Stack>

        </React.Fragment>
        : ""
}

export const getServerSideProps = async (pageContext, preview = false) => {
    const slug = pageContext.query.slug

    if (!slug)
        return {
            notFound: true
        }

    const post = await getPostAndRelatedPostsForCategory(slug, preview)
    if (!post)
        return {
            notFound: true
        }

    const nestedHeadings = typeof (post) !== 'undefined' ? getHeadingsFromPostBodyJson(post?.body) : []

    return {
        props: { post: post, nestedHeadings: nestedHeadings, preview: preview },
    }
}