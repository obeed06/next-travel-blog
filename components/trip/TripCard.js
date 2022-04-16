import React, {useState} from 'react';
import {makeStyles} from "@mui/styles";
import Grow from "@mui/material/Grow";
import Typography from "@mui/material/Typography";
import {Card, CardMedia, CardContent, CardActionArea} from '@mui/material';

const useStyles = makeStyles({
    root: {
        transition: "transform 0.15s ease-in-out",
        minWidth: 250,
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

export default function TripCard({slugPrefix, item, checked, timeout = 1}) {
    const classes = useStyles();
    const [state, setState] = useState({
        raised: false,
        shadow: 1,
    });
    return (
        <Grow in={checked} {...(checked ? {timeout: 500 * timeout} : {})}>
            <Card className={classes.root} classes={{root: state.raised ? classes.cardHovered : ""}}
                  onMouseOver={() => setState({raised: true, shadow: 3})}
                  onMouseOut={() => setState({raised: false, shadow: 1})}
                  raised={state.raised} zdepth={state.shadow}>
                <CardActionArea href={slugPrefix+item.slug.current} key={item.slug.current}>
                    <CardMedia
                        className={classes.media}
                        image={item.thumbnail.asset.url}
                        alt={item.thumbnail.alt}
                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h4"
                            className={classes.title}
                        >
                            {item.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classes.desc}
                        >
                            {item.tagline}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grow>
    );
}