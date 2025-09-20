import '../styles/globals.css'
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from '../src/theme';
import createEmotionCache from "../src/createEmotionCache";
import ColorModeContext from "../src/ColorModeContext";
import { CacheProvider } from "@emotion/react";
import Head from "next/head";
import PropTypes from 'prop-types';
import * as gtag from '../lib/gtag'
import { useRouter } from "next/router";
import Script from "next/script";
import '../lib/fontawesome';

config.autoAddCss = false
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
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

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedMode = localStorage.getItem("mode");

        if (storedMode !== null) {
            setDarkMode(storedMode === "true");
        } else {
            const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setDarkMode(prefersDarkMode);
        }
    }, []);

    const _setDarkMode = (newmode) => {
        localStorage.setItem("mode", newmode);
        setDarkMode(newmode);
    };
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <style>
                    @import
                    url('https://fonts.googleapis.com/css2?family=Bungee&family=Bungee+Outline&family=Nunito+Sans:wght@900&family=Roboto:wght@100;300&family=Teko:wght@700&display=swap');
                </style>
            </Head>
            <ColorModeContext.Provider value={{ darkMode, setDarkMode: _setDarkMode }}>
                <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                    <CssBaseline />
                    <ParallaxProvider>
                        <Script
                            strategy="afterInteractive"
                            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
                        />
                        <Script
                            id="gtag-init"
                            strategy="afterInteractive"
                            dangerouslySetInnerHTML={{
                                __html: `
                                        window.dataLayer = window.dataLayer || [];
                                        function gtag(){dataLayer.push(arguments);}
                                        gtag('js', new Date());
                                        gtag('config', '${gtag.GA_TRACKING_ID}', {
                                          page_path: window.location.pathname,
                                        });
                                  `,
                            }}
                        />
                        <Component {...pageProps} />
                    </ParallaxProvider>
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