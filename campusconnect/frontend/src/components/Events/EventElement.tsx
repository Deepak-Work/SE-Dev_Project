import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Tooltip,
  Button
} from "@mui/material";

import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
interface EventProps {
  id: number;
  username: string;
  title: string;
  body: string;
  event_date : string;
  event_time : string;
  time_posted: string;
//   userAvatar: object;
  likes: number;
  dislikes: number;
  // postImage: string;
  // caption: string;
}

/**
 * Event Component
 *
 * This component renders a single Event on the Events page
 */
const EventElement: React.FC<EventProps> = ({
  username,
  title,
  body,
  event_date,
  event_time,
//   userAvatar
}) => {

  const isUserAttending : () => boolean = () => {
    //TODO : Check if current user is attending the event specified in this card...
    return true;
  }

  // Render the post
  return (
      <Card
        sx={{
          border: "3px solid black",
          borderRadius: "15px",
          width: "450px",
          maxWidth: "450px",
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
          subheader={`${username} ~ Event Time: ${event_date} @ ${event_time}`} // The subheader is the post date
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
            <Tooltip title="Attending">
                <Button>{isUserAttending() ? "Un-RSVP" : "RSVP"}</Button>
            </Tooltip>
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

export default EventElement;
