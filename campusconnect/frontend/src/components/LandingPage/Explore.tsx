import {
  DialogContent,
  DialogTitle,
  Dialog,
  Container,
  Typography,
  Button,
  Box,
  Grid,
  createTheme,
  ThemeProvider,
  Slide,
  Link,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect } from "react";

import CustomPaletteOptions from "../UI/CustomPaletteOptions";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Club {
  id: number;
  name: string;
  member_count: number;
  image?: string;
}

// interface ClubInfo {
//   name: string;
//   member_count: number;
//   image:
// }

interface ExploreProps {
  exploreOpen: boolean;
  handleExploreOpen: () => void;
  handleExploreClose: () => void;
}

const slideTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Explore = (props: ExploreProps) => {
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

  const navigate = useNavigate();

  const { exploreOpen, handleExploreOpen, handleExploreClose } = props;

  const [clubs, setClubs] = useState<Club[] | null>([]);
  const [followedClubs, setFollowedClubs] = useState<Map<number, number>>(
    new Map()
  );

  useEffect(() => {
    const fetchFollowedClubsID: () => Promise<void> = async () => {
      let response = await fetch(`api/clubs/fetch/GetFollowedClubs`, {
        method: "GET",
      });

      if (response.ok) {
        response.json().then((value) => {
          console.log("FollowedClubs: " + value.clubs_id);
          for (let clubID of value.clubs_id) {
            setFollowedClubs(followedClubs.set(clubID, 1));
          }
        });
      } else {
        console.log("No Clubs Found");
        setFollowedClubs(new Map());
      }
    };

    const fetchClubs: () => Promise<void> = async () => {
      let response = await fetch(`api/clubs/fetch/GetExploreClubs`, {
        method: "GET",
      });
      if (response.ok) {
        response.json().then((value) => {
          const club_data = value.clubs_data;
          console.log("ExploreClubs: " + club_data);
          setClubs(club_data);
        });
      } else {
        console.log("No Clubs Found");
        setClubs([]);
      }
    };

    fetchClubs();
    fetchFollowedClubsID();
    console.log(followedClubs);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={exploreOpen}
        onClose={handleExploreClose}
        TransitionComponent={slideTransition}
        fullWidth
        maxWidth={"sm"}
        PaperProps={{
          sx: {
            height: "100%",
            border: "2px #000 solid",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle
          sx={{
            background:
              "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
            color: "back.light",
            border: "2px #000 solid",
            borderRadius: "15px",
          }}
        >
          <Container
            component="div"
            sx={{
              display: "flex",
              columnGap: 5,
              justifyContent: "center",
            }}
          >
            <Typography
              component="h2"
              variant="h2"
              fontFamily="RampartOne"
              sx={{ color: "back.light" }}
            >
              Explore
            </Typography>
          </Container>
        </DialogTitle>

        <DialogContent
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box
            sx={{
              mt: "3%",
              backgroundColor: "primary.main",
              borderRadius: "20px",
              minHeight: "95%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {clubs && clubs.length != 0 ? (
                <Grid
                  container
                  spacing={0}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {clubs.map((club) => (
                    <Grid
                      item
                      xs={12}
                      sx={{
                        padding: 2,
                        margin: 2,
                        display: "flex",
                        backgroundColor: "back.main",
                        border: "2px back.dark solid",
                        borderRadius: "20px",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          border: "2px solid black",
                          borderRadius: "10px",
                          display: { xs: "none", sm: "block", md: "block" },
                        }}
                      >
                        <img
                          width={50}
                          height={50}
                          src={club.image}
                          alt="Club Logo"
                          style={{ borderRadius: "10px" }}
                        />
                      </Box>
                      <Box
                        sx={{ display: "flex", flexFlow: "column wrap", px: 2 }}
                      >
                        <Box>
                          <Link
                            variant="h5"
                            onClick={() =>
                              navigate(`/club/${club.name}/${club.id}`)
                            }
                            sx={{
                              wordBreak: "break-word",
                              color: "back.dark",
                              cursor: "pointer",
                              "&:hover": { color: "primary.main" },
                            }}
                            underline="always"
                            color="primary.main"
                          >
                            {club.name}
                          </Link>
                        </Box>
                        <Box>
                          {/* <Typography
                          component="span"
                          color="secondary.dark"
                          sx={{ height:"20", fontStyle :"italic", wordBreak:"break-word"}}
                        >
                          {club.description}
                        </Typography> */}
                          <Typography
                            component="span"
                            sx={{
                              color: "primary.main",
                              fontSize: "1rem",
                              fontWeight: "700",
                              fontStyle: "italic",
                            }}
                          >
                            Members: {club.member_count}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexFlow: "column wrap",
                          justifyContent: "center",
                          minWidth: "30%",
                        }}
                      >
                        <Button
                          key={club.id}
                          sx={{
                            backgroundColor: "primary.main",
                            color: "back.light",
                            border: "2px solid #000",
                            borderRadius: "20px",
                            "&:hover": { backgroundColor: "secondary.main" },
                          }}
                        >
                          {followedClubs.has(club.id) ? "Unfollow" : "Follow"}
                        </Button>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexFlow: "column nowrap",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    component="h2"
                    variant="h2"
                    sx={{
                      color: "back.light",
                      fontFamily: "RampartOne",
                      fontSize: "2rem",
                    }}
                  >
                    No Clubs To Show...
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default Explore;
