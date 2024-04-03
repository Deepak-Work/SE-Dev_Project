import { DialogContent, DialogTitle, Dialog } from "@mui/material";
import { useState, useEffect } from "react";

interface Club {
    name: string;
    description: string;
    member_count: number;
    organizer: string;
    image : File
}

const Explore  = () => {
    const [clubs, setClubs] = useState<Club[] | null>(null);

    const [exploreOpen, setExploreOpen] = useState<boolean>(false);
    
    const handleExploreOpen : () => void = () => setExploreOpen(true);
    const handleExploreClose : () => void = () => setExploreOpen(false);


    return(
        <>
<Dialog open={exploreOpen} onClose={handleExploreClose} fullWidth maxWidth={"md"}>
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
              Club
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
            border: "2px #000 solid",
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
        
        
        </>

    );


}

export default Explore;