import React from "react";
import Container from "@mui/material/Container";
import {Parallax} from "react-scroll-parallax";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PostCard from "./PostCard";
import Stack from "@mui/material/Stack";
import SkeletonPostCard from "./SkeletonPostCard";

export default function FeaturedPosts({featuredPostsData, headingTitle}) {

    return (
        <Box id="featuredPosts">
            <Container maxWidth='lg'>
                <Parallax translateY={['0', '+53']}>
                    <Typography vairant="h1" component="h2" className="sectionHeader" style={{color: "#d1deea"}}>
                        {headingTitle}
                    </Typography>
                </Parallax>
            </Container>
            <Stack direction="row" justifyContent="center" spacing={2} className="cardXScroll" sx={{pt:1, pb: 5, px: 5, position: "relative", zIndex: "3"}}>
                {
                    featuredPostsData ?
                    (
                        featuredPostsData.map((post, i) => <PostCard post={post} key={i} checked={true}/>)
                    ) :
                    (
                        [...Array(4)].map((e, i) => (
                            <SkeletonPostCard />
                        ))
                    )
                }
            </Stack>
        </Box>
    );
}