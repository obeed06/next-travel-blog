import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MapPlaceholder from "./MapPlaceholder";
import { Parallax, useParallaxController } from "react-scroll-parallax";

const ItineraryMap = ({ itinerary, bgOverride = null }) => {
    const [isMapLoaded, setIsMapLoaded] = useState(false)
    const parallaxController = useParallaxController();
    const handleLoad = () => parallaxController.update();

    const backgroundStyle = bgOverride
        ? { backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(${bgOverride?.asset?.url})` }
        : {};

    return (
        <Box
            id="mapSection"
            className="section"
            sx={{
                py: 5,
                '&::before': {
                    backgroundColor: 'background.default',
                },
                ...backgroundStyle
            }}
        >
            <Parallax translateY={['0', '+48']}>
                <Container maxWidth='lg'>
                    <Typography variant="h1" component="h2" className="sectionHeader">
                        Map.
                    </Typography>
                </Container>
            </Parallax>
            <Container maxWidth="lg">
                {
                    !isMapLoaded ? <MapPlaceholder data={itinerary} loadMap={() => {
                        setIsMapLoaded(true);
                    }} /> :
                        <iframe title="embedded-travel-map" src={itinerary?.iframeLink} style={{ position: "relative", zIndex: 4 }}
                            onLoad={handleLoad}
                            width="100%" height="500" />
                }
            </Container>
        </Box>
    );
};

export default ItineraryMap;