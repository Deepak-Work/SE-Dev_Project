import { Box, Button, Container, Dialog, DialogTitle, Fab, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Cookies from "js-cookie";

type ImageFile = File | null;

interface DeletePost {
  title: string;
  body: string;
  id: string;
  image? : string;
}

interface DeletePostProps {
    deletePostOpen : boolean;
    handleDeletePostClose : (event?:object, reason?:string) => void;
    handleClose : (reason:string) => void;
    // handleDeleteSubmit : (event: React.FormEvent<HTMLFormElement>) => void;
}

const DeletePost = (props: DeletePostProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {deletePostOpen, handleDeletePostClose, handleClose } = props;
  

  const handleDeleteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);

    const image: File | null = data.get("delete-post-image") as File;

    const form = new FormData();

    form.append("title", data.get("delete-post-title") as string);
    form.append("body", data.get("delete-post-body") as string);
    form.append("id", id as string)
    if (image) form.append("image", image);


    const headers = {
    //   "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    const response: Response = await fetch(`/api/posts/post/delete`, {
      method: "PUT",
      headers: headers,
      body: form,
    });

    if (response.ok) {
      handleDeletePostClose();
      window.location.reload();
      console.log("New Post Deleteed Successfully");
    } else {
      console.log("Delete Post failed");
    }
  };

    return (
        <Dialog open={deletePostOpen} onClose={handleDeletePostClose} fullWidth maxWidth={"sm"} PaperProps={{ sx:{border: "4px solid", borderColor: 
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
            <Typography component="h2" variant="h2" fontFamily={"RampartOne"}>
              Delete Post
            </Typography>
          </Container>
        </DialogTitle>

        {/* <DialogContent> */}
        <Container
          component="div"
          sx={{
            height: "100%",
            py: 3,
            backgroundColor: "back.main",
            display:"flex",
            flexFlow: "row nowrap",
            justifyContent:"center",
            alignContent: "center",
            border: "2px solid #000",
          }}
        >
          {/* <Box component="form" onSubmit={handleDeleteSubmit}>
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
                  name="delete-post-title"
                  id="delete-post-title"
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
                  name="delete-post-body"
                  id="delete-post-body"
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
                      id="delete-post-image"
                      name="delete-post-image"
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
                    {deletePostImage && (
                      <>
                        <Typography
                          component="span"
                          color="primary"
                          sx={{ pl: 5, fontSize: "0.75rem" }}
                        >
                          {deletePostImage.name}
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
          </Box> */}
          <Box sx={{            
            display:"flex",
            flexFlow: "column nowrap",
            justifyContent:"center",
            alignContent: "center",}}>
          <Typography component="h3" variant="h3" fontFamily={"Lobster"}>Are You Sure?</Typography>    
          <Box sx={{display:"flex", flexFlow:"column nowrap"}}>
          <Button onClick={() => handleClose("delete")} sx={{display:"flex", margin: 2, border:"2px solid", borderColor:"back.dark", borderRadius:"10px", backgroundColor:"back.light", "&:hover": {backgroundColor:"#0F0"}}}>
            <Typography fontFamily={"Lobster"}>
                Yes
            </Typography>
          </Button>
          <Button onClick={() => handleDeletePostClose()} sx={{display:"flex", margin: 2, border:"2px solid", borderColor:"back.dark", borderRadius:"10px", backgroundColor:"back.light", "&:hover": {backgroundColor:"#F00"}}}>            <Typography fontFamily={"Lobster"}>
                No
            </Typography></Button>
          </Box>
          </Box>
        </Container>
        {/* </DialogContent> */}
      </Dialog>
    );
}

export default DeletePost;