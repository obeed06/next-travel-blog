import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";


const useStyles = makeStyles((theme) => ({
    subHeading: {
        fontFamily: 'var(--font-heading-primary)',
        textAlign: 'center',
    },
}));

const AboutSummary = () => {
    const classes = useStyles();

    return (
        <Box  id="about-summary" sx={{py: 5 }}>
            <Typography vairant="h1" component="h2" className="sectionHeader myStoryHeader brandColor" >
                MY STORY.
            </Typography>
            <Container maxWidth='sm'>
                <p className={classes.subHeading}>I'm David Obee, a software developer based in the UK. <br/>Welcome to my blog, this my space to practice my frontend skills and emerging technologies while documenting my solo travelling experiences.</p>
            </Container>
        </Box>
    );
};

export default AboutSummary;