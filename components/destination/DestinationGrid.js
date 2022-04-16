import React from 'react';
import Container from "@mui/material/Container";
import DestinationCard from "./DestinationCard";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileDestinationCard from "./MobileDestinationCard";
import SkeletonDestinationCard from "./SkeletonDestinationCard";

const DestinationGrid = ({destinations}) => {
    const matches = useMediaQuery('(min-width:656px)');

    return (
        matches ? (
            <Container maxWidth='lg'>
                <Grid container direction="row" justifyContent="flex-start"
                      spacing={2} sx={{position: "relative"}}>
                    {
                        destinations ?
                            (
                                destinations.map((destination, i) => (
                                    <Grid sm={6} md={4} lg={3} item key={i}><DestinationCard destination={destination}/></Grid>

                                ))
                            ) : (
                                <React.Fragment>
                                    {
                                        [...Array(16)].map((e, i) => (
                                            <Grid sm={6} md={4} lg={3} item key={"skeleton-c-" + i}>
                                                <SkeletonDestinationCard/>
                                            </Grid>
                                        ))
                                    }
                                </React.Fragment>
                            )
                    }
                </Grid>
            </Container>
        ) : (
            <Grid container direction="column" justifyContent="flex-start" alignItems="stretch"
                  sx={{position: "relative"}}>
                {destinations &&
                destinations.map((post, i) => (
                    <Grid item key={"mobile-destination-" + i}><MobileDestinationCard post={post}/></Grid>
                ))}
            </Grid>
        )
    );
};

export default DestinationGrid;