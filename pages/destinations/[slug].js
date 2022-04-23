import styles from '../../styles/destinations/[slug].module.css'
import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PostsGrid from "../../components/post/PostsGrid";
import Skeleton from "@mui/material/Skeleton";
import {useTheme} from "@mui/styles";
import {getDestinationAndRelatedPosts} from "../../lib/destinationApi";
import HeaderAndFooter from "../../components/HeaderAndFooter";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import {Link as Scroll} from "react-scroll";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {deepOrange} from "@mui/material/colors";
import Meta from "../../components/Meta";
import urlBuilder from "@sanity/image-url";
import {getClient} from "../../lib/sanity";
import Link from "../../src/Link";

export default function Destination({destination, relatedPosts, preview}) {
    const themeProps = useTheme();
    return <>
        <Meta title={"Explore " + destination?.name + " | Where's Obee Blog"}
              {...(destination?.summary ? {description: destination.summary} : {})}
              {...(destination?.bgImage ? {
                  image: (urlBuilder(getClient(false))
                      .image(destination?.bgImage)
                      .fit('crop')
                      .width(1200)
                      .height(630)
                      .url())
              } : {})} />
        <HeaderAndFooter>
            {
                typeof (destination) !== 'undefined' ? (
                    <Box>
                        <Box className={styles.destinationLanding}
                             sx={{
                                 "&::after": {
                                     backgroundColor: themeProps.palette.background.default,
                                 }
                             }}
                             {...(destination?.bgImage ?
                                     {
                                         style: ({
                                             backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.5), " + themeProps.palette.background.default + "), url(" + urlBuilder(getClient(false))
                                                 .image(destination?.bgImage)
                                                 .blur(30)
                                                 .url() + ")"
                                         })
                                     } : {}
                             )}>
                            <Grid sx={{height: "100%"}} container direction="column" justifyContent="center"
                                  alignItems="center">
                                <Grid item className="dIcon" style={{width: '60%', height: '60%'}}>
                                    <div className="dIconBg"
                                         style={{backgroundImage: "url(" + destination?.icon?.asset?.url + ")"}}></div>
                                    <Typography vairant="h1" component="h1" style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}>
                                        {destination?.name}
                                    </Typography>
                                </Grid>
                                <Grid item sx={{pb:3}}>
                                    <Container maxWidth="sm">
                                        <Typography vairant="p" component="p">
                                            {destination?.summary}
                                        </Typography>
                                    </Container>
                                </Grid>
                                <Grid item>
                                    <Scroll to="destination-content" smooth={true}>
                                        <Button variant="contained"
                                                endIcon={<ArrowDownwardIcon/>}>Explore {destination?.name}</Button>
                                    </Scroll>

                                </Grid>
                            </Grid>
                        </Box>
                        <Container maxWidth='lg' id="destination-content">
                            <Tabs variant="scrollable"
                                  scrollButtons="auto"
                                  aria-label="related destinations links">
                                {getPickDestinationTab(destination?.relatedDestinations, 'Pick a region')}
                                {getPickDestinationTab(destination?.regions, 'Pick a region')}
                                {getPickDestinationTab(destination?.countries, 'Pick a country')}
                                {getPickDestinationTab(destination?.areas, 'Pick an area' )}
                                {getPickTrips(destination?.trips)}
                            </Tabs>
                            <Divider/>
                        </Container>
                        <span className="sections">
                        <Box id="postsSection" className="section" sx={{py: 5}}>
                            <PostsGrid postsData={relatedPosts} checked={true}
                                       header={
                                           <Typography vairant="h1" component="h2" className="sectionHeader">
                                               Related Posts.
                                           </Typography>
                                       }
                            />
                        </Box>
                    </span>
                    </Box>
                ) : (
                    <Box>
                        <Box className={styles.destinationLanding}>
                            <Grid sx={{height: "100%"}} container direction="row" justifyContent="center"
                                  alignItems="center">
                                <Skeleton height={80} width={"40%"}/>
                            </Grid>
                        </Box>
                    </Box>)
            }

        </HeaderAndFooter>
    </>


};

function LinkTab(props) {
    return (
        <Tab
            component={Link}
            sx={{
                borderBottom: "2px solid transparent",
                ":hover": {
                    borderBottom: "2px solid " + deepOrange["500"]
                }
            }}
            {...props}
        />
    );
}

function getPickDestinationTab(destinations, label) {
    if (!Array.isArray(destinations) || destinations.length === 0)
        return;
    return <>
        <Tab disabled sx={{textTransform: "uppercase"}} label={label}/>
        <Divider sx={{mx: 1}} orientation="vertical" variant="middle" flexItem/>
        {Array.isArray(destinations) && destinations.map(destination => (
            <LinkTab key={destination?.name} style={{zIndex: 5}} label={destination?.name}
                     href={"/destinations/" + destination?.slug}/>
        ))}
    </>
}

function getPickTrips(trips) {
    if (!Array.isArray(trips) || trips.length === 0)
        return;

    return <>
        <Tab disabled sx={{textTransform: "uppercase"}} label="See in trips"/>
        <Divider sx={{mx: 1}} orientation="vertical" variant="middle" flexItem/>
        {Array.isArray(trips) && trips.map(trip => (
            <LinkTab key={trip?.name} style={{zIndex: 5}} label={trip?.name} href={"/trips/" + trip?.slug}/>
        ))}
    </>
}

export const getServerSideProps = async (pageContext, preview = false) => {
    const slug = pageContext.query.slug

    if (!slug)
        return {
            notFound: true
        }
    const [destination, relatedPosts] = await getDestinationAndRelatedPosts(slug, preview)
    return {
        props: {destination: destination, relatedPosts: relatedPosts, preview: preview},
    }
}