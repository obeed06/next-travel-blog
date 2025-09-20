import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DefaultBlockContent from "../components/DefaultBlockContent";
import { PortableText } from "@portabletext/react";
import HeaderAndFooter from "../components/HeaderAndFooter";
import { getPrivacyNotice } from "../lib/privacyApi";

export default function About({ privacyNotice, preview }) {
    return (
        <>
            <HeaderAndFooter>
                {privacyNotice ? (
                    <Container maxWidth='md' sx={{ pt: 5 }}>
                        <Typography vairant="h1" component="h2" className="sectionHeader myStoryHeader brandColor" >
                            {privacyNotice.title}
                        </Typography>
                        <Box sx={{ py: 5 }} className="postContent">
                            <PortableText value={privacyNotice.content}
                                components={DefaultBlockContent} />
                        </Box>
                    </Container>
                ) : (
                    ""
                )}
            </HeaderAndFooter>
        </>
    );
};

export async function getStaticProps({ preview = false }) {
    const privacyNotice = await getPrivacyNotice(preview)
    console.log(privacyNotice)
    return {
        props: { privacyNotice, preview },
        revalidate: 1
    }
}