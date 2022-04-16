import * as React from 'react';
import {Link as Scroll} from "react-scroll";
import {makeStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import {useEffect, useState} from "react";

const useStyles = makeStyles((theme) => ({
    goDown: {
        color: 'var(--brand-color)',
        fontSize: '4rem',
    },
}));

const Welcome = ({slideContainerRef}) => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);

    return (
        <Slide direction="up"
               in={checked}
               {...(checked ? {timeout: 1000} : {})}
               container={slideContainerRef.current}
        >
            <Grid sx={{height: "100%"}} container direction="column" justifyContent="center" alignItems="center">
                <Typography vairant="h1" component="h2" className="title">
                    <div>Welcome to</div>
                    <div>My <span className="brandColor">Blog</span>.</div>
                </Typography>
                <Scroll to="about-summary" smooth={true}>
                    <IconButton>
                        <ExpandMoreIcon className={classes.goDown}/>
                    </IconButton>
                </Scroll>
            </Grid>
        </Slide>
    );
};

export default Welcome;