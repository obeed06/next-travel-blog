import React from 'react';
import {Card, CardContent} from '@mui/material';
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonPostCard() {
    return (
            <Card sx={{minWidth: 250, height: '100%'}}>
                    <Skeleton sx={{ height: 190 }} variant="rectangular" />
                    <CardContent>
                        <React.Fragment>
                            <Skeleton height={10} width="15%" />
                            <Skeleton height={30} />
                        </React.Fragment>
                        <Divider sx={{my: 1}} style={{borderColor: "rgba(255, 255, 255, 0.15)"}}/>
                        <Skeleton height={10} />
                    </CardContent>
            </Card>
    );
}