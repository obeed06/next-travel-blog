import React from 'react';
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

export default function PostTags({post, tagSize = "x-small"}) {
    let categories = post?.categories
    let destinationNames = post?.destinations && post?.destinations.map(d => d.name)
    if (tagSize === "x-small" || tagSize === "small") {
        if (Array.isArray(categories))
            categories = categories.slice(0, 1)
        if (Array.isArray(destinationNames))
            destinationNames = destinationNames.slice(0, 1)
    }
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }}
               divider={<Divider style={{marginLeft: "5px", marginRight: "5px"}} orientation="vertical" flexItem/>}
               sx={{alignItems: "center"}}
               className="postCardTags">
            {categories && categories.map((category, i) =>
                (category ? (
                    <span key={"tag-category-" + category.title + i}
                          style={category?.colourHex ? {
                              color: category?.colourHex,
                              fontSize: tagSize
                          } : {fontSize: tagSize}}>
                                {category?.title}
                    </span>
                ) : (
                    ""
                ))
            )}
            {destinationNames && destinationNames.map((destinationName, i) =>
                (destinationName ? (
                    <span key={"tag-destination-" + destinationName.title + i} style={{fontSize: tagSize}}>
                                {destinationName}
                            </span>
                ) : (
                    ""
                ))
            )}
        </Stack>
    );
}