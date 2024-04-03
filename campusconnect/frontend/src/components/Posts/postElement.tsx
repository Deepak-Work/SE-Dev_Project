import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Tooltip,
} from "@mui/material";

// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

// import Cookies from "js-cookie";

interface PostProps {
  username: string;
  title: string;
  body: string;
  time_posted: string;
  likes: number;
  dislikes: number;
  post_id: string;
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
  post_id
}) => {

  const navigate = useNavigate()

  const handlePostClick = async(event: React.MouseEvent<HTMLDivElement>) =>{
    event.preventDefault();

    console.log("Direct to post page")

    console.log(post_id)

    // const data = new FormData(event.currentTarget)


    navigate(`/posts/${post_id}`)


    // const headers = {
    //         "Content-Type": "application/json",
    //         "X-CSRFToken": Cookies.get("csrftoken") || "",
    //       };
      
    //       const response: Response = await fetch('/api/posts/$}', {
    //         method: "DELETE",
    //         headers: headers,
    //         // body: JSON.stringify(form),
    //       });
          
    //       if (response.ok) {
    //         // handleCreatePostClose();
    //         window.location.reload();
    //         console.log("Post Deleted Successfully");
    //       } else {
    //         console.log("Post deletion failed");
    //       }
          
    //       console.log('Deleting post');
    
  }

  // const handleClose = async (action : string) => {
  //   if (action === 'delete') {
  //     // Perform deletion logic here
  //     // const form: DeletePost = {name: name as string,
  //     //   id: id as string,
  //     // };
  //     const headers = {
  //       "Content-Type": "application/json",
  //       "X-CSRFToken": Cookies.get("csrftoken") || "",
  //     };
  
  //     const response: Response = await fetch("/api/posts/delete", {
  //       method: "DELETE",
  //       headers: headers,
  //       // body: JSON.stringify(form),
  //     });
      
  //     if (response.ok) {
  //       // handleCreatePostClose();
  //       window.location.reload();
  //       console.log("Post Deleted Successfully");
  //     } else {
  //       console.log("Post deletion failed");
  //     }
      
  //     console.log('Deleting post');


  //   }
  //   if (action === 'edit') {
  //     // Perform deletion logic here
  //     console.log('Editing post');
  //   }
  //   setAnchorEl(null);
  // };

  // Render the post
  return (
    <div id = {post_id} onClick={handlePostClick}>
      <Card sx={{
          border: "3px solid black",
          borderRadius: "15px",
          width: "450px",
          maxWidth: "450px",
          textWrap: "balance"
        }}>
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
          subheader={`Posted on ${time_posted} by ${username}`} // The subheader is the post date
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
          <Typography variant="body2"  sx={{ overflowWrap: "break-word" }}>
            {body}
          </Typography>

          {/* Reactions */}
          <CardActions sx={{ mt: 2, mb: -2, ml: -2 }}>
            <Tooltip title="Like">
              <IconButton aria-label="like post">
                <ThumbUpAltIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Dislike">
              <IconButton aria-label="dislike post">
                <ThumbDownIcon />
              </IconButton>
            </Tooltip>            
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
      </Card></div>
  );
};

export default PostElement;
