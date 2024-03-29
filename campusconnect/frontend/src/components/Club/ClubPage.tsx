import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Cookies from "js-cookie";

import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Container,
  Dialog,
  DialogTitle,
  Fab,
  Grid,
  TextField,
  List,
  ListItem,
  PaletteOptions
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import CreateIcon from "@mui/icons-material/Create";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleIcon from "@mui/icons-material/People";


import NavBar from "../LandingPage/NavBar";
import PostElement from "../Posts/PostElement";

interface Props {
  isAuth: boolean;
}
interface ClubInfo {
  name: string;
  description: string;
  location: string;
  email: string;
  pnum: string;
  website: string;
  image ?: File;

  // members: any[];
  posts: any[];
  // events: any[];
  // auditLog: any[];
}

interface CreatePost {
  title: string;
  body: string;
  id: string;
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
}

type ImageFile = File | null;

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
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [createPostImage, setCreatePostImage] = useState<ImageFile>(null);
  const [posts, setPosts] = useState<JSX.Element>();

  const { name, id } = useParams();

  const handleImageSelect = (event: any) => {
    let imageFiles = event.target.files;

    if (!imageFiles || imageFiles.length == 0) {
      return;
    }

    setCreatePostImage(imageFiles[0]);
  };

  const handleImageRemove = () => {
    setCreatePostImage(null);
  };

  const handleCreatePostOpen = () => setCreatePostOpen(true);
  const handleCreatePostClose = () => setCreatePostOpen(false);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const form: CreatePost = {
      title: data.get("create-post-title") as string,
      body: data.get("create-post-body") as string,
      id: id as string,
    };

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    const response: Response = await fetch("/api/posts/create", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(form),
    });

    if (response.ok) {
      handleCreatePostClose();
      window.location.reload();
      console.log("New Post Created Successfully");
    } else {
      console.log("New Post failed");
    }
  };

  const createPostsDisplay = (posts_data: any) => {
    console.log(posts_data);
    const postComponents = posts_data.map((post: any) => (
      <ListItem key={post.id}>
        <PostElement username={post.author} title={post.title} body={post.body} time_posted={convertDate(new Date(post.time_posted))} likes={post.likes} dislikes={post.dislikes}/>
      </ListItem>
    ))
    const final = <List sx={{ml: -21}}>{postComponents}</List>
    setPosts(final);
  };

  useEffect(() => {
    let fetchClub = async () => {
      let response = await fetch(`/api/clubs/fetch/${name}/${id}`, {
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
            image : club_data.image
          };
          createPostsDisplay(posts);
          setClubInfo(clubInfo);
        });
      } else {
        setClubExists(false);
      }
    };
    fetchClub();
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
            <NavBar />
            <Paper
              elevation={3}
              sx={{
                mt: 15,
                borderRadius: "15px",
                textAlign: "left",
                width: "1000px",
                height: "800px",
                maxHeight: "800px",
                overflow: 'auto',
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
                  sx={{
                    width: 300,
                    height: 100,
                    backgroundColor: "white",
                    borderRadius: "5px",
                    ml: 2,
                    mt: 1,
                  }}
                ></Box>

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
                    <Tooltip title="Club Settings">
                      <IconButton sx={{ color: "white" }}>
                        <SettingsIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Follow Club">
                      <IconButton sx={{ color: "white" }}>
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

              <Dialog open={createPostOpen} onClose={handleCreatePostClose}>
                <DialogTitle
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
                    color: "back.light",
                    border: "2px #000 solid",
                    borderRadius: "0 0 0px 0px",
                  }}
                >
                  <Container
                    component="div"
                    sx={{
                      display: "flex",
                      columnGap: 5,
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography component="h2" variant="h2">
                      Create a Post
                    </Typography>
                    <Button
                      onClick={handleCreatePostClose}
                      sx={{
                        color: "back.dark",
                        fontSize: "2rem",
                        "&:hover": {
                          color: "#F00",
                        },
                      }}
                    >
                      X
                    </Button>
                  </Container>
                </DialogTitle>

                {/* <DialogContent> */}
                <Container
                  component="div"
                  sx={{
                    py: 3,
                    backgroundColor: "back.main",
                    border: "2px #000 solid",
                    borderRadius: "0px",
                  }}
                >
                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid
                      container
                      spacing={3}
                      sx={{ display: "flex", justifyContent: "space-evenly" }}
                    >
                      <Grid item xs={12}>
                        <Typography
                          component="label"
                          variant="h5"
                          sx={{ color: "back.dark" }}
                        >
                          Title
                        </Typography>
                        <TextField
                          component="div"
                          name="create-post-title"
                          id="create-post-title"
                          required
                          fullWidth
                          sx={{
                            backgroundColor: "back.light",
                            "&:focus": {
                              border: "2px solid black",
                            },
                          }}
                        ></TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography component="label" variant="h5">
                          Body
                        </Typography>
                        <TextField
                          component="div"
                          name="create-post-body"
                          id="create-post-body"
                          required
                          fullWidth
                          multiline
                          rows={12}
                          sx={{ backgroundColor: "back.light" }}
                        ></TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <Container
                          component="div"
                          sx={{
                            display: "flex",
                            flexDirection: "row nowrap",
                            columnGap: 2,
                          }}
                        >
                          <Fab
                            component="label"
                            onChange={handleImageSelect}
                            sx={{
                              color: "primary.contrastText",
                              backgroundColor: "primary.main",
                              "&:hover": {
                                backgroundColor: "secondary.main",
                                color: "secondary.contrastText",
                              },
                            }}
                          >
                            +
                            <input
                              type="file"
                              id="create-post-image"
                              name="create-post-image"
                              accept="image/*" 
                              hidden
                            ></input>
                          </Fab>

                          <Typography
                            component="span"
                            sx={{
                              display: { xs: "none", sm: "block", md: "block" },
                              fontWeight: 700,
                              textAlign: "center",
                            }}
                          >
                            Image <br></br> Attachments
                          </Typography>

                          <Box
                            sx={{
                              width: "60%",
                              backgroundColor: "back.light",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              border: "2px #000 solid",
                              borderRadius: "10px",
                            }}
                          >
                            {createPostImage && (
                              <>
                                <Typography
                                  component="span"
                                  color="primary"
                                  sx={{ pl: 5, fontSize: "0.75rem" }}
                                >
                                  {createPostImage.name}
                                </Typography>
                                <Button
                                  onClick={handleImageRemove}
                                  color="error"
                                >
                                  X
                                </Button>
                              </>
                            )}
                          </Box>
                        </Container>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: 3,
                            mb: 2,
                            color: "primary.contrastText",
                            backgroundColor: "primary.main",
                            "&:hover": {
                              backgroundColor: "secondary.main",
                              color: "secondary.contrastText",
                            },
                          }}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
                {/* </DialogContent> */}
              </Dialog>

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
                  <div style={{ display: "flex", marginTop: '100px'}}>
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
