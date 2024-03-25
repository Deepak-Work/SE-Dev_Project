import React from 'react';
import { Avatar, Card, CardHeader, CardContent, CardMedia, Typography, CardActions, IconButton, TextField, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import {ThumbUpAltIcon, ThumbDownIcon} from '@material-ui/icons';
interface PostProps {
  username: string;
  userAvatar: string;
  postImage: string;
  caption: string;
}

/**
 * Post Component
 * 
 * This component renders a single post on the posts page
 */
const Post: React.FC<PostProps> = ({ username, userAvatar, postImage, caption }) => {
  // Render the post
  return (
    <Card>
      {/* Post Header */}
      <CardHeader
        // The avatar of the user who posted the post
        avatar={
          <Avatar 
            src={userAvatar} 
            alt={username} // The alt text is the username of the user
          />
        }
        title={username} // The title is the username of the user
        subheader="Posted on January 1, 2022" // The subheader is the post date
      />
      {/* Post Image */}
      <CardMedia
        // The image of the post
        component="img"
        height="300" // The height of the post image
        image={postImage} // The URL of the post image
        alt="Post Image" // The alt text of the post image
      />

      {/* Post Caption */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {caption} // The caption of the post
        </Typography>

        {/* Reactions */}
        <CardActions sx={{ mt: 2 }}>
          <IconButton aria-label="like post">
            <ThumbUpAltIcon />
          </IconButton>
          <IconButton aria-label="dislike post">
            <ThumbDownIcon/>
          </IconButton>
        </CardActions>

        {/* Comments */}
        <CardContent sx={{ mt: 2 }}>
          <Typography variant="h6">Comments</Typography>
          <TextField
            fullWidth
            multiline
            variant="outlined"
            placeholder="Add a comment"
          />

          {/* Comments List */}
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={userAvatar} alt={username} />
              </ListItemAvatar>
              <ListItemText primary={username} secondary="This is a test comment" />
            </ListItem>
          </List>
        </CardContent>
      </CardContent>
    </Card>
  );
};


export default Post;
