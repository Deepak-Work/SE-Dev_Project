import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import convertDate from "../Functions/convertDate";
import Cookies from "js-cookie";

import {
  Box,
  PaletteOptions,
  Paper,
  Typography,
  Grid,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  Fab,
  TextField,
  Button,
  Container,
} from "@mui/material";

// import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import NavBar from "../LandingPage/NavBar";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentIcon from "@mui/icons-material/Comment";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

interface Props {
  isAuth: boolean;
  username: string;
}

interface PostProps {
  title: string;
  body: string;
  timePosted: string;
  likes: number;
  dislikes: number;
  author: string;
  summary: string;
  clubName: string;
  clubId: string;
  clubImage: string;
  // userAvatar: string;
  postImage: string;
  // caption: string;
}

interface Comment {
  id: number;
  postId: any;
  text: string;
}

interface CustomPaletteOptions extends PaletteOptions {
  back?: {
    main: string;
    light?: string;
    dark?: string;
    contrastText?: string;
  };
}

const PostPage = (props: Props) => {
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

  const { id } = useParams();
  const { username } = props;

  type ImageFile = File | null;

  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [postInfo, setPostInfo] = useState<PostProps>({} as PostProps);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [editPostOpen, setEditPostOpen] = useState(false);
  const handleEditPostOpen = () => setEditPostOpen(true);
  const handleEditPostClose = () => setEditPostOpen(false);


  const [deletePostOpen, setDeletePostOpen] = useState(false);
  const handleDeletePostOpen = () => setDeletePostOpen(true);
  const handleDeletePostClose = () => {
    setDeletePostOpen(false);
    setAnchorEl(null);
  }

  // const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   const data = new FormData(event.currentTarget);

  //   const form = new FormData();

  //   form.append("title", data.get("edit-post-title") as string);
  //   form.append("body", data.get("edit-post-body") as string);
  //   form.append("id", id as string)
  //   if (data.get("edit-post-image")) form.append("image", data.get("edit-post-image"));


  //   const headers = {
  //     "Content-Type": "application/json",
  //     "X-CSRFToken": Cookies.get("csrftoken") || "",
  //   };

  //   const response: Response = await fetch(`/api/posts/post/edit`, {
  //     method: "PUT",
  //     headers: headers,
  //     body: JSON.stringify(form),
  //   });

  //   if (response.ok) {
  //     handleEditPostClose();
  //     // window.location.reload();
  //     console.log("New Post Edited Successfully");
  //   } else {
  //     console.log("Edit Post failed");
  //   }
  // };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const handleClose = async (action: string) => {
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    if (action === "delete") {
      // Perform deletion logic here
      console.log("Deleting post start");
      let response = await fetch(`/api/posts/post/${id}/delete`, {
        method: "DELETE",
        headers: headers,
      });

      if (response.ok) {
        const data = await response.json();
        const { club_name, club_id } = data;

        navigate(`/club/${club_name}/${club_id}`);
      } else {
        console.log("Could not delete post");
      }
    }
    setAnchorEl(null);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    // Fetch comments from server when toggling comments
    if (!showComments) {
      fetchComments(id);
    }
  };

  const fetchComments = (postId: any) => {
    // Simulating fetching comments from server
    // Replace this with your actual API call
    const mockComments: Comment[] = [
      { id: 1, postId: postId, text: "First comment" },
      { id: 2, postId: postId, text: "Second comment" },
      // Add more comments as needed
    ];
    setComments(mockComments);
  };

  const handleLike = () => {
    // Implement like functionality
  };

  const handleDislike = () => {
    // Implement dislike functionality
  };

  useEffect(() => {
    const fetchPost = async () => {
      let response = await fetch(`/api/posts/post/${id}`, {
        method: "GET",
      });
      if (response.ok) {
        response.json().then((value) => {
          const posts = value.post_data;
          const postInfo: PostProps = {
            body: posts.body,
            title: posts.title,
            likes: posts.likes,
            dislikes: posts.dislikes,
            author: posts.author,
            summary: posts.summary,
            postImage: posts.image,
            clubName: posts.club_name,
            clubId: posts.club_id,
            clubImage: posts.club_image,
            timePosted: posts.time_posted,
          };
          setPostInfo(postInfo);
        });
      } else {
        console.log("Post cannot be loaded");
      }
    };
    fetchPost();
  }, []);

  return (
    <>
      {!props.isAuth ? (
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
              alignItems: "flex-start",
              justifyContent: "center",
              flexFlow: "column nowrap",
              backgroundColor: "#1e1e1e",
            }}
          >
            <NavBar username={username} />

            <Box sx={{ml:10, width: "100%", height: "80vh", border:"0px white solid", padding:2,                     "&::-webkit-scrollbar": {
                      display: "none",
                    }}}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: "20px",
                  textAlign: "left",
                  // minWidth: "45%",
                  // maxWidth: "80%",
                  minWidth: "400px",
                  width: "20%",
                  overflow: "auto",
                  display: "flex",
                  flexFlow: "row nowrap",
                  border: "5px solid #000000",
                  // ml: 5,
                }}
              >
                <Box
                  sx={{
                    borderRadius: "10px",
                    border: "3px solid #000000",
                    height: "10%",
                    width: "100%",
                    backgroundColor: "primary.main",
                    // background:
                    //   "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
                    display: "flex",
                    flexFlow: "row nowrap",
                    alignItems: "center",
                    justifyContent: "left",
                    gap: 2,
                    // paddingRight: "10px",
                    // paddingleft: "10px",
                    // px: 10,
                    // mt: 16,
                    // mr: 4,
                    // ml: 2,
                    // textAlign: "center",
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
                    // alt="Club image"
                    src={postInfo.clubImage}
                  />
                  <Typography
                    ml={0}
                    mt={0}
                    variant="h5"
                    color="white"
                    fontFamily={"Lobster"}
                    onClick={() => navigate(`/club/${postInfo.clubName}/${postInfo.clubId}`)}
                    sx={{
                      color: "back.light",
                      textDecoration: "underline dashed",
                      textDecorationColor: "back.dark",
                      wordBreak: "break-word",
                      cursor: "pointer",
                      "&:hover": { color: "secondary.main" },
                    }}
                  >
                    {postInfo.clubName}
                  </Typography>
                </Box>
              </Paper>

              <Paper
                    elevation={4}
                    sx={{
                      mt: 2,
                      borderRadius: "20px",
                      textAlign: "left",
                      width: "80%",
                      height: "80%",
                      overflow: "auto",
                      display: "flex",
                      flexFlow:"column nowrap",
                      justifyContent:"space-between",
                      border: "5px solid #000000",
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                      // float: "top",
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: "10px",
                        border: "3px solid #000000",
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
                        {postInfo.title}
                      </Typography>

                      <Typography
                        variant="h5"
                        color="white"
                        fontWeight="bold"
                        fontFamily={"Lobster"}
                        sx={{ pt: 1, pl: 3 }}
                      >
                        {postInfo.author} - {convertDate(new Date(postInfo.timePosted))}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexFlow:"column wrap", justifyContent:"center", alignItems:"center", border:"0px solid", borderColor:"back.dark", borderRadius:"20px", m:2,}}>
                      <Typography                     
                      ml={0}
                    mt={0}
                    variant="h6"
                    color="back.dark"
                    fontFamily={"Lobster"}
                    sx={{ pt: 1, pl: 3, wordBreak:"break-word", whiteSpace: "pre-line" }}>
                      {postInfo.body}
                    </Typography>
                    {postInfo.postImage && <Box component="img" width={300} height={300} src={postInfo.postImage}></Box>}
                    
                      </Box>
                      <Box
                      sx={{
                        borderRadius: "10px",
                        border: "3px solid #000000",
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
                      <Box sx={{display:"flex", flexFlow:"row wrap"}}>
                    <Button sx={{display:"flex", margin: 2, border:"2px solid", borderColor:"back.dark", borderRadius:"10px", backgroundColor:"back.light", "&:hover": {backgroundColor:"secondary.light"}}}>
                      <IconButton onClick={handleLike} aria-label="Like post">
                    <ThumbUpAltIcon />
                    </IconButton>
                    <Typography 
                        color="primary.main"
                        fontWeight="bold"
                        fontFamily={"Lobster"}
                        sx={{}}>Like </Typography>
                    
                    <Box sx={{color: "back.light", border:"2px solid black", mx:1,p:1, borderRadius:"10px", backgroundColor:"primary.main"}}>
                      <Typography                         color="back.dark"
                        fontWeight="bold"
                        fontFamily={"Lobster"}
                        sx={{color:"back.light"}}>
                      {postInfo.likes} 
                      </Typography>

                      </Box>
                  
                      </Button>
                    
                  <Button sx={{display:"flex", margin: 2, border:"2px solid", borderColor:"back.dark", borderRadius:"10px", backgroundColor:"back.light", "&:hover": {backgroundColor:"secondary.light"}}}>
                  <IconButton onClick={handleDislike} aria-label="dislike post">
                    <ThumbDownIcon />
                    </IconButton>
                    <Typography 
                        color="primary.main"
                        fontWeight="bold"
                        fontFamily={"Lobster"}
                        sx={{}}>Dislike </Typography>
                    
                    <Box sx={{color: "back.light", border:"2px solid black", mx:1,p:1, borderRadius:"10px", backgroundColor:"primary.main"}}>
                      <Typography                         color="back.dark"
                        fontWeight="bold"
                        fontFamily={"Lobster"}
                        sx={{color:"back.light"}}>
                      {postInfo.dislikes} 
                      </Typography>

                      </Box>
                  
                      </Button>
                  <Button sx={{display:"flex", margin: 2, border:"2px solid", borderColor:"back.dark", borderRadius:"10px", backgroundColor:"back.light", "&:hover": {backgroundColor:"secondary.light"}}}>
                  <IconButton
                    onClick={toggleComments}
                    aria-label="dislike post"
                  >
                    <CommentIcon />
                    </IconButton>
                    <Typography 
                        color="primary.main"
                        fontWeight="bold"
                        fontFamily={"Lobster"}
                        sx={{}}>Comments </Typography>
                    
                    <Box sx={{color: "back.light", border:"2px solid black", mx:1,p:1, borderRadius:"10px", backgroundColor:"primary.main"}}>
                      <Typography                         color="back.dark"
                        fontWeight="bold"
                        fontFamily={"Lobster"}
                        sx={{color:"back.light"}}>
                      {1} 
                      </Typography>

                      </Box>
                  
                      </Button>
                      </Box>

                  <Tooltip title="Options">
                  <Button onClick={handleClick} sx={{display:"flex", margin: 2, border:"2px solid", borderColor:"back.light", borderRadius:"10px",  "&:hover": {backgroundColor:"secondary.light"}}}>
                    <IconButton
                      aria-label="more"
                      aria-controls="three-dotted-menu"
                      aria-haspopup="true"
                      size="large"
                    >
                      <MoreHorizIcon sx={{color:"white"}} />
                    </IconButton>
                    </Button>
                  </Tooltip>
                  <Menu
                    id="three-dotted-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => handleClose("")}
                  >
                    <MenuItem onClick={() => handleEditPostOpen()}>
                      Edit Post
                    </MenuItem>
                    {/* <MenuItem onClick={() => handleClose("delete")}> */}
                    <MenuItem onClick={() => {handleDeletePostOpen()}}>
                      Delete Post
                    </MenuItem>

                  </Menu>
                
                    </Box>

                </Paper>
                {/* <Grid
                mt={0}
                container
                direction={"row"}
                wrap={"wrap"}
                rowSpacing={5}
                justifyContent={"space-between"}
                // alignContent={"center"}
                sx={{height:"100%"}}
              >
                <Grid item xs={12}>
                    

                    </Grid>

                    <Grid item xs={12}>


                    </Grid>

                  <Grid item xs={12}>
                    
                  
                    </Grid>
                </Grid> */}
              <EditPost editPostOpen={editPostOpen} handleEditPostClose={handleEditPostClose}/> 
              <DeletePost deletePostOpen={deletePostOpen} handleDeletePostClose={handleDeletePostClose} handleClose={handleClose}/>
                <Grid item>
                  {showComments && (
                    <Paper
                      elevation={3}
                      sx={{
                        mt: 2,
                        borderRadius: "15px",
                        textAlign: "left",
                        minHeight: "400px",
                        maxHeight: "800px",
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column",
                        border: "5px solid #000000",
                        float: "right",
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius: "10px",
                          border: "3px solid #000000",
                          height: "fit",
                          background:
                            "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="h5"
                          color="white"
                          fontWeight="bold"
                          sx={{ pt: 1, pl: 3, pr: 3 }}
                        >
                          Comments
                        </Typography>
                      </Box>
                      <ul>
                        {comments.map((comment) => (
                          <li key={comment.id}>{comment.text}</li>
                        ))}
                      </ul>
                    </Paper>
                  )}
                </Grid>

            </Box>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
};

export default PostPage;
