import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import ListTableOfContents from "./ListTableOfContents";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {styled} from "@mui/material/styles";
import {grey} from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import useIntersectionObserver from "../../../hook/useIntersectionObserver";
import Slide from "@mui/material/Slide";

const drawerWidth = 250;
const drawerBleeding = 54;

styled('div')(({theme}) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));
const StyledBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({theme}) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));


const TableOfContentsDrawer = ({nestedHeadings, intersectTopRef, intersectBottomRef}) => {
    const [mOpen, setMOpen] = React.useState(false);
    const toggleMobileDrawer = (newOpen) => () => {
        setMOpen(newOpen);
    };

    const entryTop = useIntersectionObserver(intersectTopRef, {})
    const entryBottom = useIntersectionObserver(intersectBottomRef, {})

    let belowTop = !entryTop?.isIntersecting && entryTop?.boundingClientRect.top < 0
    let aboveBottom = entryBottom?.isIntersecting
    const isVisible = belowTop && aboveBottom
    if (mOpen && !isVisible)
        setMOpen(isVisible)
    return (
        <>
            {nestedHeadings && nestedHeadings?.length > 0 && (
                <>
                    {/*Mobile*/}
                    <span className="mobile-post-toc">
                        <SwipeableDrawer
                            anchor="bottom"
                            open={mOpen}
                            onClose={toggleMobileDrawer(false)}
                            onOpen={toggleMobileDrawer(true)}
                            swipeAreaWidth={isVisible ? drawerBleeding : 0}
                            disableSwipeToOpen={false}
                            sx={{
                                display: {xs: '', md: 'none'},
                                '& .MuiPaper-root': {height: `calc(50% - ${drawerBleeding}px)`, overflow: 'visible',},

                            }}
                            ModalProps={{
                                keepMounted: true,
                            }}
                        >
                            <Slide direction="up" in={isVisible}>
                                <StyledBox
                                    sx={{
                                        position: 'absolute',
                                        top: -drawerBleeding,
                                        borderTopLeftRadius: 8,
                                        borderTopRightRadius: 8,
                                        visibility: 'visible',
                                        right: 0,
                                        left: 0,
                                    }}
                                >
                                    <Puller/>
                                    <Typography sx={{p: 2, color: 'text.secondary'}}>Table of Contents</Typography>
                                </StyledBox>
                            </Slide>

                            <StyledBox
                                sx={{
                                    px: 2,
                                    pb: 2,
                                    height: '100%',
                                    overflow: 'auto',
                                }}
                            >
                                <ListTableOfContents nestedHeadings={nestedHeadings} idPrefix="desktop"/>
                            </StyledBox>
                        </SwipeableDrawer>
                    </span>


                    {/*Desktop*/}
                    <Drawer
                        anchor="right"
                        variant="persistent"
                        open={isVisible}
                        sx={{
                            display: {xs: 'none', md: 'block'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                        }}
                    >
                        <Box role="presentation">
                            <Toolbar/>
                            <Divider/>
                            <ListTableOfContents nestedHeadings={nestedHeadings} idPrefix="mobile"/>
                        </Box>
                    </Drawer>
                </>
            )}
        </>
    );
}

export default TableOfContentsDrawer;