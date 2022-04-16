import './ListTableOfContents.css'
import React, {useState} from 'react';
import useHeadingIntersectionObserver from "../../../hook/useHeadingIntersectionObserver";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

const ListTableOfContents = ({nestedHeadings, idPrefix}) => {
    const [activeId, setActiveId] = useState();
    useHeadingIntersectionObserver(setActiveId);
    return (
        <>
            {nestedHeadings && nestedHeadings.length > 0 ? (
                <List className="postToC" aria-label="Table of contents">
                    {nestedHeadings.map((heading, i) => (
                        <>
                            <ListItem key={idPrefix + "-" + heading.id} disablePadding>
                                <ListItemButton selected={heading.id === activeId} onClick={(e) => {
                                    // e.preventDefault();
                                    document.querySelector(`#${heading.id}`).scrollIntoView({
                                        behavior: "smooth"
                                    });
                                }}>
                                    <ListItemText primary={heading.title}/>
                                </ListItemButton>
                            </ListItem>
                            {heading.items.length > 0 && heading.items.map((child) => (
                                <ListItem key={idPrefix + "-" + child.id} disablePadding>
                                    <ListItemButton selected={child.id === activeId} onClick={(e) => {
                                        // e.preventDefault();
                                        document.querySelector(`#${child.id}`).scrollIntoView({
                                            behavior: "smooth"
                                        });
                                    }} sx={{pl: 2}}>
                                        <ListItemIcon>
                                            <SubdirectoryArrowRightIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={child.title}/>
                                    </ListItemButton>
                                </ListItem>

                            ))}
                        </>
                    ))}
                </List>
            ) : (
                <></>
            )}
        </>);
}

export default ListTableOfContents;