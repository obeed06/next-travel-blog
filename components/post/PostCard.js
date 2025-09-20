import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import { Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import Divider from "@mui/material/Divider";
import Moment from "moment";
import PostTags from "./PostTags";
import Link from "../../src/Link";

export default function PostCard({ post }) {
    Moment.locale('en')
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={"/posts/" + post.slug} underline="none">
            <Card
                sx={{
                    transition: "transform 0.15s ease-in-out",
                    minWidth: 250,
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    transform: isHovered ? "scale3d(1.05, 1.05, 1)" : "scale3d(1, 1, 1)",
                }}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
                raised={isHovered}
            >
                <CardActionArea key={post.slug}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image={post.mainImage.asset.url}
                        alt={post.mainImage.alt}
                    />
                    <CardContent>
                        <PostTags post={post} />
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h5"
                            className="cardHeader"
                        >
                            {post.title}
                        </Typography>
                        <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.15)" }} />
                        <span
                            className="postCardAuthor">By {post.author.name} on {Moment(post.publishedAt).format('DD MMMM YYYY')}</span>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}