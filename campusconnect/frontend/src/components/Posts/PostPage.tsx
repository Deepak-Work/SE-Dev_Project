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
    MenuItem
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

  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [postInfo, setPostInfo] = useState<PostProps>({} as PostProps);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const {id} = useParams();

  const navigate = useNavigate()

  const handleClose = async (action: string) => {

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    if (action === 'delete') {
      // Perform deletion logic here
      console.log('Deleting post start')
      let response = await fetch(`/api/posts/fetch/post/${id}/delete`, {
        method: "DELETE",
        headers: headers,
      });
      if (response.ok) {
        console.log('Deleting post');
        console.log(response)
        
        const data = await response.json();
        const { clubname, clubid } = data;

        navigate(`/club/${clubname}/${clubid}`)
      }
      else {
        console.log('Could not delete post');
      }}
    if (action === 'edit') {
      // Perform deletion logic here
      console.log('Editing post');
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
      let response = await fetch(`/api/posts/fetch/post/${id}`, {
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
          console.log(postInfo)
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
        <NavBar />
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
        <IconButton onClick={handleLike} aria-label="Like post">
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
          <MenuItem onClick={() => handleClose('edit')}>Edit Post</MenuItem>
        </Menu>
      </Grid>
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
