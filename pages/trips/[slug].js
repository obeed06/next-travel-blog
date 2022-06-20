import styles from '../../styles/trips/[slug].module.css'
import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DestinationsSection from "../../components/destination/DestinationsSection";
import ItineraryMap from "../../components/trip/ItineraryMap";
import PostsGrid from "../../components/post/PostsGrid";
import {useTheme} from "@mui/styles";
import Skeleton from "@mui/material/Skeleton";
import {getTripAndRelatedPosts} from "../../lib/tripApi";
import HeaderAndFooter from "../../components/HeaderAndFooter";
import Container from "@mui/material/Container";
import {PortableText} from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import {getClient} from "../../lib/sanity";
import Meta from "../../components/Meta";

export default function Trip({trip, relatedPosts, preview}) {
    const themeProps = useTheme();
    return <>
        <Meta title={"Explore " + trip?.name + " | Where's Obee Blog"}
              {...(trip?.summary ? {description: trip.summary} : {})}
              {...(trip?.hero ? {
                  image: (urlBuilder(getClient(false))
                      .image(trip?.hero)
                      .fit('crop')
                      .width(1200)
                      .height(630)
                      .url())
              } : {})} />
        <HeaderAndFooter>
            {
                typeof (trip) !== 'undefined' ? (
                    <Box>
                        <Box className={styles.tripLanding}
                             sx={{
                                 "&::after": {
                                     backgroundColor: themeProps.palette.background.default,
                                 }
                             }}
                             {...(trip?.hero ?
                                     {
                                         style: ({
                                             backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(" + urlBuilder(getClient(false))
                                                 .image(trip?.hero)
                                                 .blur(30)
                                                 .url() + ")"
                                         })
                                     } : {}
                             )}>
                            <Grid sx={{height: "100%"}} container direction="column" justifyContent="center"
                                  alignItems="center">
                                <Typography vairant="h1" component="h2" className="title">
                                    <div>{trip?.name}</div>
                                </Typography>
                            </Grid>
                        </Box>
                        {trip?.summary ? (
                            <Container maxWidth='sm'
                                       sx={{pt: 5, textAlign: 'center', fontFamily: 'var(--font-heading-primary)'}}>
                                <PortableText value={trip?.summary}/>
                            </Container>
                        ) : ""}

                        <span className="sections">
                        <DestinationsSection destinations={trip?.destinations}/>
                        <ItineraryMap itinerary={trip?.itinerary} bgOverride={trip?.thumbnail}/>
                    </span>
                        {trip?.breakdown ? (
                            <Container maxWidth='lg' sx={{
                                py: 5,
                            }}>
                                <Typography vairant="h1" component="h2" className="sectionHeader">
                                    Breakdown.
                                </Typography>
                                <PortableText value={trip?.breakdown}/>
                            </Container>
                        ) : ""}

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
                ) : (<Box className={styles.tripLanding}>
                    <Grid sx={{height: "100%"}} container direction="row" justifyContent="center" alignItems="end">
                        <Skeleton sx={{mb: 5}} height={80} width={"40%"}/>
                    </Grid>
                </Box>)
            }
        </HeaderAndFooter>
    </>
};

export const getServerSideProps = async (pageContext, preview = false) => {
    const slug = pageContext.query.slug

    if (!slug)
        return {
            notFound: true
        }

    const [trip, relatedPosts] = await getTripAndRelatedPosts(slug, preview)

    if (!trip)
        return {
            notFound: true
        }

    return {
        props: {trip: trip, relatedPosts: relatedPosts, preview: preview},
    }
}
