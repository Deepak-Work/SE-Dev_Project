import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  List,
  ListItem,
  PaletteOptions,
  Button,
} from "@mui/material";

import Cookies from "js-cookie";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import CreateIcon from "@mui/icons-material/Create";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import NavBar from "../LandingPage/NavBar";
import PostElement from "../Posts/PostElement";
import CreatePost from "../Posts/CreatePost";
import CreateEvent from "../Events/CreateEvent";
import EventElement from "../Events/EventElement";
import Members from "./Members";

interface Props {
  username: string;
  isAuth: boolean;
}
interface ClubInfo {
  name: string;
  description: string;
  location: string;
  email: string;
  pnum: string;
  website: string;
  memberCount: string;
  image?: string;

  members: any[];
  posts: any[];
  events: any[];
  // auditLog: any[];
}

interface Post {
  id: number;
  username: string;
  title: string;
  body: string;
  time_posted: string;
  author: string;
  likes: number;
  dislikes: number;
}

interface Event {
  id: number;
  name: string;
  description: string;
  event_date: string;
  event_time: string;
  time_posted: string;
  author: string;
  likes: number;
  dislikes: number;
}

interface CustomPaletteOptions extends PaletteOptions {
  back?: {
    main: string;
    light?: string;
    dark?: string;
    contrastText?: string;
  };
}

