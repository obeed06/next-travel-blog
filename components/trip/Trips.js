import './Trips.module.css';
import React from 'react';
import TripCard from "./TripCard";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Parallax } from "react-scroll-parallax";
import Button from "@mui/material/Button";
import Link from '../../src/Link';
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Grid from "@mui/material/Grid";

const Trips = ({ trips }) => {
    const checked = true;
    if (!trips) return <div>Loading...</div>;

    return (
        <Box
            id="trips"
            className="tripsSection section"
            sx={{
                py: 5,
                '&::before': {
                    backgroundColor: 'background.default',
                },
            }}
        >
            <Box>
                <Container maxWidth='lg'>
                    <Parallax translateY={['0', '+55']}>
                        <Typography variant="h1" component="h2" className="sectionHeader">
                            TRIPS.
                        </Typography>
                    </Parallax>
                </Container>
            </Box>
            <Stack direction="row" spacing={2} className="cardXScroll" sx={{ pt: 1, px: 5, position: "relative", zIndex: "3" }}>
                {trips && trips.map((trip, i) => {
                    return <TripCard key={i} slugPrefix="/trips/" item={trip} checked={checked} />
                })}
            </Stack>
            <Container maxWidth='lg' sx={{ pb: 5 }}>
                <Grid container item direction="row" justifyContent="flex-end" alignItems="center" sx={{ pt: 3 }}>
                    <Button style={{ zIndex: 5 }} component={Link} href="/destinations" variant="contained" endIcon={<DoubleArrowIcon />}>ALL DESTINATIONS</Button>
                </Grid>
            </Container>
        </Box>
    );
};

export default Trips;