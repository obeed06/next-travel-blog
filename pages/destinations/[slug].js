import styles from '../../styles/destinations/[slug].module.css'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PostsGrid from "../../components/post/PostsGrid";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from '@mui/material/styles';
import { getDestinationAndRelatedPosts } from "../../lib/destinationApi";
import HeaderAndFooter from "../../components/HeaderAndFooter";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { Link as Scroll } from "react-scroll";
import { deepOrange } from "@mui/material/colors";
import Meta from "../../components/Meta";
import urlBuilder from "@sanity/image-url";
import { sanityClient } from "../../lib/sanity";
import Link from "../../src/Link";
import { Stack } from '@mui/material';

export default function Destination({ destination, relatedPosts, preview }) {
    const themeProps = useTheme();
    return <>
        <Meta title={"Explore " + destination?.name + " | Where's Obee Blog"}
            {...(destination?.summary ? { description: destination.summary } : {})}
            {...(destination?.bgImage ? {
                image: (urlBuilder(sanityClient)
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
                                        backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.5), " + themeProps.palette.background.default + "), url(" + urlBuilder(sanityClient)
                                            .image(destination?.bgImage)
                                            .blur(30)
                                            .url() + ")"
                                    })
                                } : {}
                            )}>
                            <Grid sx={{ height: "100%" }} container direction="column" justifyContent="center"
                                alignItems="center">
                                <Grid className="dIcon" style={{ width: '60%', height: '60%' }}>
                                    <div className="dIconBg"
                                        style={{ backgroundImage: "url(" + destination?.icon?.asset?.url + ")" }}></div>
                                    <Typography vairant="h1" component="h1" style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}>
                                        {destination?.name}
                                    </Typography>
                                </Grid>
                                <Grid sx={{ pb: 3 }}>
                                    <Container maxWidth="sm">
                                        <Typography vairant="p" component="p">
                                            {destination?.summary}
                                        </Typography>
                                    </Container>
                                </Grid>
                                <Grid>
                                    <Scroll to="destination-content" smooth={true}>
                                        <Button variant="contained"
                                            endIcon={<ArrowDownwardIcon />}>Explore {destination?.name}</Button>
                                    </Scroll>

                                </Grid>
                            </Grid>
                        </Box>
                        <Container maxWidth='lg' id="destination-content">
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    overflowX: 'auto',
                                    '&::-webkit-scrollbar': {
                                        display: 'none'
                                    },
                                    'msOverflowStyle': 'none',
                                    'scrollbarWidth': 'none'
                                }}
                            >
                                {getPickDestinationTab(destination?.relatedDestinations, 'Pick a region')}
                                {getPickDestinationTab(destination?.regions, 'Pick a region')}
                                {getPickDestinationTab(destination?.countries, 'Pick a destination')}
                                {getPickDestinationTab(destination?.areas, 'Pick an area')}
                                {getPickTrips(destination?.trips)}
                            </Stack>
                            <Divider />
                        </Container>
                        <span className="sections">
                            <Box id="postsSection" className="section" sx={{ py: 5 }}>
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
                            <Grid sx={{ height: "100%" }} container direction="row" justifyContent="center" alignItems="center">
                                <Skeleton height={80} width={"40%"} />
                            </Grid>
                        </Box>
                    </Box>)
            }
        </HeaderAndFooter>
    </>
};

function LinkButton({ href, label }) {
    return (
        <Link href={href} underline="none">
            <Button
                variant="text"
                sx={{
                    color: 'text.secondary',
                    textTransform: 'uppercase',
                    fontWeight: 400,
                    alignSelf: 'center',
                    whiteSpace: 'nowrap',
                    borderBottom: '2px solid transparent',
                    borderRadius: 0,
                    transition: (theme) => theme.transitions.create('border-color', {
                        duration: theme.transitions.duration.short,
                    }),
                    '&:hover': {
                        borderBottomColor: deepOrange[500],
                        backgroundColor: 'transparent'
                    }
                }}
            >
                {label}
            </Button>
        </Link>
    );
}

function getPickDestinationTab(destinations, label) {
    if (!Array.isArray(destinations) || destinations.length === 0) {
        return [];
    }

    return [
        <Typography
            key={label}
            sx={{
                textTransform: "uppercase",
                color: 'text.secondary',
                alignSelf: 'center',
                whiteSpace: 'nowrap',
                position: 'relative',
                paddingRight: 2,
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    right: 0,
                    transform: 'translateY(-50%)',
                    height: '75%',
                    width: '1px',
                    backgroundColor: 'divider',
                },
            }}>
            {label}
        </Typography>,
        ...destinations.map(destination => (
            <LinkButton key={destination?.name} style={{ zIndex: 5 }} label={destination?.name}
                href={"/destinations/" + destination?.slug} />
        ))
    ];
}

function getPickTrips(trips) {
    if (!Array.isArray(trips) || trips.length === 0) {
        return [];
    }

    return [
        <Typography
            key="trips-label"
            sx={{
                textTransform: "uppercase",
                color: 'text.secondary',
                alignSelf: 'center',
                whiteSpace: 'nowrap',
                position: 'relative',
                paddingRight: 2,
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    right: 0,
                    transform: 'translateY(-50%)',
                    height: '75%',
                    width: '1px',
                    backgroundColor: 'divider',
                },
            }}>
            See in trips
        </Typography>,
        ...trips.map(trip => (
            <LinkButton key={trip?.name} style={{ zIndex: 5 }} label={trip?.name} href={"/trips/" + trip?.slug} />
        ))
    ];
}

export const getServerSideProps = async (pageContext, preview = false) => {
    const slug = pageContext.query.slug

    if (!slug)
        return {
            notFound: true
        }
    const [destination, relatedPosts] = await getDestinationAndRelatedPosts(slug, preview)
    if (!destination)
        return {
            notFound: true
        }
    return {
        props: { destination: destination, relatedPosts: relatedPosts, preview: preview },
    }
}