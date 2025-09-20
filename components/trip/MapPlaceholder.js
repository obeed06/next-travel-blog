import styles from './MapPlaceholder.module.css';
import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import Img from "next/image";
import { useNextSanityImage } from 'next-sanity-image';
import { sanityClient } from "../../lib/sanity";

const myCustomImageBuilder = (imageUrlBuilder, options) => {
    return imageUrlBuilder
        .width(options.width || Math.min(options.originalImageDimensions.width, 800))
};

const MapPlaceholder = ({ data, loadMap }) => {
    const [state, setState] = useState({
        raised: false,
    });
    const imageProps = useNextSanityImage(
        sanityClient,
        data?.placeholder,
    );
    return (
        <Box sx={{ height: '500', width: '100%', position: 'relative', zIndex: 4 }} id="mapHolder">
            {imageProps && (
                <Img
                    className={styles.mapPlaceholder}
                    {...imageProps}
                    alt={data.placeholder?.alt || "travel map placeholder"}
                    sizes="(max-width: 800px) 100vw, 800px"
                    style={{
                        width: "100%",
                        height: "auto"
                    }} />
            )}
            <div className={styles.overlay}
                onMouseOver={() => setState({ raised: true })}
                onMouseOut={() => setState({ raised: false })}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: '100%' }}
                >
                    <IconButton classes={{ root: state.raised ? styles.iconHovered : "" }}
                        raised={state.raised.toString()}
                        color="inherit"
                        onClick={() => loadMap()}
                    >
                        <TravelExploreRoundedIcon className={styles.placeholderIcon} />
                    </IconButton>
                </Grid>
            </div>
        </Box>
    );
};

export default MapPlaceholder;