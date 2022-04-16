import React from 'react';
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonHeroPostCard() {

    return (
            <Paper elevation={3}
                   style={{height: "550px"}}>
                <Skeleton height="100%" style={{transform: "scale(1,1)"}} />
            </Paper>
    );
}