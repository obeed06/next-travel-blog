import styles from './DestinationCard.module.css';
import React from 'react';
import {Card, CardContent, CardActionArea} from '@mui/material';

export default function DestinationCard({destination}) {
    return (
        <Card className={styles.dCard} style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url("+destination?.bgImage?.asset?.url+")"}}>
            <CardActionArea href={"/destination/" + destination?.slug?.current} key={destination?.slug?.current}>
                <CardContent sx={{height: 300}}>
                    <div className={styles.dIcon}>
                        <div className={styles.dIconBg} style={{backgroundImage: "url("+destination?.icon?.asset?.url+")"}}></div>
                        <div className={styles.dCardTitle}>{destination?.name}</div>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}