import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MapPlaceholder from "./MapPlaceholder";
import {Parallax, useParallaxController} from "react-scroll-parallax";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    mapSection: {
        "&::before": {
            backgroundColor: theme.palette.background.default,
        }

    },
}));

const ItineraryMap = ({itinerary, bgOverride}) => {
    const classes = useStyles();
    const [isMapLoaded, setIsMapLoaded] = useState(false)
    const parallaxController = useParallaxController();

    const handleLoad = () => parallaxController.update();


    return (
        <Box id="mapSection" className={[classes.mapSection, "section"]}  sx={{py: 5}}
             style={bgOverride ? {backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url("+bgOverride?.asset?.url+")"} : {}}>
            <Parallax translateY={['0', '+48']}>
                <Container maxWidth='lg'>
                    <Typography vairant="h1" component="h2" className="sectionHeader">
                        Map.
                    </Typography>
                </Container>
            </Parallax>
            <Container maxWidth="lg">
                {
                    !isMapLoaded ? <MapPlaceholder data={itinerary?.placeholder} loadMap={() => {
                            setIsMapLoaded(true);
                        }}/> :
                        <iframe title="embedded-travel-map" src={itinerary?.iframeLink} style={{position: "relative", zIndex: 4}}
                                onLoad={handleLoad}
                                width="100%" height="500"/>
                }
            </Container>
        </Box>
    );
};

export default ItineraryMap;