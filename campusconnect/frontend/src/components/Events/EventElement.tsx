import React, { useEffect, useState } from "react";
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
import Cookies from "js-cookie";

import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MoreIcon from "@mui/icons-material/More";
import standardTime from "../Functions/standardTime";

// declare module "@mui/material/IconButton" {
//   interface IconButtonPropsColorOverrides {
//     custom: true;
//   }
// }

interface EventProps {
  id: number;
  username: string;
  title: string;
  body: string;
  event_date: string;
  event_time: string;
  // time_posted: string;
  likes: number;
  dislikes: number;
  total_RSVP: number;
}

const EventElement: React.FC<EventProps> = ({
  id,
  username,
  title,
  body,
  event_date,
  event_time,
  // total_RSVP,
  //   userAvatar
}) => {
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [isAttending, setIsAttending] = useState<boolean>(false);
  const [eventInfo, setEventInfo] = useState<EventProps>({} as EventProps);

  const fetchEvent = async () => {
    let response = await fetch(`/api/events/event/${id}`, {
      method: "GET",
    });
    if (response.ok) {
      response.json().then((value) => {
        const event = value.event_data;
        const eventInfo: EventProps = {
          username: event.author,
          body: event.body,
          title: event.title,
          likes: event.likes,
          dislikes: event.dislikes,
          event_date: event.event_date,
          event_time: event.event_time,
          total_RSVP: event.attendees,
          id: event.id,
        };
        setEventInfo(eventInfo);
      });
    } else {
      console.log("Event cannot be loaded");
    }
  };

  const getLikeDislikeStatus = async () => {
    console.log("Checking Like Status");
    const response = await fetch(`/api/events/event/${id}/like-dislike`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorzation: `Bearer ${Cookies.get("token")}`,
      },
    });
    if (response.ok) {
      response.json().then((value) => {
        setIsLiked(value.like_status);
        setIsDisliked(value.dislike_status);
      });
    }
  };

  const handleLike = async () => {
    if (!isLiked) {
      const response = await fetch(`/api/events/event/${id}/like`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsLiked(true);
        console.log("Liked");
      }
    } else {
      const response = await fetch(`/api/events/event/${id}/unlike`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsLiked(false);
        console.log("Unliked");
      }
    }
    fetchEvent();
  };

  const handleDislike = async () => {
    if (!isDisliked) {
      const response = await fetch(`/api/events/event/${id}/dislike`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsDisliked(true);
        console.log("Disliked");
      }
    } else {
      const response = await fetch(`/api/events/event/${id}/undislike`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsDisliked(false);
        console.log("Undisliked");
      }
    }
    fetchEvent();
  };

  const isUserAttending: () => Promise<void> = async () => {
    const response = await fetch(`/api/events/event/${id}/attending-status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    if (response.ok) {
      response.json().then((value) => {
        setIsAttending(value.attending_status);
      });
    }
  };

  const handleAttending = async () => {
    if (!isAttending) {
      const response = await fetch(`/api/events/event/${id}/attend`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsAttending(true);
        console.log("Attending");
      }
    } else {
      const response = await fetch(`/api/events/event/${id}/unattend`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsAttending(false);
        console.log("Unattending");
      }
    }
    fetchEvent();
  };

  useEffect(() => {
    fetchEvent();
    getLikeDislikeStatus();
    isUserAttending();
  }, []);

  return (
    <Card
      sx={{
        border: "3px solid",
        borderRadius: "35px",
        borderColor: "back.dark",
        textWrap: "balance",
      }}
    >
      <CardHeader
        title={title}
        titleTypographyProps={{
          onClick: () => navigate(`/event/${id}`),
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
        subheader={`${username} - Event Time: ${event_date} @ ${standardTime(
          event_time
        )}`}
        subheaderTypographyProps={{
          sx: { color: "back.light", fontFamily: "Lobster" },
        }}
        sx={{ backgroundColor: "secondary.main" }}
      />

      <CardContent sx={{ backgroundColor: "back.main", color: "back.dark" }}>
        <Typography
          variant="body2"
          fontFamily="Lobster"
          fontSize="1.25rem"
          sx={{
            backgroundColor: "back.light",
            color: "back.dark",
            border: "2px solid",
            borderColor: "back.dark",
            borderRadius: "20px",
            padding: 2,
            overflowWrap: "break-word",
          }}
        >
          {body.length < 50 ? body : body.substring(0, 50) + "..."}
        </Typography>

        <CardActions
          sx={{
            backgroundColor: "back.light",
            display: "flex",
            border: "2px solid",
            borderColor: "back.dark",
            borderRadius: "20px",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            mt: 2,
            mb: -2,
            ml: 0,
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
                sx={{ color: "primary.main", userSelect: "none", py: 1 }}
                fontFamily={"Lobster"}
              >
                {eventInfo.likes}
              </Typography>
              <Tooltip title="Like">
                <IconButton onClick={handleLike} aria-label="like post">
                  {isLiked ? (
                    <ThumbUpAltIcon sx={{ color: "primary.main" }} />
                  ) : (
                    <ThumbUpAltIcon sx={{ color: "back.dark" }} />
                  )}
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
                {eventInfo.dislikes}
              </Typography>
              <Tooltip title="Dislike">
                <IconButton onClick={handleDislike} aria-label="dislike post">
                  {isDisliked ? (
                    <ThumbDownIcon sx={{ color: "primary.main" }} />
                  ) : (
                    <ThumbDownIcon sx={{ color: "back.dark" }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box
            sx={{
              color: "back.light",
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                color: "back.light",
                display: "flex",
                flexFlow: "row nowrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                component="h6"
                variant="h6"
                fontFamily={"Lobster"}
                sx={{ color: "primary.main", userSelect: "none", py: 1 }}
              >
                {eventInfo.total_RSVP}
              </Typography>
              <Tooltip title="Attending">
                <IconButton>
                  {isAttending ? (
                    <ReceiptLongIcon sx={{ color: "primary.main" }} />
                  ) : (
                    <ReceiptLongIcon sx={{ color: "back.dark" }} />
                  )}
                </IconButton>
              </Tooltip>
              {isAttending ? (
                <Button
                  onClick={() => handleAttending()}
                  sx={{
                    fontFamily: "Lobster",
                    border: "5px inset",
                    borderColor: "back.dark",
                    borderRadius: "20px",
                    px: 1,
                  }}
                >
                  Un-RSVP
                </Button>
              ) : (
                <Button
                  onClick={() => handleAttending()}
                  sx={{
                    fontFamily: "Lobster",
                    border: "5px outset",
                    borderColor: "back.dark",
                    borderRadius: "20px",
                  }}
                >
                  RSVP
                </Button>
              )}
            </Box>
            <Tooltip title="More">
              <IconButton aria-label="more">
                <MoreIcon sx={{ color: "back.dark" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default EventElement;
