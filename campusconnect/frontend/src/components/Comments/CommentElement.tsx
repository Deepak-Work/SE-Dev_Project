import { useState, useEffect } from "react";
import { useParams, } from "react-router-dom";

import convertDate from "../Functions/convertDate";
import formatCount from "../Functions/formatCount";
import Cookies from "js-cookie";

import { Box, IconButton, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ReplyIcon from "@mui/icons-material/Reply";

interface CommentProps {
  replyStatus: boolean;
  commentId: number;
  replyId?: number;
  author: string;
  replyAuthor?: string;
  body: string;
  replyBody?: string;
  likes: number;
  dislikes: number;
  timePosted: string;
  currentReplyId: number | null;
  setCurrentReplyId: (value: number | null) => void;
  editCommentId: number | null;
  setEditCommentId: (value: number | null) => void;
  fetchComments: (value: number) => void;
}

const CommentElement = (props: CommentProps) => {
  const {
    replyStatus,
    commentId,
    author,
    replyAuthor,
    body,
    replyBody,
    likes,
    dislikes,
    timePosted,
    currentReplyId,
    setCurrentReplyId,
    editCommentId,
    setEditCommentId,
    fetchComments,
  } = props;

  const { id } = useParams();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);

  const CommentLikeDislikeStatus = async () => {
    const response = await fetch(
      `/api/posts/comment/${commentId}/like-dislike`,
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
        setIsLiked(value.like_status);
        setIsDisliked(value.dislike_status);
      });
    }
  };

  const handleCommentLike = async () => {
    if (!isLiked) {
      const response = await fetch(`/api/posts/comment/${commentId}/like`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsLiked(true);
        console.log("Comment Liked");
      }
    } else {
      const response = await fetch(`/api/posts/comment/${commentId}/unlike`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsLiked(false);
        console.log("Comment Unliked");
      }
    }
    fetchComments(Number(id));
  };

  const handleCommentDislike = async () => {
    if (!isDisliked) {
      const response = await fetch(`/api/posts/comment/${commentId}/dislike`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        setIsDisliked(true);
        console.log("Comment Disliked");
      }
    } else {
      const response = await fetch(
        `/api/posts/comment/${commentId}/undislike`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorzation: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.ok) {
        setIsDisliked(false);
        console.log("Comment Undisliked");
      }
    }
    fetchComments(Number(id));
  };

  const handleReply = () => {
    setEditCommentId(null);

    if (currentReplyId == commentId) {
      setCurrentReplyId(null);
      return;
    }
    setCurrentReplyId(commentId);
  };
  const handleCommentEdit = () => {
    setCurrentReplyId(null);

    if (editCommentId === commentId) {
      setEditCommentId(null);
      return;
    }

    setEditCommentId(commentId);
  };

  const handleCommentDelete = async () => {
    const headers = {
      // "Content-Type":"application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    let response = await fetch(`/api/posts/comment/${commentId}/delete`, {
      method: "DELETE",
      headers: headers,
    });

    if (response.ok) {
      setCurrentReplyId(null);
      setEditCommentId(null);
      fetchComments(Number(id));
    }
  };

  useEffect(() => {
    fetchComments(Number(id));
    CommentLikeDislikeStatus();
  }, []);

  return (
    <Box
      sx={{
        border: "2px solid",
        borderColor: "back.dark",
        borderRadius: "10px",
        backgroundColor: "secondary.main",
        width: "95%",
        minHeight: "50%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexFlow: "column nowrap",
        my: 2,
      }}
    >
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Typography
          component="h6"
          variant="h6"
          fontFamily={"Lobster"}
          fontSize="0.8rem"
          sx={{ color: "back.main", wordBreak: "break-word" }}
        >
          {author} - {convertDate(new Date(timePosted))}
        </Typography>
      </Box>

      {replyStatus && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "75%",
            minHeight: "15%",
            backgroundColor: "back.light",
            border: "2px solid",
            borderColor: "back.light",
            borderRadius: "10px",
            mt: 0,
            overflow: "auto",
          }}
        >
          <Typography
            component="span"
            variant="subtitle2"
            fontFamily={"Lobster"}
            sx={{ ml: 2, wordBreak: "break-word" }}
          >
            {replyAuthor} -{" "}
            {replyBody && replyBody.length < 20
              ? replyBody
              : replyBody?.substring(0, 20) + "..."}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          width: "90%",
          minHeight: "30%",
          maxHeight: "60%",
          overflow: "auto",
          backgroundColor: "back.light",
          border: "2px solid",
          borderColor: "back.dark",
          borderRadius: "10px",
          wordBreak: "break-word",
          whiteSpace: "pre-line",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          my: 1,
        }}
      >
        <Typography
          component="span"
          variant="subtitle1"
          color="secondary.dark"
          fontFamily={"Lobster"}
          sx={{ mx: 2 }}
        >
          {body}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
          width: "100%",
          minHeight: "30%",
          backgroundColor: "back.light",
          border: "2px solid",
          borderColor: "back.dark",
          borderRadius: "10px",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "space-around",
            ml: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "0px solid",
              borderColor: "back.dark",
              borderRadius: "10px",
              backgroundColor: "back.light",
            }}
          >
            <Typography
              color="back.dark"
              fontWeight="bold"
              fontFamily={"Lobster"}
              sx={{ color: "secondary.dark" }}
            >
              {formatCount(likes)}
            </Typography>

            <IconButton
              onClick={handleCommentLike}
              aria-label="Like comment"
              sx={{
                "&:hover": {
                  backgroundColor: "back.main",
                },
              }}
            >
              {isLiked ? (
                <ThumbUpAltIcon sx={{ color: "primary.main" }} />
              ) : (
                <ThumbUpAltIcon />
              )}
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "0px solid",
              borderColor: "back.dark",
              borderRadius: "10px",
              backgroundColor: "back.light",
            }}
          >
            <Typography
              color="back.dark"
              fontWeight="bold"
              fontFamily={"Lobster"}
              sx={{ color: "secondary.dark" }}
            >
              {formatCount(dislikes)}
            </Typography>

            <IconButton
              onClick={handleCommentDislike}
              aria-label="dislike comment"
              sx={{
                "&:hover": {
                  backgroundColor: "back.main",
                },
              }}
            >
              {isDisliked ? (
                <ThumbDownIcon sx={{ color: "primary.main" }} />
              ) : (
                <ThumbDownIcon />
              )}
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "0px solid",
              borderColor: "back.dark",
              borderRadius: "10px",
              backgroundColor: "back.light",
            }}
          >
            <IconButton
              onClick={handleReply}
              aria-label="reply comment"
              sx={{
                "&:hover": {
                  backgroundColor: "back.main",
                },
              }}
            >
              {currentReplyId === commentId ? (
                <ReplyIcon sx={{ color: "primary.main" }} />
              ) : (
                <ReplyIcon />
              )}
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexFlow: "row nowrap" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "0px solid",
              borderColor: "back.dark",
              borderRadius: "10px",
              backgroundColor: "back.light",
            }}
          >
            <IconButton
              onClick={handleCommentEdit}
              aria-label="Edit comment"
              sx={{
                "&:hover": {
                  backgroundColor: "back.main",
                },
              }}
            >
              {editCommentId === commentId ? (
                <EditIcon sx={{ color: "primary.main" }} />
              ) : (
                <EditIcon />
              )}
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "0px solid",
              borderColor: "back.dark",
              borderRadius: "10px",
              backgroundColor: "back.light",
            }}
          >
            <IconButton
              onClick={handleCommentDelete}
              aria-label="Delete comment"
              sx={{
                "&:hover": {
                  backgroundColor: "back.main",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentElement;
