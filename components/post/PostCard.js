import React, {useState} from 'react';
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";
import {Card, CardMedia, CardContent, CardActionArea} from '@mui/material';
import Divider from "@mui/material/Divider";
import Moment from "moment";
import PostTags from "./PostTags";

const useStyles = makeStyles({
    root: {
        transition: "transform 0.15s ease-in-out",
        minWidth: 250,
        height: '100%',
        background: 'rgba(0,0,0,0.5)',
    },
    cardHovered: {
        transform: "scale3d(1.05, 1.05, 0.5)!important"
    },
    media: {
        height: 200,
    },
    title: {
        fontFamily: 'var(--font-heading-primary)',
        color: '#fff',
    },
    desc: {
        fontFamily: 'var(--font-heading-primary)',
        color: '#ddd',
    },
});

export default function PostCard({post}) {
    Moment.locale('en')
    const classes = useStyles();
    const [state, setState] = useState({
        raised: false,
        shadow: 1,
    });
    return (
        <Card className={classes.root} classes={{root: state.raised ? classes.cardHovered : ""}}
              onMouseOver={() => setState({raised: true, shadow: 3})}
              onMouseOut={() => setState({raised: false, shadow: 1})}
              raised={state.raised} zdepth={state.shadow}>
            <CardActionArea href={"/post/" + post.slug} key={post.slug}>
                <CardMedia
                    className={classes.media}
                    image={post.mainImage.asset.url}
                    alt={post.mainImage.alt}
                />
                <CardContent>
                    <PostTags post={post}/>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h5"
                        className="cardHeader"
                    >
                        {post.title}
                    </Typography>
                    <Divider style={{borderColor: "rgba(255, 255, 255, 0.15)"}}/>
                    <span
                        className="postCardAuthor">By {post.author.name} on {Moment(post.date).format('DD MMMM YYYY')}</span>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}