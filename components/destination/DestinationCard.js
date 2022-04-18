import styles from './DestinationCard.module.css';
import React from 'react';
import {Card, CardContent, CardActionArea} from '@mui/material';
import Link from "../../src/Link";

export default function DestinationCard({destination}) {
    return (
        <Link href={"/destinations/" + destination?.slug} underline="none">
            <Card className={styles.dCard} style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url("+destination?.bgImage?.asset?.url+")"}}>
                <CardActionArea key={destination?.slug}>
                    <CardContent sx={{height: 300}}>
                        <div className="dIcon">
                            <div className="dIconBg" style={{backgroundImage: "url("+destination?.icon?.asset?.url+")"}}></div>
                            <div className="dCardTitle">{destination?.name}</div>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>

    );
}