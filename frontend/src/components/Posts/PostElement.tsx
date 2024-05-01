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
  Avatar,
} from "@mui/material";

// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import MoreIcon from "@mui/icons-material/More";
import logo from "../../assets/CampusConnectLogo.svg";

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
  totalComments,
}) => {
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [postInfo, setPostInfo] = useState<PostProps>({} as PostProps);
  const fetchPost = async () => {
    let response = await fetch(`/api/posts/post/${post_id}`, {
      method: "GET",
    });
    if (response.ok) {
      response.json().then((value) => {
        const posts = value.post_data;
        const postInfo: PostProps = {
          username: posts.author,
          body: posts.body,
          title: posts.title,
          likes: posts.likes,
          dislikes: posts.dislikes,
          totalComments: posts.total_comments,
          time_posted: posts.time_posted,
          post_id: posts.id,
        };
        setPostInfo(postInfo);
      });
    } else {
      console.log("Post cannot be loaded");
    }
  };

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
    // fetchPost();
  };

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
    } else {
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
    fetchPost();
  };

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
    } else {
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
    fetchPost();
  };
  useEffect(() => {
    fetchPost();
    getLikeDislikeStatus();
  }, []);

  const handlePostClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    console.log("Direct to post page");

    console.log(post_id);

    navigate(`/post/${post_id}`);
  };

  // Render the post
  return (
    <Card
      sx={{
        //  display:"flex",
        border: "3px solid",
        borderColor: "back.dark",
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
        //     src={logo}
        //     alt={username} // The alt text is the username of the user
        //     sx={{border:"1px solid", borderColor:"back.dark", borderRadius:"20px", backgroundColor: "back.light",}}
        //   />
        // }
        
        color="white"
        title={title} // The title is the username of the user
        titleTypographyProps={{
          onClick: () => navigate(`/post/${post_id}`),
          sx: {
            fontFamily: "Lobster",
            color: "back.light",
            cursor: "pointer",
            textDecoration: "underline",
            textDecorationColor: "back.dark",
            textDecorationThickness: "3px",
            "&:hover": { color: "back.dark" },
          },
        }}
        subheader={`${username} - ${time_posted}`} // The subheader is the post date
        subheaderTypographyProps={{
          sx: { color: "back.light", fontFamily: "Lobster" },
        }}
        sx={{
          // minWidth: "30%",maxWidth:"35%",
          backgroundColor: "secondary.main",
        }}
      />

      <CardContent
        sx={{
          backgroundColor: "back.main",
          color: "back.dark",
        }}
      >
        <Typography
          variant="body2"
          fontFamily={"Lobster"}
          fontSize="1.25rem"
          sx={{
            color: "back.dark",
            border: "2px solid",
            borderColor: "back.dark",
            borderRadius: "20px",
            backgroundColor: "back.light",
            padding: 2,
            overflowWrap: "break-word",
          }}
        >
          {body.length < 50 ? body : body.substring(0, 50) + "..."}
        </Typography>

        {/* Reactions */}
        <CardActions
          sx={{
            width: "100%",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            mt: 2,
            mb: -2,
            ml: 0,
            border: "2px solid",
            borderRadius: "20px",
            backgroundColor: "back.light",
          }}
        >
          <Box sx={{ display: "flex", flexFlow: "row nowrap", columnGap: 1 }}>
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
                sx={{ color: "primary.main", userSelect: "none", py: 1 }}
              >
                {postInfo.likes}
              </Typography>
              <Tooltip title="Like">
                <IconButton onClick={handleLike} aria-label="like post">
                  {isLiked ? <ThumbUpAltIcon sx={{ color: "primary.main" }} /> : <ThumbUpAltIcon sx={{ color: "back.dark" }} /> }
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
                sx={{ color: "primary.main", userSelect: "none", py: 1 }}
              >
                {postInfo.dislikes}
              </Typography>
              <Tooltip title="Dislike">
                <IconButton onClick={handleDislike} aria-label="dislike post">
                {isDisliked ? <ThumbDownIcon sx={{ color: "primary.main" }} /> : <ThumbDownIcon sx={{ color: "back.dark" }} /> }
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex", flexFlow: "row nowrap", columnGap: 1 }}>
              <Typography
                component="h6"
                variant="h6"
                fontFamily={"Lobster"}
                sx={{ color: "primary.main", userSelect: "none", py: 1 }}
              >
                {totalComments}
              </Typography>
              <Tooltip title="Comments">
                <IconButton aria-label="total comments">
                  <CommentOutlinedIcon sx={{ color: "back.dark" }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title="More">
                <IconButton aria-label="more">
                  <MoreIcon sx={{ color: "back.dark" }} />
                </IconButton>
              </Tooltip>
            </Box>
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
