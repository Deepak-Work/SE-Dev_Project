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
} from "@mui/material";

import Cookies from "js-cookie";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import CreateIcon from "@mui/icons-material/Create";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import NavBar from "../LandingPage/NavBar";
import PostElement from "../Posts/PostElement";
import CreatePost from "../Posts/CreatePost";
import CreateEvent from "../Events/CreateEvent";

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
  image?: string;

  // members: any[];
  posts: any[];
  // events: any[];
  // auditLog: any[];
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

  const [clubExists, setClubExists] = useState(false);
  const [clubInfo, setClubInfo] = useState<ClubInfo>({} as ClubInfo);

  const [posts, setPosts] = useState<JSX.Element>();
  const { name, id } = useParams();
  const [followed, setFollowed] = useState(false);


  const getFollowStatus = async () => {
    console.log("Checking Follow Status");
    const response: Response = await fetch(`/api/clubs/follow-status/${name}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    if (response.ok) {
      setFollowed(true);
    }
    console.log(followed);
  }

  // useEffect(() => {
  //   getFollowStatus();
  // }, []);
  

  // Create a Post Modal
  const [createPostOpen, setCreatePostOpen] = useState(false);

  const handleCreatePostOpen = () => setCreatePostOpen(true);
  const handleCreatePostClose = () => setCreatePostOpen(false);

  //Create an Event Modal
  const [createEventOpen, setCreateEventOpen] = useState(false);

  const handleCreateEventOpen = () => setCreateEventOpen(true);
  const handleCreateEventClose = () => setCreateEventOpen(false);

  // Explore Modal
  const [exploreOpen, setExploreOpen] = useState<boolean>(false);
    
  const handleExploreOpen : () => void = () => setExploreOpen(true);
  const handleExploreClose : () => void = () => setExploreOpen(false);

  // CreatePostsDisplay
  const createPostsDisplay = (posts_data: any) => {
    const postComponents = posts_data.map((post: any) => (
      <ListItem key={post.id}>
        <PostElement
          username={post.author}
          title={post.title}
          body={post.body}
          time_posted={convertDate(new Date(post.time_posted))}
          likes={post.likes}
          dislikes={post.dislikes}
        />
      </ListItem>
    ));
    const final = <List sx={{ ml: -21 }}>{postComponents}</List>;
    setPosts(final);
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
          const clubInfo: ClubInfo = {
            name: club_data.name,
            description: club_data.description,
            location: club_data.location,
            email: club_data.email,
            pnum: club_data.contact,
            website: club_data.website,
            posts: posts,
            image: club_data.image,
          };
          createPostsDisplay(posts);
          setClubInfo(clubInfo);
        });
      } else {
        setClubExists(false);
        console.log("ce: " + clubExists + " " + response.status);
      }
    };
    fetchClub();
    console.log("club exists:" + clubExists)
    console.log("auth: " + props.isAuth);
  }, []);

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
            <NavBar username={props.username}/>
            <Paper
              elevation={3}
              sx={{
                mt: 15,
                borderRadius: "15px",
                textAlign: "left",
                width: "1000px",
                height: "800px",
                maxHeight: "800px",
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                border: "5px solid #000000",
              }}
            >
              <Box
                sx={{
                  borderRadius: "10px",
                  border: "3px solid #000000",
                  height: "125px",
                  background:
                    "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
                  display: "flex",

                  alignItems: "left",
                  paddingRight: "10px",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: 300,
                    height: 100,
                    borderRadius: "5px",
                    ml: 2,
                    mt: 1,
                  }}
                  // alt="Club image"
                  src={clubInfo.image}

                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    justifyContent: "left",
                  }}
                >
                  <Typography ml={2} variant="h5" color="white">
                    {clubInfo.name}
                  </Typography>
                  <Typography ml={2} variant="subtitle2" color="white">
                    {clubInfo.description}
                  </Typography>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "10px",
                    }}
                  >
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
                    <Tooltip title="Club Settings">
                      <IconButton sx={{ color: "white" }}>
                        <SettingsIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Follow Club">
                      <IconButton 
                      // onClick={followed ? handleUnfollowClub : handleFollowClub}
                      sx={{ color: "white" }}>
                        <AddBoxIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Members List">
                      <IconButton sx={{ color: "white" }}>
                        <PeopleIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </Box>

              <CreatePost
                createPostOpen={createPostOpen}
                handleCreatePostClose={handleCreatePostClose}
              />
              <CreateEvent
                createEventOpen={createEventOpen}
                handleCreateEventClose={handleCreateEventClose}
              />

              <div style={{ display: "flex", flexDirection: "row" }}>
                <Box
                  sx={{
                    borderRadius: "10px",
                    border: "3px solid #000000",
                    height: "75px",
                    width: "200px",
                    background:
                      "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
                    display: "flex",
                    alignItems: "left",
                    paddingRight: "10px",
                    mt: 2,
                    ml: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography ml={4} mt={1} variant="h3" color="white">
                    Posts
                  </Typography>
                  <div style={{ display: "flex", marginTop: "100px" }}>
                    {posts}
                  </div>
                </Box>

                <Box
                  sx={{
                    borderRadius: "10px",
                    border: "3px solid #000000",
                    height: "75px",
                    width: "200px",
                    background:
                      "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
                    display: "flex",

                    alignItems: "left",
                    paddingRight: "10px",
                    mt: 2,
                    ml: 50,
                    textAlign: "center",
                  }}
                >
                  <Typography ml={3} mt={1} variant="h3" color="white">
                    Events
                  </Typography>
                </Box>
              </div>
            </Paper>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
};

export default ClubPage;
