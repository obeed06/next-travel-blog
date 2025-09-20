import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Parallax } from "react-scroll-parallax";
import DestinationGrid from "../components/destination/DestinationGrid";
import { getContinentsAndRegions, getCountryDestinations } from "../lib/destinationApi";
import MapChart from "../components/mapChart/MapChart";
import Grid from "@mui/material/Grid";
import HeaderAndFooter from "../components/HeaderAndFooter";
import SearchIcon from '@mui/icons-material/Search';
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SkeletonHeroPostCard from "../components/post/SkeletonHeroPostCard";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import Meta from "../components/Meta";
import urlBuilder from "@sanity/image-url";
import { getClient } from "../lib/sanity";

const Destinations = ({ destinations, continents, preview }) => {
    const [q, setQ] = useState("");
    const [qType, setQType] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("All");

    const handleTabChange = (e, newValue) => {
        setSelectedRegion(newValue);
        if (newValue === "All")
            setQ("");
        else {
            setQ(newValue);
            setQType(e.target.dataset.type)
        }
    };

    return <>
        <Meta title={"Find a place to visit | Where's Obee Blog"} />
        <HeaderAndFooter>
            {
                <Box id="destinations" className="section" sx={{ py: 5 }}>
                    <Container maxWidth='lg'>
                        <Box>
                            {
                                destinations ?
                                    <MapChart
                                        visitedGeos={searchDestinations(destinations, q, qType).map((d, i) => d.name)} />
                                    :
                                    <SkeletonHeroPostCard />

                            }
                        </Box>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Grid size={{ xs: 12, md: 8 }}>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <OutlinedInput
                                        onChange={(e) => {
                                            setSelectedRegion("All");
                                            setQType("search")
                                            setQ(e.target.value);
                                        }}
                                        endAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                                        placeholder="Search for a destination"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Box sx={{ pb: 5 }}>
                            {
                                continents ?
                                    <Tabs
                                        value={selectedRegion}
                                        onChange={handleTabChange}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        aria-label="scrollable auto tabs example"
                                    >
                                        <Tab key="all-continents"
                                            label="All"
                                            value="All"
                                            sx={{
                                                position: 'relative',
                                                paddingRight: 2,
                                                '&::after': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: '50%',
                                                    right: 0,
                                                    transform: 'translateY(-50%)',
                                                    height: '50%',
                                                    width: '1px',
                                                    backgroundColor: 'divider',
                                                },
                                            }} />
                                        {continents.map((c, i) =>
                                            <Tab data-type="continent"
                                                key={c?.name + "-filter"}
                                                value={c?.name}
                                                label={c?.name}
                                                sx={{
                                                    ...(i === continents.length - 1 && {
                                                        position: 'relative',
                                                        paddingRight: 2,
                                                        '&::after': {
                                                            content: '""',
                                                            position: 'absolute',
                                                            top: '50%',
                                                            right: 0,
                                                            transform: 'translateY(-50%)',
                                                            height: '50%',
                                                            width: '1px',
                                                            backgroundColor: 'divider',
                                                        },
                                                    }),
                                                }} />)
                                        }
                                        {
                                            continents.flatMap((c, i) => c.regions)
                                                .map((c, i) =>
                                                    <Tab data-type="sub-region"
                                                        key={c?.name + "-filter"}
                                                        value={c?.name}
                                                        label={c?.name} />
                                                )
                                        }
                                    </Tabs>
                                    :
                                    <></>
                            }
                            <Divider />
                        </Box>
                        <Parallax translateY={['0', '+48']}>
                            <Typography vairant="h1" component="h2" className="sectionHeader">
                                Destinations.
                            </Typography>
                        </Parallax>
                    </Container>
                    <DestinationGrid destinations={destinations && searchDestinations(destinations, q, qType)} />
                </Box>
            }
        </HeaderAndFooter>
    </>
};

function searchDestinations(destinations, q, qType) {
    if (!q)
        return destinations

    return destinations.filter((item) => {

        if (qType === "sub-region" || qType === "continent")
            return item && Array.isArray(item?.relatedDestinations) && item.relatedDestinations.find(el => el.name.toLowerCase() === q.toLowerCase());


        if (qType === "search")
            return ["name"].some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });

        return item
    });
}

export async function getStaticProps({ preview = false }) {
    const destinations = await getCountryDestinations(preview)
    const continents = await getContinentsAndRegions(preview)
    return {
        props: { destinations, continents, preview },
        revalidate: 1
    }
}

export default Destinations;