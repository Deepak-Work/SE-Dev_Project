import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  Fab,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Cookies from "js-cookie";

type ImageFile = File | null;

interface EditPost {
  title: string;
  body: string;
  id: string;
  image?: string;
}

interface EditPostProps {
  editPostOpen: boolean;
  handleEditPostClose: (event?: object, reason?: string) => void;
  // handleEditSubmit : (event: React.FormEvent<HTMLFormElement>) => void;
}

const EditPost = (props: EditPostProps) => {
  const { editPostOpen, handleEditPostClose } = props;
  const [editPostImage, setEditPostImage] = useState<ImageFile>(null);
  const { id } = useParams();

  const handlePostImageSelect = (event: any) => {
    let imageFiles = event.target.files;

    if (!imageFiles || imageFiles.length == 0) {
      return;
    }

    setEditPostImage(imageFiles[0]);
  };

  const handlePostImageRemove = () => {
    const fileList: HTMLInputElement = document.getElementById(
      "edit-post-image"
    ) as HTMLInputElement;
    fileList.value = "";
    setEditPostImage(null);
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);

    const image: File | null = data.get("edit-post-image") as File;

    const form = new FormData();

    form.append("title", data.get("edit-post-title") as string);
    form.append("body", data.get("edit-post-body") as string);
    form.append("id", id as string);
    if (image) form.append("image", image);

    const headers = {
      //   "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    const response: Response = await fetch(`/api/posts/post/edit`, {
      method: "PUT",
      headers: headers,
      body: form,
    });

    if (response.ok) {
      handleEditPostClose();
      window.location.reload();
    } else {
      console.log("Edit Post failed");
    }
  };

  return (
    <Dialog
      open={editPostOpen}
      onClose={handleEditPostClose}
      fullWidth
      maxWidth={"md"}
      PaperProps={{
        sx: {
          border: "4px solid",
          borderColor: "back.dark",
          borderRadius: "20px",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          background:
            "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
          color: "back.light",
          borderBottom: "4px #000 solid",
          borderRadius: "0",
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
          <Typography component="h2" variant="h2" fontFamily={"Rampart One"}>
            Edit Post
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

      <Container
        component="div"
        sx={{
          py: 3,
          backgroundColor: "back.main",
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
                fullWidth
                required
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
                name="edit-post-body"
                id="edit-post-body"
                fullWidth
                required
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
                  onChange={handlePostImageSelect}
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
                  Image <br></br> Attachment
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
                  {editPostImage && (
                    <>
                      <Typography
                        component="span"
                        color="primary"
                        sx={{ pl: 5, fontSize: "0.75rem" }}
                      >
                        {editPostImage.name}
                      </Typography>
                      <Button onClick={handlePostImageRemove} color="error">
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
    </Dialog>
  );
};

export default EditPost;
