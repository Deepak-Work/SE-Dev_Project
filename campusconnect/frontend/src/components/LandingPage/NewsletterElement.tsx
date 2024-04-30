import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Tooltip,
  Box,
  Avatar,
} from "@mui/material";

// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import MoreIcon from "@mui/icons-material/More";
import logo from "../../assets/CampusConnectLogo.svg";
import convertDate from "../Functions/convertDate";

interface NewsletterProps {
  clubId: number;
  clubName: string;
  clubImage: string;
  postId: number;
  title: string;
  timePosted: string;
  author: string;
  summary: string;
  // userAvatar: string;
}

/**
 * Newsletter Component
 *
 * This component renders a single post on the newsletter page
 */

const NewsletterElement: React.FC<NewsletterProps> = ({
  clubName,
  clubId,
  clubImage,
  postId,
  title,
  timePosted,
  author,
  summary,
}) => {
  const navigate = useNavigate();

  //   const [postInfo, setPostInfo] = useState<NewsletterProps>({} as NewsletterProps);

  //   const fetchNewsletter = async () => {
  //     let response = await fetch(`/api/posts/post/${post_id}`, {
  //       method: "GET",
  //     });
  //     if (response.ok) {
  //       response.json().then((value) => {
  //         const posts = value.post_data;
  //         const postInfo: NewsletterProps = {
  //           username: posts.author,
  //           body: posts.body,
  //           title: posts.title,
  //           likes: posts.likes,
  //           dislikes: posts.dislikes,
  //           totalComments: posts.total_comments,
  //           time_posted: posts.time_posted,
  //           post_id: posts.id,
  //         };
  //         setNewsletterInfo(postInfo);
  //       });
  //     } else {
  //       console.log("Newsletter cannot be loaded");
  //     }
  //   };

  //   useEffect(() => {
  //     fetchNewsletter();
  //     getLikeDislikeStatus();
  //   }, []);

  //   const handleNewsletterClick = async (event: React.MouseEvent<HTMLDivElement>) => {
  //     event.preventDefault();

  //     console.log("Direct to post page");

  //     console.log(post_id);

  //     navigate(`/post/${post_id}`);
  //   };

  // Render the post
  return (
    <Card
      sx={{
        //  display:"flex",
        border: "3px solid",
        borderColor: "back.dark",
        borderRadius: "35px",
        // width: "450px",
        minWidth: "600px",
        textWrap: "balance",
      }}
    >
      {/* Newsletter Header */}
      {/* <CardHeader
        color="white"
        // title={title} // The title is the username of the user
        // titleTypographyProps={{
        //   onClick: () => navigate(`/post/${post_id}`),
        //   sx: {
        //     fontFamily: "Lobster",
        //     color: "back.light",
        //     cursor: "pointer",
        //     textDecoration: "underline",
        //     textDecorationColor: "back.dark",
        //     textDecorationThickness: "3px",
        //     "&:hover": { color: "back.dark" },
        //   },
        // }}
        // subheader={`${username} - ${time_posted}`} // The subheader is the post date
        // subheaderTypographyProps={{
        //   sx: { color: "back.light", fontFamily: "Lobster" },
        // }}
        sx={{
          // minWidth: "30%",maxWidth:"35%",
          backgroundColor: "secondary.main",
        }}
      > 

        </CardHeader> */}

      <CardContent
        sx={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: "back.main",
          gap:2,
        }}
      >
        <Box
          sx={{
            borderRadius: "10px",
            border: "3px solid #000000",
            maxHeight: "200px",
            maxWidth: "50%",
            backgroundColor: "primary.main",
            // background:
            //   "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <Box
            component="img"
            sx={{
              width: "50px",
              height: "50px",
              border: "4px solid",
              borderColor: "back.light",
              borderRadius: "5px",
              mx: 1,
              my: 1,
              backgroundColor: "#fff",
            }}
            alt="Club image"
            src={clubImage}
          />
          <Typography onClick={() => navigate(`/club/${clubName}/${clubId}`)} fontFamily={"Lobster"} sx={{color: "back.light", mx: 1, wordBreak:"break-word", cursor:"pointer", "&:hover" : {color:"back.dark"}}}>{clubName}</Typography>
        </Box>
        <Box
          sx={{
            borderRadius: "10px",
            border: "3px solid #000000",
            height: "90px",
            width: "80%",
            backgroundColor: "primary.main",
            // background:
            //   "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
            textAlign:"center",
            justifyContent: "start",
            overflow: "auto",
          }}
        >
          <Typography                       variant="h6"
                      color="white"
                      fontWeight="bold"
                      fontFamily={"Lobster"}
                      onClick={() => navigate(`/post/${postId}`)}
                      sx={{ pt: 1, pl: 0, cursor:"pointer", "&:hover" : {color:"back.dark"} }}>{title}</Typography>
          <Typography                       variant="subtitle1"
                      color="white"
                      fontFamily={"Lobster"}
                      sx={{ pt: 1, pl: 0 }}>
            {author} - {convertDate(new Date(timePosted))}
          </Typography>
        </Box>

        <Box
          sx={{
            borderRadius: "10px",
            border: "3px solid #000000",
            height: "110px",
            width: "100%",
            backgroundColor: "primary.main",
            // background:
            //   "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "start",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <Typography
            fontFamily="serif"
            fontWeight={500}
            sx={{
              display:"flex",
              alignSelf:"center",
              textAlign: "center",
              color: "back.light",
              pt: 1,
            //   border: "2px solid",
            //   borderColor: "back.dark",
            //   borderRadius: "20px",
            //   backgroundColor: "back.light",
            //   overflowWrap: "break-word",
            }}
          >
            {" "}
            {summary.length > 0 ? summary : "No Summary..."}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsletterElement;
