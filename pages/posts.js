import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import PostsGrid from "../components/post/PostsGrid";
import Typography from "@mui/material/Typography";
import { getAllPosts } from "../lib/postApi";
import HeaderAndFooter from "../components/HeaderAndFooter";
import { getCategories } from "../lib/categoryApi";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import Meta from "../components/Meta";

const Posts = ({ posts, categories, preview }) => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [q, setQ] = useState("");
    const [qType, setQType] = useState("");
    const router = useRouter()

    const handleTabChange = (e, newValue) => {
        setSelectedCategory(newValue);
        if (newValue === "All")
            setQ("");
        else {
            setQ(newValue);
            setQType(e.target.dataset.type)
        }
    };

    useEffect(() => {
        const category = router.query.category
        if (category && Array.isArray(categories) && categories.some(cat => cat.title?.toLowerCase() === category.toLowerCase())) {
            setSelectedCategory(category)
            setQType("category")
            setQ(category)
        }
    }, [categories, router.query, setQ, setQType, setSelectedCategory]);


    const postFilter = (
        <Container maxWidth='lg' sx={{ pt: 10 }}>
            <Typography vairant="h1" component="h2" className="sectionHeader" sx={{ pt: 10, textAlign: "center" }}>
                Posts.
            </Typography>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item size={{ xs: 12, md: 8 }}>
                    <FormControl fullWidth>
                        <OutlinedInput
                            onChange={(e) => {
                                setSelectedCategory("All");
                                setQType("search")
                                setQ(e.target.value);
                            }}
                            endAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                            placeholder="Search for a post"
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Tabs value={selectedCategory}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab key="all-categories" label="All" value="All" />
                <Divider sx={{ mx: 1 }} orientation="vertical" variant="middle" flexItem />
                {
                    categories && categories.map((c, i) => <Tab data-type="category" key={c?.title + "-filter"}
                        value={c?.title}
                        label={c?.title} sx={{ color: c?.colourHex }} />)
                }
            </Tabs>
            <Divider />
        </Container>
    )

    return <>
        <Meta title={"Read about my travels | Where's Obee Blog"} />
        <HeaderAndFooter>
            {postFilter}
            <Box id="postsSection" className="section" sx={{ pb: 5 }}>
                <PostsGrid postsData={searchPosts(posts, q, qType)} checked={true} />
            </Box>
        </HeaderAndFooter>
    </>
};


function searchPosts(posts, q, qType) {
    if (!q || !posts)
        return posts

    return posts.filter((item) => {
        if (qType === "search")
            return ["title"].some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });

        if (qType === "category")
            return item && Array.isArray(item?.categories) && item.categories.find(el => el.title.toLowerCase() === q.toLowerCase());

        return item
    });
}

export async function getStaticProps({ preview = false }) {
    const posts = await getAllPosts(preview)
    const categories = await getCategories(preview)
    return {
        props: { posts, categories, preview },
        revalidate: 1
    }
}

export default Posts
