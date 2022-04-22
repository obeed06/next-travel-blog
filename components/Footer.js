import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import ColorModeContext from "../src/ColorModeContext";
import {useTheme} from "@mui/styles";
import Link from "../src/Link";

const Footer = () => {
    const theme = useTheme();
    const { darkMode, setDarkMode } = useContext(ColorModeContext);
    return (
        <Box className="siteFooter" sx={{ width: '100%' }}>
            <Grid container direction="row" justifyContent="space-around"  spacing={{xs: 1, md: 3}} sx={{py:5}}>
                <Grid item>
                    <h6 style={{textAlign: "center"}}>QUICK LINKS</h6>
                    <List dense={true}>
                        <ListItem key="footer-link-about"><Link href="/about" underline="none">About Me</Link></ListItem>
                        <ListItem key="footer-link-privacy"><Link href="/privacy" underline="none">Privacy</Link></ListItem>
                        <ListItem key="footer-link-destinations"><Link href="/destinations" underline="none">Destinations</Link></ListItem>
                        <ListItem key="footer-link-blog"><Link href="/posts" underline="none">Blog</Link></ListItem>
                    </List>
                </Grid>
                <Grid item>
                    <h6 style={{textAlign: "center"}}>STAY CONNECTED</h6>
                    <IconButton href="https://github.com/obeed06" target="_blank"><FontAwesomeIcon icon={['fab', 'github']}/></IconButton>
                    <IconButton href="https://www.instagram.com/wheresobee/" target="_blank"><FontAwesomeIcon icon={['fab', 'instagram']}/></IconButton>
                    <IconButton href="https://www.facebook.com/david.obee" target="_blank"><FontAwesomeIcon icon={['fab', 'facebook']}/></IconButton>
                    <IconButton href="https://www.linkedin.com/in/david-obee-49153941" target="_blank"><FontAwesomeIcon icon={['fab', 'linkedin']}/></IconButton>
                    <IconButton href="https://twitter.com/davidobee" target="_blank"><FontAwesomeIcon icon={['fab', 'twitter']}/></IconButton>
                    <IconButton href="https://www.youtube.com/channel/UCrG29-sOLEvxYbNqTtuJhrg" target="_blank"><FontAwesomeIcon icon={['fab', 'youtube']}/></IconButton>
                </Grid>
            </Grid>
            <Divider/>
            <Grid container direction="row" columns={2} justifyContent="space-around" sx={{pt:2}}>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
                    <span>
                        2022 - Developed by
                    </span>
                    <Tooltip title="David Obee">
                        <Avatar alt="David Obee" src={'/assets/avatar.jpg'} style={{display: "inline-block"}} sx={{ width: 24, height: 24, mx: 1}}/>
                    </Tooltip>
                </Stack>
                <Grid item>
                    <IconButton sx={{ ml: 1 }} onClick={() => setDarkMode(!darkMode)} color="inherit">
                        <Chip icon={theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />} label={theme.palette.mode === "dark" ? 'Light Mode' : 'Dark Mode'} />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;