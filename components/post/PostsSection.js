import styles from './PostsSection.module.css'
import React from "react";
import Box from "@mui/material/Box";
import FeaturedPosts from "./FeaturedPosts";
import PostsGrid from "./PostsGrid";
import useWindowPosition from "../../hook/useWindowPosition";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "../../src/Link";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Typography from "@mui/material/Typography";
import {makeStyles} from "@mui/styles";
import {Parallax} from "react-scroll-parallax";
import Container from "@mui/material/Container";

const useStyles = makeStyles((theme) => ({
    featuredPostSection: {
        "&::before": {
            backgroundColor: theme.palette.background.default,
        }
    },
}));

export default function PostsSection({posts}) {
    const classes = useStyles();

    if (!posts) return <div>Loading...</div>;
    let featuredPosts = posts.filter(p => {
        return p.isFeatured
    }).slice(0, 4)
    let recentPosts = posts.filter(p => {
        return !featuredPosts.includes(p)
    })
    let sectionBGUrl = featuredPosts[0]?.mainImage?.asset?.url;
    const olderPostBtn = (
            <Grid container item direction="row" justifyContent="flex-end" alignItems="center" sx={{pt: 3}}>
                <Button component={Link} to="/posts" variant="outlined" endIcon={<DoubleArrowIcon/>}>OLDER POSTS</Button>
            </Grid>
        );


    return (
        <Box id="postsSection" className="section" sx={{py: 5}}>
            <Box className={[classes.featuredPostSection, styles.featuredPostSection]}
                 sx={{backgroundImage: "url(" + sectionBGUrl + ")"}}>
                <FeaturedPosts featuredPostsData={featuredPosts} headingTitle="Featured."/>
            </Box>
            <Box sx={{marginTop: "-15px"}}>
                <PostsGrid postsData={recentPosts} checked={true} actions={olderPostBtn}
                           header={
                               <Container maxWidth='lg'>
                                   <Parallax translateY={['0', '+48']}>
                                       <Typography variant="h1" component="h2" className="sectionHeader">
                                           Recent Posts.
                                       </Typography>
                                   </Parallax>
                               </Container>

                           }
                />
            </Box>
        </Box>
    );
}


