import styles from './MapPlaceholder.module.css';
import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";

const MapPlaceholder = ({data, loadMap} ) => {
    const [state, setState] = useState({
        raised:false,
    });
    return (
        <Box sx={{height: '500', width: '100%', position: 'relative', zIndex: 4}} id="mapHolder">
            <img className={styles.mapPlaceholder}
                 src={data?.asset?.url}
                 loading="lazy"
                 alt="travel map placeholder"/>
            <div className={styles.overlay}
                 onMouseOver={()=>setState({ raised: true})}
                 onMouseOut={()=>setState({ raised:false })}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: '100%' }}
                >
                    <IconButton classes={{root: state.raised ? styles.iconHovered : ""}}
                                raised={state.raised.toString()}
                                color="inherit"
                                onClick={()=> loadMap()}
                    >
                        <TravelExploreRoundedIcon className={styles.placeholderIcon}/>
                    </IconButton>
                </Grid>

            </div>
        </Box>
    );
};

export default MapPlaceholder;