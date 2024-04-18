import { Box, Button, Container, Dialog, DialogTitle, Fab, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Cookies from "js-cookie";

type ImageFile = File | null;

interface CreatePost {
  title: string;
  body: string;
  id: string;
  image? : string;
}

interface CreatePostProps {
    createPostOpen : boolean;
    handleCreatePostClose : (event?:object, reason?:string) => void;
}

const CreatePost = (props: CreatePostProps) => {

  const {createPostOpen, handleCreatePostClose } = props;
  const [createPostImage, setCreatePostImage] = useState<ImageFile>(null);
  const { id } = useParams();

  const handlePostImageSelect = (event: any) => {
    let imageFiles = event.target.files;

    if (!imageFiles || imageFiles.length == 0) {
      return;
    }

    setCreatePostImage(imageFiles[0]);
  };

  const handlePostImageRemove = () => {
    setCreatePostImage(null);
  };
  
  

  const handlePostSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    const response: Response = await fetch("/api/posts/new-post", {
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



    return (
        <Dialog open={createPostOpen} onClose={handleCreatePostClose} fullWidth maxWidth={"md"} PaperProps={{ sx:{border: "4px solid", borderColor: 
        "back.dark", borderRadius: "20px",} }}>
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
            <Typography component="h2" variant="h2" fontFamily={"Lobster"}>
              New Post
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
            // border: "2px #000 solid",
            borderRadius: "0px",
          }}
        >
          <Box component="form" onSubmit={handlePostSubmit}>
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
                          onClick={handlePostImageRemove}
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
    );
}

export default CreatePost;