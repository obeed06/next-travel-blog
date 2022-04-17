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

config.autoAddCss = false
library.add(fab, faCheckSquare, faCoffee)

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

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

export default MyApp
