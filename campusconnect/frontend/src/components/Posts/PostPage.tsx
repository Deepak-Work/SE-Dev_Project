import  { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    Container
  } from "@mui/material";

// import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


import { ThemeProvider, createTheme } from "@mui/material/styles";

import NavBar from "../LandingPage/NavBar";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentIcon from '@mui/icons-material/Comment';

interface Props{
    isAuth: boolean;
    username: string;
}

interface PostProps {
    title: string;
    body: string;
    time_posted: string;
    likes: number;
    dislikes: number;
    author: string;
    summary: string;
    clubname: string;
    // userAvatar: string;
    // postImage: string;
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
    

const PostComponent = (props: Props) => {
  
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

      const {id} = useParams();
      const {username} = props;

  type ImageFile = File | null;
      
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [postInfo, setPostInfo] = useState<PostProps>({} as PostProps);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editPostOpen, setEditPostOpen] = useState(false);
  const [editPostImage, setEditPostImage] = useState<ImageFile>(null);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);

  
  const handleImageSelect = (event: any) => {
    let imageFiles = event.target.files;

    if (!imageFiles || imageFiles.length == 0) {
      return;
    }

    setEditPostImage(imageFiles[0]);
  };

  const handleImageRemove = () => {
    setEditPostImage(null);
  };

  const handleEditPostOpen = () => setEditPostOpen(true);
  const handleEditPostClose = () => setEditPostOpen(false);

  interface EditPost {
    title: string;
    body: string;
    id: string;
  }



  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {    

    const data = new FormData(event.currentTarget);
    const form: EditPost = {
      title: data.get("edit-post-title") as string,
      body: data.get("edit-post-body") as string,
      id: id as string
    };

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    const response: Response = await fetch(`/api/posts/post/edit`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(form),
    });



    if (response.ok) {
      handleEditPostClose();
      // window.location.reload();
      console.log("New Post Edited Successfully");
    } else {
      console.log("Edit Post failed");
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const navigate = useNavigate()

  const handleClose = async (action: string) => {

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    if (action === 'delete') {
      // Perform deletion logic here
      console.log('Deleting post start')
      let response = await fetch(`/api/posts/post/${id}/delete`, {
        method: "DELETE",
        headers: headers,
      });

      if (response.ok) {
        console.log(response)
        
        const data = await response.json();
        const { clubname, clubid } = data;

        navigate(`/club/${clubname}/${clubid}`)
      }
      else {
        console.log('Could not delete post');
      }}
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
      { id: 1, postId: postId, text: 'First comment' },
      { id: 2, postId: postId, text: 'Second comment' },
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
            clubname: posts.clubname,
            time_posted: posts.time_posted,
          };
          setPostInfo(postInfo);
        });
      } else {
        console.log("Post cannot be laoded")
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
        <Box sx={{
              width: "100%",
              minheight: "100vh",
              backgroundColor: "white",
              borderRadius: "5px",
              ml: 2,
              mt: 1
            }}>
        <NavBar username={username} />
        <Box
          sx={{
            borderRadius: "10px",
            border: "3px solid #000000",
            height: "75px",
            width: "fit",
            background:
              "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
            display: "flex",

            alignItems: "left",
            paddingRight: "10px",
            paddingleft: "10px",
            mt: 16,
            mr: 4,
            textAlign: "center"
          }}
        > 
        <Typography ml={4} mt={1}variant="h3" color="white">
            {postInfo.clubname}
          </Typography>
          </Box> 
        
        <Grid
              mt={3}
              container
              direction="row"
              spacing={2}
              justifyContent="center"
            >
        <Grid item>
        <Paper
          elevation={3}
          sx={{
            mt: 2,
            borderRadius: "15px",
            textAlign: "left",
            width: "850px",
            minHeight: "400px",
            maxHeight: "800px",
            overflow: 'auto',
            display: "flex",
            flexDirection: "column",
            border: "5px solid #000000",
            float: 'top'
          }}>
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
          paddingRight: "10px",
        }}
      >
        <Typography
          variant="h5"
          color="white"
          fontWeight="bold"
          sx={{ pt: 1, pl: 3 }}
        >
          {postInfo.title} <br/>

          Posted on {postInfo.time_posted} by {postInfo.author}
        </Typography>
        </Box>
        <Typography
          sx={{ pt: 1, pl: 3 }}
        >
        {postInfo.body}
        </Typography>
        </Paper>
        <IconButton onClick={isLiked?handleUnlike:handleLike} aria-label="Like post">
        <ThumbUpAltIcon/>
        {postInfo.likes}
        </IconButton>
        <IconButton onClick={handleDislike} aria-label="dislike post">
        <ThumbDownIcon />
        {postInfo.dislikes}
        </IconButton>
        <IconButton onClick={toggleComments} aria-label="dislike post">
        <CommentIcon />
        </IconButton>
        <Tooltip title="Options">
          <IconButton
            aria-label="more"
            aria-controls="three-dotted-menu"
            aria-haspopup="true"
            onClick={handleClick}
            size="large">
            < MoreHorizIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="three-dotted-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleClose('')}
        >
          <MenuItem onClick={() => handleClose('delete')}>Delete Post</MenuItem>
          <MenuItem onClick={() =>handleEditPostOpen()}>Edit Post</MenuItem>
        </Menu>
      </Grid>
      <Dialog open={editPostOpen} onClose={handleEditPostClose}>
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
              Edit a Post
            </Typography>
            <Button
              onClick={handleEditPostClose}
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
          <Box component="form" onSubmit={handleEditSubmit}>
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
                  name="edit-post-title"
                  id="edit-post-title"
                  defaultValue = {postInfo.title}
                  required
                  fullWidth
                  sx={{
                    backgroundColor: "back.light",
                    "&:focus": {
                      border: "2px solid black"},
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography component="label" variant="h5">
                  Body
                </Typography>
                <TextField
                  component="div"
                  name="edit-post-body"
                  id="edit-post-body"
                  defaultValue = {postInfo.body}
                  required
                  fullWidth
                  multiline
                  rows={12}
                  sx={{ backgroundColor: "back.light"
                  }}
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
                      id="edit-post-image"
                      name="edit-post-image"
                      accept="image/*" 
                      // value = {postInfo.image}
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
                      borderRadius: "10px"
                    }}
                  >
                    {editPostImage && (
                      <>
                        <Typography
                          component="span"
                          color="primary"
                          sx={{ pl: 5, fontSize: "0.75rem" }}
                          // value = {postInfo.image.name}
                        >
                          {editPostImage.name}
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
            overflow: 'auto',
            display: "flex",
            flexDirection: "column",
            border: "5px solid #000000",
            float: 'right'
          }}>
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
              {comments.map(comment => (
                <li key={comment.id}>{comment.text}</li>
              ))}
            </ul>
          </Paper>
        )}
      </Grid>
        
      </Grid>
      </Box>
      </ThemeProvider>
  )}
</>
);
};

export default PostComponent;
