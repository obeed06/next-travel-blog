import '../styles/globals.css'
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {useEffect, useState} from "react";
import {lightTheme, darkTheme} from '../src/theme';
import {ParallaxProvider} from "react-scroll-parallax";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function getActiveTheme(themeMode: 'light' | 'dark') {
  return themeMode === 'light' ? lightTheme : darkTheme;
}

function MyApp({ Component, pageProps }) {
  const [activeTheme, setActiveTheme] = useState(lightTheme);
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const desiredTheme = selectedTheme=== 'light' ? 'dark' : 'light';
    setSelectedTheme(desiredTheme);
  }

  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme))
  }, [selectedTheme]);
  return (
      <ThemeProvider theme={activeTheme} >
        <ParallaxProvider>
          <Component {...pageProps} toggleTheme={toggleTheme} selectedTheme={selectedTheme}/>
        </ParallaxProvider>
      </ThemeProvider>
  );
}

export default MyApp
