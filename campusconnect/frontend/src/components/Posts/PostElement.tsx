import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

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


// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import MoreIcon from '@mui/icons-material/More';

interface PostProps {
  username: string;
  title: string;
  body: string;
  time_posted: string;
  likes: number;
  dislikes: number;
  totalComments: number;
  post_id: number;
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
  post_id,
  likes,
  dislikes,
  totalComments
}) => {

  const navigate = useNavigate()

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);

  const getLikeDislikeStatus = async () => {
    console.log("Checking Like Status");
    const response = await fetch(`/api/posts/post/like-dislike/${post_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorzation: `Bearer ${Cookies.get("token")}`,
      },
    });
    if (response.ok) {
      response.json().then((value) => {
        console.log(value);
        setIsLiked(value.like_status);
        setIsDisliked(value.dislike_status);
      });
    }
    console.log(isLiked, isDisliked);
  }
  
  const handleLike = async () => {
    if (!isLiked) {
      const response = await fetch(`/api/posts/post/${post_id}/like`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorzation: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsLiked(true);
        console.log("Liked");
      }
    }
    else {
      const response = await fetch(`/api/posts/post/${post_id}/unlike`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorzation: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsLiked(false);
        console.log("Unliked");
      }
    }
  }

  const handleDislike = async () => {
    if (!isDisliked) {
      const response = await fetch(`/api/posts/post/${post_id}/dislike`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorzation: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsDisliked(true);
        console.log("Disliked");
      }
    }
    else {
      const response = await fetch(`/api/posts/post/${post_id}/undislike`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorzation: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsDisliked(false);
        console.log("Undisliked");
      }
  }
}
  useEffect(() => {
    getLikeDislikeStatus();
  })

  const handlePostClick = async(event: React.MouseEvent<HTMLDivElement>) =>{
    event.preventDefault();

    console.log("Direct to post page")

    console.log(post_id)

    navigate(`/post/${post_id}`)
    
  }

  // Render the post
  return (
    <Card
      sx={{
          border: "3px solid black",
        borderRadius: "35px",
        // width: "450px",
        // maxWidth: "450px",
        textWrap: "balance",
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
        titleTypographyProps={{
          onClick: () => navigate(`/post/${post_id}`),
          sx: {
            fontFamily: "Lobster",
            color: "secondary.contrast",
            cursor: "pointer",
            textDecoration: "underline",
            textDecorationColor: "back.dark",
            textDecorationThickness: "3px",
            "&:hover": { color: "back.light" },
          },
        }}
        subheader={`${username} - ${time_posted}`} // The subheader is the post date
        subheaderTypographyProps={{ sx: { fontFamily: "Lobster" } }}
        sx={{ backgroundColor: "secondary.main" }}
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
      <CardContent sx={{ backgroundColor: "back.dark", color: "back.light" }}>
        <Typography
          variant="body2"
          fontFamily={"Lobster"}
          sx={{
            color: "back.light",
            border: "2px solid",
            borderColor: "back.light",
            borderRadius: "20px",
            padding: 2,
            overflowWrap: "break-word",
          }}
        >
            {body.length < 50 ? body : body.substring(0, 60) + "..."}
          </Typography>

          {/* Reactions */}
        <CardActions
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            mt: 2,
            mb: -2,
            ml: -2,
          }}
        >
          <Box sx={{ display: "flex", flexFlow: "row wrap", columnGap:1}}>
            <Box
              sx={{
                display: "flex",
                flexFlow: "row nowrap",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                component="h6"
                variant="h6"
                fontFamily={"Lobster"}
                sx={{ userSelect: "none", py: 1 }}
              >
                {likes}
              </Typography>
            <Tooltip title="Like">
              <IconButton onClick={handleLike} aria-label="like post">
                  <ThumbUpAltIcon sx={{ color: "back.light" }} />
              </IconButton>
            </Tooltip>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexFlow: "row nowrap",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                component="h6"
                variant="h6"
                fontFamily={"Lobster"}
                sx={{ userSelect: "none", py: 1 }}
              >
                {dislikes}
              </Typography>
            <Tooltip title="Dislike">
              <IconButton onClick={handleDislike} aria-label="dislike post">
                  <ThumbDownIcon sx={{ color: "back.light" }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Box               sx={{
                display: "flex",
                flexFlow: "row nowrap",
                alignContent: "center",
                justifyContent: "center",
              }}>
            <Typography
                component="h6"
                variant="h6"
                fontFamily={"Lobster"}
                sx={{ userSelect: "none", py: 1 }}
              >
                {totalComments}
              </Typography>
              <Tooltip title="Comments">
                <IconButton aria-label="total comments">
                  <CommentOutlinedIcon sx={{ color: "back.light" }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box>
          <Tooltip title="More">
                <IconButton aria-label="more">
                  <MoreIcon sx={{ color: "back.light" }} />
              </IconButton>
            </Tooltip>            
          </Box>
          </CardActions>

          {/* Additional Options */}
            

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