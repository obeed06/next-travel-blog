import './Trips.module.css';
import React from 'react';
import TripCard from "./TripCard";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Parallax} from "react-scroll-parallax";
import {makeStyles} from "@mui/styles";
import Button from "@mui/material/Button";
import Link from '../../src/Link';
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme) => ({
    tripsSection: {
        "&::before": {
            backgroundColor: theme.palette.background.default,
        }
    },
}));

const Trips = ({trips}) => {
    const classes = useStyles();
    const checked = true;//useWindowPosition("trips")
    if (!trips) return <div>Loading...</div>;
    // let sectionBGUrl = trips[0]?.thumbnail.asset.url;

    return (
        <Box id="trips" className={[classes.tripsSection, "tripsSection", "section"]} sx={{py: 5}}>
            <Box>
                <Container maxWidth='lg'>
                    <Parallax translateY={['0', '+55']}>
                        <Typography vairant="h1" component="h2" className="sectionHeader">
                            TRIPS.
                        </Typography>
                    </Parallax>
                </Container>
            </Box>
            <Stack direction="row" spacing={2} className="cardXScroll" sx={{pt:1, px: 5, position: "relative", zIndex: "3"}}>
                {trips && trips.map((trip, i) => {
                    return <TripCard key={i} slugPrefix="/trip/" item={trip} checked={checked}/>
                })}
            </Stack>
            <Container maxWidth='lg' sx={{pb: 5}}>
                <Grid container item direction="row" justifyContent="flex-end" alignItems="center" sx={{pt: 3}}>
                    <Button style={{zIndex: 5}} component={Link} to="/destinations" variant="contained" endIcon={<DoubleArrowIcon/>}>ALL DESTINATIONS</Button>
                </Grid>
            </Container>
        </Box>
    );
};

export default Trips;