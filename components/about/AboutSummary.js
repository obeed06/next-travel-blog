import styles from './AboutSummary.module.css'
import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const AboutSummary = () => {
    return (
        <Box  id="about-summary" sx={{py: 5 }}>
            <Typography vairant="h1" component="h2" className="sectionHeader myStoryHeader brandColor" >
                MY STORY.
            </Typography>
            <Container maxWidth="sm">
                <p className={styles.subHeading}>I&apos;m David Obee, a software developer based in the UK. <br/>Welcome to my blog, this my space to practice my frontend skills and emerging technologies while documenting my solo travelling experiences.</p>
            </Container>
        </Box>
    );
};

export default AboutSummary;