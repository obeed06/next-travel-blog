import * as React from 'react';
import styles from './TopNavigation.module.css'
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from '../src/Link';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import Chip from "@mui/material/Chip";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

const pages = [{
    title: 'Destinations',
    href: '/destinations'
}, {
    title: 'Blog',
    href: '/posts'
}, {
    title: 'About',
    href: '/about'
}];

const drawerWidth = 240;

function HideOnScroll(props) {
    const {children} = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const TopNavigation = props => {
    const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
    // const container = window !== undefined ? () => window.document.body : undefined;

    const handleMobileNavDrawerToggle = () => {
        setMobileNavOpen(!mobileNavOpen);
    };

    const mobileNavDrawer = (
        <>
            <Toolbar/>
            <Divider/>
            <List sx={{flexGrow: 1, height: "100%"}}>
                {pages.map((page, index) => (
                    <ListItemButton key={"mobile-nav-" + page.title}>
                        <Link href={page.href} underline="none"><ListItemText primary={page.title}/></Link>
                    </ListItemButton>
                ))}
            </List>
            <Divider/>
            <IconButton sx={{ml: 1}} onClick={props.toggleTheme as any} color="inherit">
                <Chip icon={props.selectedTheme === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                      label={props.selectedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}/>
            </IconButton>
        </>
    );


    return (
        <React.Fragment>
            <CssBaseline/>
            <HideOnScroll>
                <AppBar className={styles.appbar} elevation={0}>
                    <Toolbar className={styles.appbarWrapper} disableGutters sx={{
                        flexDirection: {xs: 'row', md: 'row'},
                        justifyContent: {xs: 'center', md: 'flex-start'}
                    }}>
                        {/*Desktop Logo*/}
                        <Link sx={{mr: 2, display: {xs: 'none', md: 'flex'}}} href="/"><img
                            style={{height: "65px", width: "65px"}}
                            src={'/assets/logo-with-title.png'} alt="logo with title"/></Link>

                        {/*Mobile hamburger icon*/}
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}, alignSelf: {xs: 'flex-start'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMobileNavDrawerToggle}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Box>

                        {/*Desktop links*/}
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    key={"desktop-nav-" + page.title}
                                    href={page.href}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page.title}
                                </Button>
                            ))}
                        </Box>

                        {/*Mobile Logo*/}
                        <Link sx={{
                            display: {xs: 'flex', md: 'none'},
                            position: {xs: 'absolute', md: ''},
                            top: {xs: '25px', md: ''}
                        }} href="/">
                            <img style={{height: "65px", width: "65px"}}
                                 src={'/assets/logo-with-title.png'}
                                 alt="logo with title"/>
                        </Link>

                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <SwipeableDrawer
                    // container={container}
                    variant="temporary"
                    open={mobileNavOpen}
                    onOpen={handleMobileNavDrawerToggle}
                    onClose={handleMobileNavDrawerToggle}
                    disableSwipeToOpen={false}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', md: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {mobileNavDrawer}
                </SwipeableDrawer>
            </Box>
            {props?.postToC}

        </React.Fragment>
    );
}

export default TopNavigation;