import React from 'react';
import { format } from "date-fns";
import Paper from "@mui/material/Paper";
import PostTags from "./PostTags";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "../../src/Link";

export default function MobilePostCard({ post }) {
    return (
        <Link href={"/posts/" + post.slug} key={post.slug} underline="none" style={{ width: "100%" }}>
            <Paper elevation={0} square className="mobilePostCard"
                style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0) 65%, black), url(" + post.mainImage.asset.url + ")" }}>
                <Stack direction="column" justifyContent="flex-end" alignItems="center" spacing={1} style={{ height: "80%" }}>
                    <PostTags post={post} />
                    <Typography
                        gutterBottom
                        variant="h3"
                        component="h1"
                        className="cardHeader"
                        style={{ fontSize: "6vw", textAlign: "center" }}
                    >
                        {post.title}
                    </Typography>
                    <Divider style={{ borderColor: "rgba(255, 255, 255, 0.15)", width: "75%" }} />
                    <span
                        className="postCardAuthor">By {post.author.name} on {format(post.publishedAt, 'dd MMM yyyy')}</span>
                </Stack>
            </Paper>
        </Link>
    );
}