import React from 'react';
import {Card} from '@mui/material';
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonPostCard() {
    return (
            <Card sx={{height: '300px'}}>
                    <Skeleton sx={{ height: "100%" }} variant="rectangular" />
            </Card>
    );
}