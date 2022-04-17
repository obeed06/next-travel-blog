import React from 'react';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Link from "../../src/Link";

export default function MobileDestinationCard({post: destination}) {
    return (
        <Link href={"/destinations/" + destination.slug} key={destination.slug} underline="none" style={{width: "100%"}}>
            <Paper elevation={0} square className="mobilePostCard"
                   style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0) 65%, black), url(" + destination?.bgImage?.asset?.url + ")"}}>
                <Stack direction="column" justifyContent="flex-end" alignItems="center" spacing={1} style={{height: "80%"}}>
                    <div className="dIcon">
                        <div className="dIconBg" style={{backgroundImage: "url("+destination?.icon?.asset?.url+")"}}></div>
                        <div className="dCardTitle">{destination.name}</div>
                    </div>

                </Stack>
            </Paper>
        </Link>
    );
}