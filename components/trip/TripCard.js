import React, { useState } from 'react';
import Grow from "@mui/material/Grow";
import Typography from "@mui/material/Typography";
import { Card, CardMedia, CardContent, CardActionArea } from '@mui/material';

export default function TripCard({ slugPrefix, item, checked, timeout = 1 }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Grow in={checked} {...(checked ? { timeout: 500 * timeout } : {})}>
            <Card
                sx={{
                    transition: "transform 0.15s ease-in-out",
                    minWidth: 250,
                    background: 'rgba(0,0,0,0.5)',
                    transform: isHovered ? "scale3d(1.05, 1.05, 1)" : "scale3d(1, 1, 1)",
                }}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
                raised={isHovered}
            >
                <CardActionArea href={slugPrefix + item.slug} key={item.slug}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image={item.thumbnail.asset.url}
                        alt={item.thumbnail.alt}
                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h4"
                            sx={{
                                fontFamily: 'var(--font-heading-primary)',
                                color: '#fff',
                            }}
                        >
                            {item.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            sx={{
                                fontFamily: 'var(--font-heading-primary)',
                                color: '#ddd',
                            }}
                        >
                            {item.tagline}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grow>
    );
}