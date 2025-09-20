import styles from '../styles/about.module.css';
import { useEffect, useRef } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { format } from "date-fns";
import Typed from "typed.js";
import Avatar from "@mui/material/Avatar";
import DefaultBlockContent from "../components/DefaultBlockContent";
import { PortableText } from "@portabletext/react";
import { getAuthorDetails } from "../lib/authorApi";
import HeaderAndFooter from "../components/HeaderAndFooter";
import Meta from "../components/Meta";

export default function About({ author, preview }) {
    const containerRef = useRef(null);
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Backend Developer", "Frontend Developer?", "Backpacker", "Blogger?"],
            startDelay: 300,
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 100,
            loop: true,
        });

        return () => {
            typed.destroy();
        };
    }, [preview]);

    return (
        <>
            <Meta title="About Where's Obee Blog & David Obee" />
            <HeaderAndFooter>
                <Box
                    className={styles.landingAbout}
                    sx={{
                        "&::after": {
                            backgroundColor: 'background.default',
                        }
                    }}
                    ref={containerRef}
                >
                    <Grid sx={{ height: "100%" }} container direction="column" justifyContent="center"
                        alignItems="center">
                        <Avatar alt="David Obee" src={'/assets/avatar.jpg'} sx={{ width: 56, height: 56 }} />
                        <Box sx={{ color: "white" }}><span ref={el}></span></Box>
                        <Typography variant="h1" component="h1" className={styles.aboutHeading}>
                            <div className={styles.aboutSubHeading}>learn more</div>
                            <Divider
                                style={{ borderColor: "rgba(255, 255, 255, 0.15)", width: "75%", marginLeft: "12.5%" }} />
                            about me
                        </Typography>
                    </Grid>
                </Box>
                {author ? (
                    <Container maxWidth='md'>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            divider={<Divider style={{ marginLeft: "5px", marginRight: "5px" }} orientation="vertical"
                                flexItem />}
                            sx={{ alignItems: "center", justifyContent: "space-evenly" }}>

                            <div>
                                <Typography className={styles.statTitle} variant="h5" component="h5">
                                    Countries Visited:
                                </Typography>
                                <em className={styles.statNumber}>{author?.destinationCount}+</em>
                            </div>
                            <div>
                                <Typography className={styles.statTitle} variant="h5" component="h5">
                                    Years Travelled:
                                </Typography>
                                <em className={styles.statNumber}>{new Date().getFullYear() - format(author?.earliestTrip?.tripDate, 'yyyy')}+</em>
                            </div>
                            <div>
                                <Typography className={styles.statTitle} variant="h5" component="h5">
                                    Posts Written:
                                </Typography>
                                <em className={styles.statNumber}>{author?.postCount}</em>
                            </div>
                        </Stack>
                        <Box sx={{ py: 5 }} className="postContent">
                            <PortableText value={author?.bio} components={DefaultBlockContent} />
                        </Box>
                    </Container>
                ) : (
                    ""
                )}
            </HeaderAndFooter>
        </>
    );
};

export async function getStaticProps({ preview = false }) {
    const author = await getAuthorDetails(preview)

    return {
        props: { author, preview },
        revalidate: 1
    }
}