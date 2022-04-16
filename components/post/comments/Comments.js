import React from "react";
import {Parallax} from "react-scroll-parallax";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Moment from "moment";

//Implement but never use, not keen on moderation and would need to figure out how to keep API key secure
export default function Comments({comments = []}) {
    return (
        <>
            {comments && comments.length > 0 && (
                <>
                    <Parallax translateY={['0', '+53']}>
                        <Typography vairant="h1" component="h2" className="sectionHeader"
                                    style={{color: "var(--brand-color", textAlign: "center"}}>
                            {comments.length} Comment{comments.length > 1 ? 's' : ''}
                        </Typography>
                    </Parallax>
                    <List>
                        {comments?.map(({_id, _createdAt, name, comment}) => (
                            <ListItem key={_id} alignItems="flex-start" divider>
                                <ListItemAvatar>
                                    <Avatar alt={name} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<span style={{display: "flex", justifyContent: "space-between"}}>
                                        <Typography component="span">
                                            {name}
                                        </Typography>
                                        <Typography component="span">
                                            {Moment(_createdAt).format('DD MMMM YYYY')}
                                        </Typography>
                                    </span>}
                                    secondary={comment}
                                />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        </>
    )
}