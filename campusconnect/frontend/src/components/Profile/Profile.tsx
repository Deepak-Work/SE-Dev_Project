import { useState, useEffect} from "react";

import { useParams } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  Link,
  Box,
  CssBaseline,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";

import NavBar from "../LandingPage/NavBar";
import ProfileSettings from "./ProfileSettings";
import LoadingIndicator from "../Utils/LoadingIndicator";

interface Props {
  isAuth: boolean;
  loading: boolean;
}

interface User {
  name: string;
  username: string;
  email: string;
  image: string;
  is_self: boolean;
}

const Profile = (props: Props) => {
  const { name } = useParams();

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const handleSettingsOpen: () => void = () => setSettingsOpen(true);
  const handleSettingsClose: () => void = () => setSettingsOpen(false);
  
  const [user, setUser] = useState<User>({} as User);
  const [userExists, setUserExists] = useState<boolean>(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#7108d8",
      },
      secondary: {
        main: "#8B139C",
      },
    },
  });

  useEffect(() => {
    let fetchUser = async () => {
      let response = await fetch(`/api/prof/profile/${name}`, {
        method: "GET",
      });

      if (response.ok) {
      response.json().then((value) => {
          setUser(value);
          setUserExists(true);
          console.log(value);
        });
      } else {
        
        setUserExists(false);
      }
    };
    fetchUser();
  }, []);

  if (!props.isAuth && !props.loading) {
    return <p>You are not authorized to view this page.</p>;
  }

  if(!userExists && !props.loading) {
    return (
      <p>User does not exist.</p>
    )
  }

  return (
    <>
      {!props.isAuth && !userExists? (
        <LoadingIndicator />
      )
      : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              overflow: "auto",
              minHeight: "100vh",
              alignItems: "center",
              flexDirection: "column",
              background:
                "linear-gradient(to right, #a68bf0, #8e63d5, #7d3ebd);",
            }}
          >
            <NavBar username={user.username}/>
            <Box
              sx={{
                mt: 15,
                width: "600px",
                height: "700px",
                // display: "flex",
                // alignItems: "center",
                // flexDirection: "column",
                border: "5px solid #000000",
                borderRadius: "10px",
                bgcolor: "primary.main",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "20px",
                  marginTop: "10px",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    borderRadius: "10px",
                    border: "3px solid #000000",
                    height: "100px",
                    width: "125px",
                    background: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // paddingRight: "10px",
                  }}
                  src={user.image}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "20px",
                  }}
                >
                  <Typography color="white" variant="h5">
                    {user.name}
                  </Typography>
                  <Typography color="white" variant="h6">
                    {user.username}
                  </Typography>
                  <Link
                    href={`mailto:${user.email}`}
                    underline="hover"
                    sx={{
                      color: "white",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                        textDecorationColor: "white",
                      },
                    }}
                  >
                    <Typography color="white" variant="h6">
                      {user.email}
                    </Typography>
                  </Link>
                  {/* <Typography variant="h5">{us}</Typography> */}
                </Box>

                {user.is_self ? (
                        <Box sx={{ marginLeft: "200px" }}>
                        <Tooltip title="Profile Settings">
                          <IconButton onClick={handleSettingsOpen} sx={{ color: "white" }}>
                            <SettingsIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>          
                ) : (
                  <></>
                )}


              </Box>
            </Box>
          </Box>
          <ProfileSettings user={user} settingsOpen={settingsOpen} handleSettingsOpen={handleSettingsOpen} handleSettingsClose={handleSettingsClose} />
        </ThemeProvider>
      )}
    </>
  );
};

export default Profile;
