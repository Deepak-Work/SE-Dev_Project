import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
interface PostProps {
  username: string;
  title: string;
  body: string;
  time_posted: string;
  likes: number;
  dislikes: number;
  // userAvatar: string;
  // postImage: string;
  // caption: string;
}

/**
 * Post Component
 *
 * This component renders a single post on the posts page
 */
const PostElement: React.FC<PostProps> = ({
  username,
  title,
  body,
  time_posted,
  likes,
  dislikes
}) => {

  const navigate = useNavigate();
  // Render the post
  return (
    <Card
      sx={{
        border: "3px solid black",
        borderRadius: "15px",
        // width: "450px",
        // maxWidth: "450px",
        textWrap: "balance"
      }}
    >
      {/* Post Header */}
      <CardHeader
        // The avatar of the user who posted the post
        // avatar={
        //   <Avatar
        //     src={userAvatar}
        //     alt={username} // The alt text is the username of the user
        //   />
        // }
        color="white"
        title={title} // The title is the username of the user
        titleTypographyProps={{ onClick: () => navigate("/"), sx: { cursor: "pointer", textDecoration: "underline", "&:hover": { color: "primary.main" } } }}
        subheader={`${username} ~ ${time_posted}`} // The subheader is the post date
      />
      {/* Post Image */}
      {/* <CardMedia
        // The image of the post
        component="img"
        height="300" // The height of the post image
        // image={postImage} // The URL of the post image
        alt="Post Image" // The alt text of the post image
      /> */}

      {/* Post Caption */}
      <CardContent>
        <Typography variant="body2" sx={{ overflowWrap: "break-word" }}>
          {body}
        </Typography>

        {/* Reactions */}
        <CardActions sx={{ mt: 2, mb: -2, ml: -2 }}>

          <Box sx={{display:"flex", flexFlow: "row nowrap", alignContent: "center", justifyContent: "center"}}>
          <Typography component="h6" variant="h6" sx={{ userSelect: "none", py: 1}}>{likes}</Typography>
            <Tooltip title="Like">
              <IconButton aria-label="like post">
                <ThumbUpAltIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{display:"flex", flexFlow: "row nowrap", alignContent: "center", justifyContent: "center"}}>
          <Typography  component="h6" variant="h6" sx={{ userSelect:"none", py: 1}}>{dislikes}</Typography>
          <Tooltip title="Dislike">
            <IconButton aria-label="dislike post">
              <ThumbDownIcon />
            </IconButton>
          </Tooltip>
          </Box>


        </CardActions>

        {/* Comments */}
        {/* <CardContent sx={{ mt: 2 }}>
          <Typography variant="h6">Comments</Typography>
          <TextField
            fullWidth
            multiline
            variant="outlined"
            placeholder="Add a comment"
          /> */}

        {/* Comments List */}
        {/* <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={userAvatar} alt={username} />
              </ListItemAvatar>
              <ListItemText primary={username} secondary="This is a test comment" />
            </ListItem>
          </List> */}
        {/* </CardContent> */}
      </CardContent>
    </Card>
  );
};

export default PostElement;
