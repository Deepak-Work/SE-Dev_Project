import  { useState, useEffect} from 'react';

import { useParams } from 'react-router-dom';

import {
    Box,
    Button,
    PaletteOptions
  } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";

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
    club: string;
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

  const {id} = useParams();

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
          const posts = value.post_data[0];

          const postInfo: PostProps = {
            body: posts.body,
            title: posts.title,
            likes: posts.likes,
            dislikes: posts.dislikes,
            author: posts.author,
            summary: posts.summary,
            club: posts.club,
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
                    width: 300,
                    height: 100,
                    backgroundColor: "white",
                    borderRadius: "5px",
                    ml: 2,
                    mt: 1,
                  }}>
      <h2>{postInfo.title}</h2>
      <p>{postInfo.body}</p>
      <Button onClick={handleLike} variant="contained" color="primary">
        Like
      </Button>
      <Button onClick={handleDislike} variant="contained" color="secondary">
        Dislike
      </Button>
      <Button onClick={toggleComments} variant="contained">
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </Button>
      {showComments && (
        <Box sx={{ float: 'right', width: '50%' }}>
          <h3>Comments</h3>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
    </ThemeProvider>
  )}
</>
);
};

export default PostComponent;
