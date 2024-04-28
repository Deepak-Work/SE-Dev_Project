import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

import convertDate from "../Functions/convertDate";
import formatCount from "../Functions/formatCount";
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
  TextField,
  Button,
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
import CommentElement from "../Comments/CommentElement";
import LoadingIndicator from "../Utils/LoadingIndicator";
import LoadingCommentsIndicator from "../Utils/LoadingCommentsIndicator";

interface Props {
  username: string;
  isAuth: boolean;
  loading: boolean;
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
  replyStatus: boolean;
  id: number;
  parent_id?: number;
  author: string;
  reply_author?: string;
  body: string;
  reply_body?: string;
  likes: number;
  dislikes: number;
  time_posted: string;
  author_id: number;
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


  const { username } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const [loadingComments, setLoadingComments] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const [commentBody, setCommentBody] = useState<string>("")
  const [currentReplyId, setCurrentReplyId] = useState<number | null>(null);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);

  const [postInfo, setPostInfo] = useState<PostProps>({} as PostProps);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [editPostOpen, setEditPostOpen] = useState(false);
  const [deletePostOpen, setDeletePostOpen] = useState(false);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);

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
      console.log("Post Cannot be Loaded");
    }
  };
  
  const handleEditPostOpen = () => {
    setAnchorEl(null);
    setEditPostOpen(true);
  };
  const handleEditPostClose = (event?: object, reason?: string) => {
    if (reason == "backdropClick") return;
    setEditPostOpen(false);
  };

  const getLikeDislikeStatus = async () => {
    const response = await fetch(`/api/posts/post/like-dislike/${id}`, {
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
    console.log("Liked:" +  isLiked + " Disliked:" +isDisliked);
    // fetchPost();
  }
  
  const handleLike = async () => {
    if (!isLiked) {
      const response = await fetch(`/api/posts/post/${id}/like`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorzation: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsLiked(true);
        console.log("Liked");
      }
    }
    else {
      const response = await fetch(`/api/posts/post/${id}/unlike`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorzation: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsLiked(false);
        console.log("Unliked");
      }
    }
    fetchPost();
  }

  const handleDislike = async () => {
    if (!isDisliked) {
      const response = await fetch(`/api/posts/post/${id}/dislike`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorzation: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsDisliked(true);
        console.log("Disliked");
      }
    }
    else {
      const response = await fetch(`/api/posts/post/${id}/undislike`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorzation: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsDisliked(false);
        console.log("Undisliked");
      }
  }
  fetchPost();
}

  const handleDeletePostOpen = () => {
    setDeletePostOpen(true);
    setAnchorEl(null);
  };
  const handleDeletePostClose = () => {
    setDeletePostOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (action: string) => {
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    if (action === "delete") {
      let response = await fetch(`/api/posts/post/${id}/delete`, {
        method: "DELETE",
        headers: headers,
      });

      if (response.ok) {
        const data = await response.json();
        const { club_name, club_id } = data;
        navigate(`/club/${club_name}/${club_id}`);
      } else {
        console.log("Post Could Not Be Deleted");
      }
    }
    setAnchorEl(null);
  };

  const fetchComments = async (postId: number) => {
    const headers = {
      // "Content-Type":"application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    let response = await fetch(`/api/posts/post/${postId}/comments`, {
      method: "GET",
      headers: headers,
    });

    if (response.ok) {
      const data = await response.json();
      setComments(data.comments_data);
    }
  };


  const toggleComments = () => {
    if (!showComments) {
      fetchComments(Number(id));
    }
    setShowComments(!showComments);
  };


  const handleCommentSubmit: (
    event: FormEvent<HTMLFormElement>
  ) => void = async (event) => {
    event.preventDefault();
    
    setLoadingComments(true);

    // const data = new FormData(event.currentTarget);

    const form = new FormData();

    form.append("body", commentBody as string);
    form.append("reply_id", currentReplyId?.toString() as string);

    const headers = {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    const response: Response = await fetch(
      `/api/posts/post/${id}/comment/new`,
      {
        method: "POST",
        headers: headers,
        body: form,
      }
    );

    if (response.ok) {
      setCommentBody("");
      setCurrentReplyId(null);
      setEditCommentId(null);

      setComments([]);
      fetchComments(Number(id));
    }

    setTimeout(() => {setLoadingComments(false)}, 400);
  };

  const handleNewComment: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> void  =
  (event) => {
    setCommentBody(event.currentTarget.value);
  }

  const handleEditComment: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> void  =
  (event) => {
    setCommentBody(event.currentTarget.value);
  }

  const handleEditCommentSubmit: (
    event: FormEvent<HTMLFormElement>,
  ) => void = async (event) => {
    event.preventDefault();

    // const data = new FormData(event.currentTarget);

    const form = new FormData();
    // form.append("body", data.get("new-comment-body") as string);
    form.append("body", commentBody as string);
    // form.append("reply_id", currentReplyId?.toString() as string);

    const headers = {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    const response: Response = await fetch(
      `/api/posts/comment/${editCommentId}/edit`,
      {
        method: "PUT",
        headers: headers,
        body: form,
      }
    );

    if (response.ok) {
      setEditCommentId(null);
      setCommentBody("");
      setCurrentReplyId(null);
      fetchComments(Number(id));
    }
  };

  useEffect(() => {
    fetchPost();
    getLikeDislikeStatus();
    fetchComments(Number(id));
  }, []);


  if (!props.isAuth && !props.loading) {
    return <p>You are not authorized to view this page.</p>;
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
            <NavBar username={username} />

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
                  // minWidth: "45%",
                  // maxWidth: "80%",
                  minWidth: "350px",
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
                    fontFamily={"RampartOne"}
                    onClick={() =>
                      navigate(`/club/${postInfo.clubName}/${postInfo.clubId}`)
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
                    {postInfo.clubName}
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
                    // float: "top",
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
                      {postInfo.title}
                    </Typography>

                    <Typography
                      variant="h5"
                      color="white"
                      fontWeight="bold"
                      fontFamily={"Lobster"}
                      sx={{ pt: 1, pl: 3 }}
                    >
                      {postInfo.author} -{" "}
                      {convertDate(new Date(postInfo.timePosted))}
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
                      {postInfo.body}
                    </Typography>
                    {postInfo.postImage && (
                      <Box
                        component="img"
                        width={300}
                        height={300}
                        src={postInfo.postImage}
                      ></Box>
                    )}
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
                          {isLiked? <ThumbUpAltIcon sx={{color: "primary.main"}} /> : <ThumbUpAltIcon />}
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
                            {formatCount(postInfo.likes)}
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
                        <IconButton
                          aria-label="dislike post"
                        >
                          {isDisliked ? <ThumbDownIcon sx={{color: "primary.main"}} /> : <ThumbDownIcon />}
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
                            {formatCount(postInfo.dislikes)}
                          </Typography>
                        </Box>
                      </Button>
                      <Button
                        onClick={() => toggleComments()}
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
                          <CommentIcon />
                        </IconButton>
                        <Typography
                          color="primary.main"
                          fontWeight="bold"
                          fontFamily={"Lobster"}
                          sx={{}}
                        >
                          Comments{" "}
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
                            {formatCount(comments.length)}
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
                      onClose={() => handleClose("")}
                    >
                      <MenuItem onClick={() => handleEditPostOpen()}>
                        <Typography fontFamily={"Lobster"}>
                          Edit Post
                        </Typography>
                      </MenuItem>
                      {/* <MenuItem onClick={() => handleClose("delete")}> */}
                      <MenuItem
                        onClick={() => {
                          handleDeletePostOpen();
                        }}
                      >
                        <Typography fontFamily={"Lobster"}>
                          Delete Post
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </Paper>
                {showComments && (
                  <Paper
                    elevation={0}
                    sx={{
                      mt: 2,
                      borderRadius: "15px",
                      textAlign: "left",
                      height: "100%",
                      width: "40%",
                      minWidth: "300px",
                      minHeight: "60vh",
                      // minHeight: "400px",
                      maxHeight: "800px",
                      overflow: "auto",
                      display: "flex",
                      flexDirection: "column",
                      border: "5px solid #000000",
                      float: "right",
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                      // position:"absolute",
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: "10px 10px 0 0",
                        border: "0px solid #000",
                        borderBottom: "5px solid #000",
                        height: "fit",
                        // background:
                        //   "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
                        backgroundColor: "secondary.main",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h3"
                        color="white"
                        fontWeight="bold"
                        fontFamily={"Lobster"}
                        sx={{ pt: 1, pl: 3, pr: 3, userSelect:"none" }}
                      >
                        Comments
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexFlow: "row nowrap",
                        justifyContent: "center",
                        width: "100%",
                        border: "2px solid",
                        borderRadius: "0px",
                        // minHeight: "30%",
                        maxHeight: "50%",
                        m: 0,
                      }}
                    >
                      {editCommentId ?                       <Box
                        component="form"
                        onSubmit={handleEditCommentSubmit}
                        sx={{
                          display: "flex",
                          flexFlow: "column wrap",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                          overflow: "auto",
                          "&::-webkit-scrollbar":{
                            display:"none"
                          },
                        }}
                      >
                        <TextField
                          sx={{ backgroundColor: "back.light",}}
                          variant="filled"
                          autoComplete="edit-comment-field"
                          required
                          fullWidth
                          multiline
                          maxRows={7}
                          id="edit-comment-body"
                          name="edit-comment-body"
                          label="Edit Comment 📜"
                          type="text"
                          onChange={handleEditComment}
                          value={commentBody}
                          InputProps={{
                            // startAdornment: (
                            //   <InputAdornment position="start">
                            //     📜
                            //   </InputAdornment>
                            // ),
                            // endAdornment: (
                            //   <Button
                            //     type="submit"
                            //     variant="contained"
                            //     sx={{ mt: 3, mb: 2 }}
                            //   >
                            //     Send
                            //   </Button>
                            // ),
                          }}
                        />

                          <Box sx={{display:"flex", flexFlow:"row nowrap", width:"100%"}}> 
                          <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", width:"35%",}}>
                            <Typography fontFamily={"Lobster"} fontSize="0.75rem" sx={{color:"back.main", border:"2px solid", borderColor:"back.dark", borderRadius: "20px",backgroundColor: "secondary.main", p:1, mt:1,}}>
                            Edit: {editCommentId}
                              </Typography>
                          </Box>
                          



                          <Button
                          type="submit"
                          variant="contained"
                          
                          sx={{ width: "100%", my: 2, mx: 1 }}
                        >
                          Send
                        </Button>
                        </Box>
                      </Box> :                       <Box
                        component="form"
                        onSubmit={handleCommentSubmit}
                        sx={{
                          display: "flex",
                          flexFlow: "column wrap",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                          overflow: "auto",
                          "&::-webkit-scrollbar":{
                            display:"none"
                          },
                        }}
                      >
                        <TextField
                          sx={{ backgroundColor: "back.light",}}
                          variant="filled"
                          autoComplete="comment-field"
                          required
                          fullWidth
                          multiline
                          maxRows={7}
                          id="new-comment-body"
                          name="new-comment-body"
                          label="New Comment 📜"
                          type="text"
                          onChange={handleNewComment}
                          value={commentBody}
                          InputProps={{
                            // startAdornment: (
                            //   <InputAdornment position="start">
                            //     📜
                            //   </InputAdornment>
                            // ),
                            // endAdornment: (
                            //   <Button
                            //     type="submit"
                            //     variant="contained"
                            //     sx={{ mt: 3, mb: 2 }}
                            //   >
                            //     Send
                            //   </Button>
                            // ),
                          }}
                        />

                          <Box sx={{display:"flex", flexFlow:"row nowrap", width:"100%"}}>
                          {currentReplyId && 
                          <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", width:"35%", }}>
                            <Typography fontFamily={"Lobster"} fontSize="0.75rem" sx={{color: "back.main", border:"2px solid", borderColor:"back.dark", backgroundColor: "secondary.main", borderRadius: "20px", p:1, mt:1,}}>
                            Reply: {currentReplyId}
                              </Typography>
                          </Box>
                          }



                          <Button
                          type="submit"
                          variant="contained"
                          
                          sx={{ width: "100%", my: 2, mx: 1 }}
                        >
                          Send
                        </Button>
                        </Box>
                      </Box>  }
                    </Box>
      
                    
                    <Box
                      sx={{
                        display: "flex",
                        flexFlow: "column nowrap",
                        alignItems: "center",
                        // justifyContent: "center",
                        minHeight: "60vh",
                        height: "100%",
                        overflow: "auto",
                        border: "2px solid black",
                      }}
                    >
                      {loadingComments ? <LoadingCommentsIndicator /> :comments.length > 0 ? (
                        comments.map((comment) => (
                          <CommentElement
                            replyStatus={Boolean(comment.parent_id)}
                            commentId={comment.id}
                            replyId={comment.parent_id}
                            author={comment.author}
                            replyAuthor={comment.reply_author}
                            body={comment.body}
                            replyBody={comment.reply_body}
                            likes={comment.likes}
                            dislikes={comment.dislikes}
                            timePosted={comment.time_posted}
                            currentReplyId={currentReplyId}
                            setCurrentReplyId={setCurrentReplyId}
                            editCommentId={editCommentId}
                            setEditCommentId={setEditCommentId}
                            fetchComments={fetchComments}
                          />
                        ))
                      ) :  (
                        <Typography
                          variant="h3"
                          color="secondary.main"
                          fontWeight="bold"
                          fontFamily={"Lobster"}
                          sx={{ pt: 1, pl: 3, pr: 3, userSelect:"none" }}
                        >
                          No Comments Yet
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                )}
              </Box>

              <EditPost
                editPostOpen={editPostOpen}
                handleEditPostClose={handleEditPostClose}
              />
              <DeletePost
                deletePostOpen={deletePostOpen}
                handleDeletePostClose={handleDeletePostClose}
                handleClose={handleClose}
              />
              <Grid item></Grid>
            </Box>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
};


export default PostPage;
