import React from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Parallax} from "react-scroll-parallax";
import DestinationGrid from "./DestinationGrid";

const DestinationsSection = ({destinations}) => {
    return (
        <Box id="destinations" className="section" sx={{py: 5}}>
            <Container maxWidth='lg' disableGutters>
                <Parallax translateY={['0', '+48']}>
                    <Typography vairant="h1" component="h2" className="sectionHeader">
                        Countries.
                    </Typography>
                </Parallax>
                <DestinationGrid destinations={destinations} />
            </Container>
        </Box>
    );
};

export default DestinationsSection;