const convertDate = (date: Date) => {
  // TODO: Fix this

  return date.toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

const ClubPage = (props: Props) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#7108d8",
      },
      secondary: {
        main: "#8B139C",
      },
      back: {
        main: "#ced4da",
        light: "#fff",
        dark: "#000",
        contrastText: "purple",
      },
    } as CustomPaletteOptions,
  });

  const { name, id } = useParams();

  const [clubExists, setClubExists] = useState(false);
  const [clubInfo, setClubInfo] = useState<ClubInfo>({} as ClubInfo);

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [events, setEvents] = useState<Event[] | null>(null);
  const [followed, setFollowed] = useState(false);


  // Create a Post Modal
  const [createPostOpen, setCreatePostOpen] = useState(false);

  const handleCreatePostOpen = () => setCreatePostOpen(true);
  const handleCreatePostClose = (event?: object, reason?: string) => {
    if(reason == "backdropClick")
      return;
    setCreatePostOpen(false);
  }

  // Create an Event Modal
  const [createEventOpen, setCreateEventOpen] = useState(false);

  const handleCreateEventOpen = () => setCreateEventOpen(true);
  const handleCreateEventClose = () => setCreateEventOpen(false);

  // Create a Members list Modal
  const [membersOpen, setMembersOpen] = useState<boolean>(false);
  const handleMembersOpen: () => void = () => setMembersOpen(true);
  const handleMembersClose: () => void = () => setMembersOpen(false);

  // // Explore Modal
  // const [exploreOpen, setExploreOpen] = useState<boolean>(false);

  // const handleExploreOpen: () => void = () => setExploreOpen(true);
  // const handleExploreClose: () => void = () => setExploreOpen(false);

  // CreatePostsDisplay
  // const createPostsDisplay = (posts_data: any) => {
  //   const PostsComponent = posts_data.map((post: any) => (
  //     <ListItem key={post.id}>
  //       <PostElement
  //         username={post.author}
  //         title={post.title}
  //         body={post.body}
  //         time_posted={convertDate(new Date(post.time_posted))}
  //         likes={post.likes}
  //         dislikes={post.dislikes}
  //       />
  //     </ListItem>
  //   ));
  //   const final = <List sx={{ ml: 0 }}>{PostsComponent}</List>;
  //   setPosts(final);
  // };

  // CreatePostsDisplay
  //  const createEventsDisplay = (events_data: any) => {
  //   const EventsComponent = events_data.map((event: any) => (
  //     <ListItem key={event.id}>
  //       <EventElement
  //         id={event.id}
  //         username={event.author}
  //         name={event.name}
  //         description={event.description}
  //         event_time={event.event_time}
  //         event_date={event.event_date}
  //         // likes={event.likes}
  //         // dislikes={event.dislikes}
  //       />
  //     </ListItem>
  //   ));
  //   const final = <List sx={{ ml: 0 }}>{EventsComponent}</List>;
  //   setEvents(final);
  // };

  const getFollowStatus = async () => {
    console.log("Checking Follow Status");
    const response: Response = await fetch(
      `/api/clubs/follow-status/${name}/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    if (response.ok) {
      response.json().then((value) => {
        setFollowed(value.follow_status);
      })
    }
    console.log(followed);
  };

  const ToggleFollow: (
    clubName: string | undefined,
    clubID: string | undefined
  ) => Promise<void> = async (clubName, clubID) => {
    const response = await fetch(
      `/api/clubs/follow-status/${clubName}/${clubID}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      response.json().then(async (value) => {
        if (followed) {
          const followResponse = await fetch(
            `/api/clubs/unfollow/${clubName}/${clubID}`,
            {
              method: "GET",
            }
          );

          if (followResponse.ok) {
            setFollowed(false);
            // setMemberUpdated({})
          } else {
            console.log("Follow Status: true - " + response.status);
          }
        } else {
          const followResponse = await fetch(
            `/api/clubs/follow/${clubName}/${clubID}`,
            {
              method: "GET",
            }
          );

          if (followResponse.ok) {
            setFollowed(true);
          } else {
            console.log("Follow Status: false - " + response.status);
          }
        }
      });
    }
  };

  useEffect(() => {
    let fetchClub = async () => {
      let response = await fetch(`/api/clubs/${name}/${id}`, {
        method: "GET",
      });
      if (response.ok) {
        setClubExists(true);
        response.json().then((value) => {
          const club_data = value.club_data;
          const posts = value.posts;
          const events = value.events;
          const clubInfo: ClubInfo = {
            name: club_data.name,
            description: club_data.description,
            location: club_data.location,
            email: club_data.email,
            pnum: club_data.contact,
            website: club_data.website,
            memberCount: club_data.member_count,
            posts: posts,
            events: events,
            image: club_data.image,
            members: club_data.followers,
          };
          console.log(clubInfo);
          setPosts(posts);
          setEvents(events);
          setClubInfo(clubInfo);
        });
      } else {
        setClubExists(false);
        console.log("ce: " + clubExists + " " + response.status);
      }
    };
    fetchClub();
    getFollowStatus();
    console.log("club exists:" + clubExists);
    console.log("auth: " + props.isAuth);
  }, [followed]);

  return (
    <>
      {!clubExists || !props.isAuth ? (
        <p>
          The club does not exist or you are not authorized to view this page.
        </p>
      ) : (
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              overflow: "auto",
              minHeight: "100vh",
              alignItems: "center",
              flexDirection: "column",
              background:
                "linear-gradient(to right, #a68bf0, #8e63d5, #7d3ebd);",
            }}
          >
            <NavBar username={props.username} />
            <Paper
              elevation={3}
              sx={{
                mt: 15,
                borderRadius: "20px",
                textAlign: "left",
                // width: "1000px",
                height: "90vh",
                maxHeight: "800px",
                minWidth: "600px",
                width: "60%",
                overflow: "auto",
                display: "flex",
                flexFlow: "column nowrap",
                border: "5px solid #000000",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Box
                sx={{
                  borderRadius: "10px 10px 0 0",
                  border: "2px solid #000000",
                  borderBottom: "5px solid #000",
                  minHeight: "150px",
                  background:
                    "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
                  display: "flex",
                  flexFlow: "row nowrap",
                  alignItems: "left",
                  // pb: 10,
                  // paddingRight: "10px",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "30%",
                    height: "80%",
                    borderRadius: "5px",
                    mx: 2,
                    my: 1,
                  }}
                  // alt="Club image"
                  src={clubInfo.image}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexFlow: "column nowrap",
                    alignItems: "left",
                    justifyContent: "left",
                    width:"100%",
                    // columnGap:2,

                  }}
                >
                  <Box sx={{width : "100%" , minHeight: "25%", overflow:"auto", scrollbarColor:"#8B139C #7108d8", scrollbarWidth:"thin"}}>
                  <Typography ml={2} variant="h5" color="white" fontFamily={"RampartOne"} sx={{ whiteSpace:"pre-line", wordBreak:"break-word" }}>
                    {clubInfo.name}
                  </Typography>
                  </Box>
                  <Box sx={{width : "100%" , overflow:"auto", scrollbarColor:"#8B139C #7108d8", scrollbarWidth:"thin"}}>
                  <Typography ml={2} variant="subtitle1" color="white" fontFamily={"Lobster"} sx={{ whiteSpace:"pre-line", wordBreak:"break-word" }}>
                    {clubInfo.description}
                  </Typography>
                  </Box>
                  <Box>
                  <Typography ml={2} variant="subtitle1" color="white" fontFamily={"Lobster"}>
                    Members: {clubInfo.memberCount}
                  </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "10px",
                    }}
                  >
                    <Tooltip title={followed? "Unfollow Club" : "Follow Club"}>
                      <IconButton
                        onClick={() => ToggleFollow(name, id)}
                        sx={{ color: "white" }}
                      >
                        {followed? <RemoveCircleIcon/>: <AddCircleIcon />}
                      </IconButton>
                    </Tooltip>
                                            {/* <Button
                          key={id}
                          sx={{
                            backgroundColor: "primary.main",
                            color: "back.light",
                            border: "2px solid #000",
                            borderRadius: "20px",
                            "&:hover": { backgroundColor: "secondary.main" },
                          }}
                          onClick={() => ToggleFollow(name,id)}
                        >
                          {followed ? "Unfollow" : "Follow"}
                        </Button> */}
                    <Tooltip title="Create Post">
                      <IconButton
                        onClick={handleCreatePostOpen}
                        sx={{ color: "white" }}
                      >
                        <CreateIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Create Event">
                      <IconButton
                        onClick={handleCreateEventOpen}
                        sx={{ color: "white" }}
                      >
                        <CalendarMonthIcon />
                      </IconButton>
                    </Tooltip>
       
                    <Tooltip title="Members List">
                      <IconButton onClick={handleMembersOpen} sx={{ color: "white" }}>
                        <PeopleIcon />
                      </IconButton>
                    </Tooltip>
                    <Members clubID={id} members={clubInfo.members} membersOpen={membersOpen} handleMembersClose={handleMembersClose} handleMembersOpen={handleMembersOpen}  />
                    <Tooltip title="Club Settings">
                      <IconButton sx={{ color: "white" }}>
                        <SettingsIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>

              <CreatePost
                createPostOpen={createPostOpen}
                handleCreatePostClose={handleCreatePostClose}
              />
              <CreateEvent
                createEventOpen={createEventOpen}
                handleCreateEventClose={handleCreateEventClose}
              />

              <Box sx={{ display: "flex", flexFlow: "row nowrap", backgroundColor:"" }}>
                <Box sx={{width: "50%",}}> 
                <Box sx={{
                    border: "3px solid #000000",
                    borderRadius: "10px 10px 0 0",
                    background:
                      "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
                    display: "flex",
                    flexFlow: "column nowrap",
                    alignItems: "left",
                    textAlign: "center",
                    justifyContent:"center",
                    mt: 2,
                    mx: 2,
                  }}>
                  <Typography
                    ml={0}
                    my={0}
                    variant="h3"
                    color="white"
                    fontFamily={"RampartOne"}
                    sx={{}}
                  >
                    Posts
                  </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: "60vh",
                      display: "flex",
                      flexFlow: "column nowrap",
                      overflow: "scroll",
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                      backgroundColor: "back.main",
                      border: "2px solid black",
                      borderRadius: "0 0 20px 20px",
                      px: 2,
                      mb: 1,
                      mx: 2,
                    }}
                  >
                    {posts && posts.length > 0?
                      posts.map((post: Post) => (
                        <Box key={post.id} sx={{ my: 1 }}>
                          <PostElement
                            post_id={post.id}
                            username={post.author}
                            title={post.title}
                            body={post.body}
                            time_posted={convertDate(
                              new Date(post.time_posted)
                            )}
                            likes={post.likes}
                            dislikes={post.dislikes}
                            totalComments={1}
                          />
                        </Box>
                      )): (                <Box
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexFlow: "column nowrap",
                          alignItems: "center",
                          justifyContent:"center",
                        }}
                      >
                        <Typography
                          component="h2"
                          variant="h2"
                          fontFamily={"RampartOne"}
                          sx={{
                            color: "secondary.dark",
                            fontSize: "2rem",
                          }}
                        >
                          No Posts To Show...
                        </Typography>
                      </Box>)}
                  </Box>

                </Box>

                <Box sx={{width: "50%",}}> 
                <Box sx={{
                    border: "3px solid #000000",
                    borderRadius: "10px 10px 0 0",
                    background:
                      "linear-gradient(90deg, rgba(126,2,237,1) 0%, rgba(78,26,157,1) 99%)",
                    display: "flex",
                    flexFlow: "column nowrap",
                    alignItems: "left",
                    textAlign: "center",
                    mt: 2,
                    mx: 2,
                  }}>
                  <Typography
                    ml={0}
                    my={0}
                    variant="h3"
                    color="white"
                    fontFamily={"RampartOne"}
                    sx={{ }}
                  >
                    Events
                  </Typography>
                  </Box>

                  <Box
                    sx={{
                      height: "60vh",
                      display: "flex",
                      flexFlow: "column nowrap",
                      overflow: "scroll",
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                      backgroundColor: "back.main",
                      border: "2px solid black",
                      borderRadius: "0 0 20px 20px",
                      px: 2,
                      mb: 1,
                      mx: 2,
                    }}
                  >
                    {events && events.length > 0 ?
                      events.map((event: Event) => (
                        <Box key={event.id} sx={{ my: 1 }}>
                          <EventElement
                            id={event.id}
                            username={event.author}
                            name={event.name}
                            description={event.description}
                            event_time={event.event_time}
                            event_date={event.event_date}
                            likes={event.likes}
                            dislikes={event.dislikes}
                          />
                        </Box>
                      )) : (                <Box
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexFlow: "column nowrap",
                          alignItems: "center",
                          justifyContent:"center",
                        }}
                      >
                        <Typography
                          component="h2"
                          variant="h2"
                          sx={{
                            color: "secondary.dark",
                            fontFamily: "RampartOne",
                            fontSize: "2rem",
                          }}
                        >
                          No Events To Show...
                        </Typography>
                      </Box>)}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
};

export default ClubPage;
