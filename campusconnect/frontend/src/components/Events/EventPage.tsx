import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import formatCount from "../Functions/formatCount";
import Cookies from "js-cookie";

import {
  Box,
  Paper,
  Typography,
  Grid,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";

import theme from "../UI/theme";

import { ThemeProvider } from "@mui/material/styles";

import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import NavBar from "../LandingPage/NavBar";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";
import LoadingIndicator from "../Utils/LoadingIndicator";
import standardTime from "../Functions/standardTime";
import NotAuthorized from "../Utils/NotAuthorized";

interface Props {
  username: string;
  isAuth: boolean;
  loading: boolean;
}

interface EventProps {
  title: string;
  body: string;
  eventDate: string;
  eventTime: string;
  author: string;
  clubId: string;
  clubName: string;
  clubImage: string;
  likes: number;
  dislikes: number;
  timePosted: string;
  totalRSVP: number;
}

const EventPage = (props: Props) => {
  const { username } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventInfo, setEventInfo] = useState<EventProps>({} as EventProps);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [editEventOpen, setEditEventOpen] = useState(false);
  const [deleteEventOpen, setDeleteEventOpen] = useState(false);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [isAttending, setIsAttending] = useState<boolean>(false);

  const fetchEvent = async () => {
    let response = await fetch(`/api/events/event/${id}`, {
      method: "GET",
    });
    if (response.ok) {
      response.json().then((value) => {
        const event = value.event_data;
        const eventInfo: EventProps = {
          title: event.title,
          body: event.body,
          likes: event.likes,
          dislikes: event.dislikes,
          author: event.author,
          clubName: event.club_name,
          clubId: event.club_id,
          clubImage: event.club_image,
          timePosted: event.time_posted,
          eventDate: event.event_date,
          eventTime: event.event_time,
          totalRSVP: event.attendees,
        };
        setEventInfo(eventInfo);
      });
    } else {
      console.log("Event Cannot be Loaded");
    }
  };

  const handleEditEventOpen = () => {
    setAnchorEl(null);
    setEditEventOpen(true);
  };
  const handleEditEventClose = (event? : object, reason?: string) => {
    console.log(event);
    if (reason == "backdropClick") return;
    setEditEventOpen(false);
  };

  const getLikeDislikeStatus = async () => {
    const response = await fetch(`/api/events/event/${id}/like-dislike`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
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
          Authorzation: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsAttending(false);
        console.log("Unattending");
      }
    }
    fetchEvent();
  };

  const handleDeleteEventOpen = () => {
    setDeleteEventOpen(true);
    setAnchorEl(null);
  };
  const handleDeleteEventClose = () => {
    setDeleteEventOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEventClose = async (action: string) => {
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    if (action === "delete") {
      let response = await fetch(`/api/events/event/${id}/delete`, {
        method: "DELETE",
        headers: headers,
      });

      if (response.ok) {
        const data = await response.json();
        const { club_name, club_id } = data;
        navigate(`/club/${club_name}/${club_id}`);
      } else {
        console.log("Event Could Not Be Deleted");
      }
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchEvent();
    getLikeDislikeStatus();
    isUserAttending();
  }, []);

  if (!props.isAuth && !props.loading) {
    return <NotAuthorized />;
  }

  return (
    <>
      {!props.isAuth ? (
        <LoadingIndicator />
      ) : (
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              overflow: "auto",
              minHeight: "100vh",
              alignItems: "flex-start",
              justifyContent: "center",
              flexFlow: "column nowrap",
              backgroundColor: "#1e1e1e",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                overflow: "auto",
                alignItems: "center",
                justifyContent: "center",
                flexFlow: "column nowrap",
                mt: -10,
              }}
            >
              <NavBar username={username} />
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "80vh",
                minWidth: "650px",
                border: "0px white solid",
                padding: 2,
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  ml: 10,
                  borderRadius: "20px",
                  textAlign: "left",
                  minWidth: "350px",
                  width: "20%",
                  overflow: "auto",
                  display: "flex",
                  flexFlow: "row nowrap",
                  border: "5px solid #000000",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "10px",
                    border: "3px solid #000000",
                    height: "10%",
                    width: "100%",
                    backgroundColor: "primary.main",
                    display: "flex",
                    flexFlow: "row nowrap",
                    alignItems: "center",
                    justifyContent: "left",
                    gap: 2,
                    overflow: "auto",
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      width: "100px",
                      height: "100px",
                      border: "4px solid",
                      borderColor: "back.light",
                      borderRadius: "5px",
                      mx: 1,
                      my: 1,
                    }}
                    alt="Club image"
                    src={eventInfo.clubImage}
                  />
                  <Typography
                    ml={0}
                    mt={0}
                    variant="h5"
                    color="white"
                    fontFamily={"Rampart One"}
                    onClick={() =>
                      navigate(
                        `/club/${eventInfo.clubName}/${eventInfo.clubId}`
                      )
                    }
                    sx={{
                      color: "back.light",
                      textDecoration: "underline solid",
                      textDecorationColor: "back.dark",
                      wordBreak: "break-word",
                      cursor: "pointer",
                      "&:hover": { color: "back.main" },
                    }}
                  >
                    {eventInfo.clubName}
                  </Typography>
                </Box>
              </Paper>

              <Box
                sx={{
                  width: "80%",
                  height: "90%",
                  minWidth: "700px",
                  display: "flex",
                  flexFlow: "row nowrap",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "0px solid",
                }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    ml: 10,
                    mt: 2,
                    borderRadius: "20px",
                    textAlign: "left",
                    width: "100%",
                    height: "100%",
                    overflow: "auto",
                    display: "flex",
                    flexFlow: "column nowrap",
                    justifyContent: "space-between",
                    border: "5px solid #000000",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: "10px 10px 0 0",
                      borderTop: "0px solid #000000",
                      borderBottom: "5px solid #000000",
                      borderLeft: "0px solid #000000",
                      borderRight: "0px solid #000000",
                      height: "fit-content",
                      background:
                        "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
                      display: "flex",
                      flexFlow: "column nowrap",
                      justifyContent: "center",
                      alignItems: "left",
                      paddingRight: "10px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      color="white"
                      fontWeight="bold"
                      fontFamily={"Lobster"}
                      sx={{ pt: 1, pl: 3 }}
                    >
                      {eventInfo.title}
                    </Typography>

                    <Typography
                      variant="h5"
                      color="white"
                      fontWeight="bold"
                      fontFamily={"Lobster"}
                      sx={{ pt: 1, pl: 3 }}
                    >
                      {eventInfo.author} -{" Event Time: "}{" "}
                      {eventInfo.eventDate} @{" "}
                      {standardTime(eventInfo.eventTime)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexFlow: "column wrap",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "0px solid",
                      borderColor: "back.dark",
                      borderRadius: "20px",
                      m: 2,
                    }}
                  >
                    <Typography
                      ml={0}
                      mt={0}
                      variant="h6"
                      color="back.dark"
                      fontFamily={"Lobster"}
                      sx={{
                        pt: 1,
                        pl: 3,
                        wordBreak: "break-word",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {eventInfo.body}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      borderRadius: "0 0 10px 10px",
                      borderTop: "5px solid #000000",
                      borderBottom: "0px solid #000000",
                      borderLeft: "0px solid #000000",
                      borderRight: "0px solid #000000",
                      height: "fit-content",
                      background:
                        "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
                      display: "flex",
                      flexFlow: "row nowrap",
                      justifyContent: "space-between",
                      alignItems: "left",
                      padding: "10px",
                    }}
                  >
                    <Box sx={{ display: "flex", flexFlow: "row wrap" }}>
                      <Button
                        onClick={handleLike}
                        sx={{
                          display: "flex",
                          margin: 2,
                          border: "2px solid",
                          borderColor: "back.dark",
                          borderRadius: "10px",
                          backgroundColor: "back.light",
                          "&:hover": { backgroundColor: "secondary.light" },
                        }}
                      >
                        <IconButton aria-label="Like post">
                          {isLiked ? (
                            <ThumbUpAltIcon sx={{ color: "primary.main" }} />
                          ) : (
                            <ThumbUpAltIcon />
                          )}
                        </IconButton>
                        <Typography
                          color="primary.main"
                          fontWeight="bold"
                          fontFamily={"Lobster"}
                          sx={{}}
                        >
                          Like{" "}
                        </Typography>

                        <Box
                          sx={{
                            color: "back.light",
                            border: "2px solid black",
                            mx: 1,
                            p: 1,
                            borderRadius: "10px",
                            backgroundColor: "primary.main",
                          }}
                        >
                          <Typography
                            color="back.dark"
                            fontWeight="bold"
                            fontFamily={"Lobster"}
                            sx={{ color: "back.light" }}
                          >
                            {formatCount(eventInfo.likes)}
                          </Typography>
                        </Box>
                      </Button>

                      <Button
                        onClick={handleDislike}
                        sx={{
                          display: "flex",
                          margin: 2,
                          border: "2px solid",
                          borderColor: "back.dark",
                          borderRadius: "10px",
                          backgroundColor: "back.light",
                          "&:hover": { backgroundColor: "secondary.light" },
                        }}
                      >
                        <IconButton aria-label="dislike post">
                          {isDisliked ? (
                            <ThumbDownIcon sx={{ color: "primary.main" }} />
                          ) : (
                            <ThumbDownIcon />
                          )}
                        </IconButton>
                        <Typography
                          color="primary.main"
                          fontWeight="bold"
                          fontFamily={"Lobster"}
                          sx={{}}
                        >
                          Dislike{" "}
                        </Typography>

                        <Box
                          sx={{
                            color: "back.light",
                            border: "2px solid black",
                            mx: 1,
                            p: 1,
                            borderRadius: "10px",
                            backgroundColor: "primary.main",
                          }}
                        >
                          <Typography
                            color="back.dark"
                            fontWeight="bold"
                            fontFamily={"Lobster"}
                            sx={{ color: "back.light" }}
                          >
                            {formatCount(eventInfo.dislikes)}
                          </Typography>
                        </Box>
                      </Button>
                      <Button
                        onClick={() => handleAttending()}
                        sx={{
                          display: "flex",
                          margin: 2,
                          border: "2px solid",
                          borderColor: "back.dark",
                          borderRadius: "10px",
                          backgroundColor: "back.light",
                          "&:hover": { backgroundColor: "secondary.light" },
                        }}
                      >
                        <IconButton aria-label="dislike post">
                          {isAttending ? (
                            <ReceiptLongIcon sx={{ color: "primary.main" }} />
                          ) : (
                            <ReceiptLongIcon />
                          )}
                        </IconButton>
                        <Typography
                          color="primary.main"
                          fontWeight="bold"
                          fontFamily={"Lobster"}
                          sx={{}}
                        >
                          RSVPs{" "}
                        </Typography>

                        <Box
                          sx={{
                            color: "back.light",
                            border: "2px solid black",
                            mx: 1,
                            p: 1,
                            borderRadius: "10px",
                            backgroundColor: "primary.main",
                          }}
                        >
                          <Typography
                            color="back.dark"
                            fontWeight="bold"
                            fontFamily={"Lobster"}
                            sx={{ color: "back.light" }}
                          >
                            {formatCount(eventInfo.totalRSVP)}
                          </Typography>
                        </Box>
                      </Button>
                    </Box>

                    <Tooltip title="Options">
                      <Button
                        onClick={handleClick}
                        sx={{
                          display: "flex",
                          margin: 2,
                          border: "2px solid",
                          borderColor: "back.light",
                          borderRadius: "10px",
                          "&:hover": { backgroundColor: "secondary.light" },
                        }}
                      >
                        <IconButton
                          aria-label="more"
                          aria-controls="three-dotted-menu"
                          aria-haspopup="true"
                          size="large"
                        >
                          <MoreHorizIcon sx={{ color: "white" }} />
                        </IconButton>
                      </Button>
                    </Tooltip>

                    <Menu
                      id="three-dotted-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => handleEventClose("")}
                    >
                      <MenuItem onClick={() => handleEditEventOpen()}>
                        <Typography fontFamily={"Lobster"}>
                          Edit Event
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleDeleteEventOpen();
                        }}
                      >
                        <Typography fontFamily={"Lobster"}>
                          Delete Event
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </Paper>
              </Box>

              <EditEvent
                editEventOpen={editEventOpen}
                handleEditEventClose={handleEditEventClose}
              />
              <DeleteEvent
                deleteEventOpen={deleteEventOpen}
                handleDeleteEventClose={handleDeleteEventClose}
                handleEventClose={handleEventClose}
              />
              <Grid item></Grid>
            </Box>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
};

export default EventPage;
