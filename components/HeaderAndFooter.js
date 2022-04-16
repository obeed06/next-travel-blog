import React from 'react';
import TopNavigation from "./TopNavigation";
import Footer from "./Footer";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";

const HeaderAndFooter = props => {
    return (
        <React.Fragment>
            <span id="back-to-top-anchor"></span>
            <TopNavigation postToC={props.postToC}/>
            {props.children}
            <ScrollTop>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
            <Footer/>
        </React.Fragment>
    );
};

function ScrollTop(props) {
    const {children} = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );
        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{position: 'fixed', bottom: 16, right: 16, zIndex: 5}}
            >
                {children}
            </Box>
        </Zoom>
    );
}

export default HeaderAndFooter;