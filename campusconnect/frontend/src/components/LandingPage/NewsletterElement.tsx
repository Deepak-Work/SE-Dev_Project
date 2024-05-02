import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Card, CardContent, Typography } from "@mui/material";

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
}

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
  return (
    <Card
      sx={{
        border: "3px solid",
        borderColor: "back.dark",
        borderRadius: "35px",
        minWidth: "600px",
        textWrap: "balance",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: "back.main",
          gap: 2,
        }}
      >
        <Box
          sx={{
            borderRadius: "10px",
            border: "3px solid #000000",
            maxHeight: "200px",
            maxWidth: "50%",
            backgroundColor: "primary.main",

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
          <Typography
            onClick={() => navigate(`/club/${clubName}/${clubId}`)}
            fontFamily={"Lobster"}
            sx={{
              color: "back.light",
              mx: 1,
              wordBreak: "break-word",
              cursor: "pointer",
              "&:hover": { color: "back.dark" },
            }}
          >
            {clubName}
          </Typography>
        </Box>
        <Box
          sx={{
            borderRadius: "10px",
            border: "3px solid #000000",
            height: "90px",
            width: "80%",
            backgroundColor: "primary.main",
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "start",
            overflow: "auto",
          }}
        >
          <Typography
            variant="h6"
            color="white"
            fontWeight="bold"
            fontFamily={"Lobster"}
            onClick={() => navigate(`/post/${postId}`)}
            sx={{
              pt: 1,
              pl: 0,
              cursor: "pointer",
              "&:hover": { color: "back.dark" },
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="white"
            fontFamily={"Lobster"}
            sx={{ pt: 1, pl: 0 }}
          >
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
              display: "flex",
              alignSelf: "center",
              textAlign: "center",
              color: "back.light",
              pt: 1,
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
