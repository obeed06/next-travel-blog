import '../styles/globals.css'
import {ThemeProvider} from "@mui/material/styles";
import React, {useEffect, useState} from "react";
import {ParallaxProvider} from "react-scroll-parallax";
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {faCheckSquare, faCoffee} from '@fortawesome/free-solid-svg-icons'
import {CssBaseline} from "@mui/material";
import {useMediaQuery} from "@mui/material";
import {lightTheme, darkTheme} from '../src/theme';
import createEmotionCache from "../src/createEmotionCache";
import ColorModeContext from "../src/ColorModeContext";
import {CacheProvider} from "@emotion/react";
import {PortableTextComponentsProvider} from "@portabletext/react";
import DefaultBlockContent from "../components/DefaultBlockContent";
import Head from "next/head";
import PropTypes from 'prop-types';
import * as gtag from '../lib/gtag'
import {useRouter} from "next/router";
import Script from "next/script";

config.autoAddCss = false
library.add(fab, faCheckSquare, faCoffee)

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        router.events.on('hashChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
            router.events.off('hashChangeComplete', handleRouteChange)
        }
    }, [router.events])
    // Set dark mode based on media query
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [darkMode, setDarkMode] = useState(prefersDarkMode);

    useEffect(() => {
        const mode = localStorage.getItem("mode") === "true";
        // set mode
        setDarkMode(mode);
    }, []);

    // useEffect(() => {
    //   console.log(`set localStore ${darkMode}`);
    //   localStorage.setItem("mode", darkMode);
    // }, [darkMode]);
    const _setDarkMode = (newmode) => {
        localStorage.setItem("mode", newmode);
        setDarkMode(newmode);
    };
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <style>
                    @import
                    url(&#39;https://fonts.googleapis.com/css2?family=Bungee&family=Bungee+Outline&family=Nunito+Sans:wght@900&family=Roboto:wght@100;300&family=Teko:wght@700&display=swap&#39;);
                </style>
            </Head>
            <ColorModeContext.Provider value={{darkMode, setDarkMode: _setDarkMode}}>
                <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                    <CssBaseline/>
                    <PortableTextComponentsProvider components={DefaultBlockContent}>
                        <ParallaxProvider>
                            <Component {...pageProps} />
                        </ParallaxProvider>
                    </PortableTextComponentsProvider>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </CacheProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};