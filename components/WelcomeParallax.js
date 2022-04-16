import styles from './WelcomeParallax.module.css'
import * as React from 'react';
import Typography from "@mui/material/Typography";
import {ParallaxBanner} from "react-scroll-parallax";
import useMediaQuery from "@mui/material/useMediaQuery";

const WelcomeParallax = () => {
    const matches = useMediaQuery('(min-width:700px)');

    const background = {
        image: '/assets/desert-background.jpg',
        translateY: [0, 50],
        opacity: [1, 0.3],
        scale: [1.05, 1, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true
    };

    const headline = {
        translateY: [0, 50],
        scale: [1, 1.05, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true,
        expanded: false,
        children: (
            <div className={`${styles.inset} ${styles.center}`} style={{top: "-45vh"}}>
                <Typography vairant="h1" component="h2" className={matches ? styles.headline : styles.mobileHeadline}>
                    WELCOME
                </Typography>
            </div>
        )
    };

    const headline2 = {
        translateY: [0, 35],
        scale: [1, 1.05, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true,
        expanded: false,
        children: (
            <div className={`${styles.inset} ${styles.center}`}>
                <Typography vairant="h1" component="h2" className={`${styles.subHeadline} brandColor`}>
                    WHERE'S OBEE
                </Typography>
            </div>
        )
    };

    const foreground = {
        image: '/assets/desert-foreground.webp',
        translateY: [0, 15],
        scale: [1, 1.1, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true
    };

    const gradientOverlay = {
        opacity: [0, 1, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true,
        expanded: false,
        children: <div className={`${styles.inset} ${styles.gradient}`}/>
    };

    return (
        <ParallaxBanner
            layers={[background, headline, foreground, headline2, gradientOverlay]}
            className={styles.full}
        />
    );
};

export default WelcomeParallax;