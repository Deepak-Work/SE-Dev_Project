import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Tooltip,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MoreIcon from '@mui/icons-material/More';


declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    custom: true;
  }
}

interface EventProps {
  id: number;
  username: string;
  name: string;
  description: string;
  event_date: string;
  event_time: string;
  time_posted?: string;
  likes?: number;
  dislikes?: number;
  // postImage: string;
  // caption: string;
  //   userAvatar: object;
}

const StandardTime: (time: string) => string = (time: string) => {
  const date = new Date();
  date.setHours(
    parseInt(time.substring(0, 2)),
    parseInt(time.substring(3, 5)),
    parseInt(time.substring(6))
  );
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

/**
 * Event Component
 *
 * This component renders a single Event on the Events page
 */
const EventElement: React.FC<EventProps> = ({
  id,
  username,
  name,
  description,
  event_date,
  event_time,
  likes,
  dislikes,
  //   userAvatar
}) => {
  
  const navigate = useNavigate();
  const [attendingCount, setAttendingCount] = useState<number>(0);

  const isUserAttending: () => boolean = () => {
    //TODO : Check if current user is attending the event specified in this card...
    return true;
  };

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
        title={name} // The title is the username of the user
        titleTypographyProps={{
          onClick: () => navigate("/"),
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
        subheader={`Event Time: ${event_date} @ ${StandardTime(event_time)}`} // The subheader is the post date
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
          sx={{
            fontFamily: "Lobster",
            color: "back.light",
            border: "2px solid",
            borderColor: "back.light",
            borderRadius: "20px",
            padding: 2,
            overflowWrap: "break-word",
          }}
        >
          {description}
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
          <Box sx={{ display: "flex", flexFlow: "row wrap" }}>
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
                sx={{ userSelect: "none", py: 1 }}
                fontFamily={"Lobster"}
              >
                {likes}
              </Typography>
              <Tooltip title="Like">
                <IconButton aria-label="like post">
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
                <IconButton aria-label="dislike post">
                  <ThumbDownIcon sx={{ color: "back.light" }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box
            sx={{
              color: "back.light",
              display: "flex",
              flexFlow: "row wrap",
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
              {attendingCount}
            </Typography>
            <Tooltip title="Attending">
              <IconButton>
                <ReceiptLongIcon sx={{ color: "back.light" }} />
              </IconButton>
            </Tooltip>
            <Button
              sx={{
                fontFamily: "Lobster",
                border: "2px solid",
                borderColor: "back.light",
                borderRadius: "20px",
              }}
            >
              {isUserAttending() ? "Un-RSVP" : "RSVP"}
            </Button>
          </Box>
          <Box>
          <Tooltip title="More">
                <IconButton aria-label="more">
                  <MoreIcon sx={{ color: "back.light" }} />
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

export default EventElement;
