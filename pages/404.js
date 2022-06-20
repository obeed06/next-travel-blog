import HeaderAndFooter from "../components/HeaderAndFooter";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";

export default function FourOhFour() {
    return  <>
        <HeaderAndFooter>
            <Container maxWidth='md' sx={{pt: 10, textAlign: "center"}}>
                <Typography vairant="h1" component="h2" className="sectionHeader myStoryHeader brandColor" >
                    404
                </Typography>
                <Box sx={{py: 5}} className="postContent">
                    <p>You&apos;re in the wrong place! In life that's fine, but here there&apos;s nothing to do :/</p>
                    <p>Lets go <Link href="/" underline="none">Home</Link>.</p>
                </Box>
            </Container>
        </HeaderAndFooter>
    </>
}