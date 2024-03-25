import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box, Paper, Typography, IconButton, Tooltip } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import CreateIcon from "@mui/icons-material/Create";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleIcon from "@mui/icons-material/People";

import { purple } from "@mui/material/colors";

import NavBar from "../LandingPage/NavBar";

interface Props {
  isAuth: boolean;
}
interface ClubInfo {
  name: string;
  description: string;
  location: string;
  email: string;
  pnum: string;
  website: string;

  // members: any[];
  // posts: any[];
  // events: any[];
  // auditLog: any[];
}

const ClubPage = (props: Props) => {
  const theme = createTheme({
    palette: {
      primary: purple,
    },
  });

  const [clubExists, setClubExists] = useState(false);

  const [clubInfo, setClubInfo] = useState<ClubInfo>({} as ClubInfo);

  const { name, id } = useParams();

  useEffect(() => {
    let fetchClub = async () => {
      let response = await fetch(`/api/clubs/fetch/${name}/${id}`, {
        method: "GET",
      });
      if (response.ok) {
        setClubExists(true);
        response.json().then((value) => {
          const club_data = value.club_data;
          const clubInfo: ClubInfo = {
            name: club_data.name,
            description: club_data.description,
            location: club_data.location,
            email: club_data.email,
            pnum: club_data.contact,
            website: club_data.website,
          };
          setClubInfo(clubInfo);
        });
      } else {
        setClubExists(false);
      }
    };
    fetchClub();
  }, []);

  return (
    <>
      {!clubExists || !props.isAuth ? (
        <p>The club does not exist or you are not authorized to view this page.</p>
      ) : (
        <ThemeProvider theme={theme}>
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
            <NavBar />
            <Paper
              elevation={3}
              sx={{
                mt: 15,
                borderRadius: "15px",
                textAlign: "left",
                width: "1000px",
                height: "800px",
                display: "flex",
                flexDirection: "column",
                border: "5px solid #000000",
              }}
            >
              <Box
                sx={{
                  borderRadius: "10px",
                  border: "3px solid #000000",
                  height: "125px",
                  background:
                    "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
                  display: "flex",

                  alignItems: "left",
                  paddingRight: "10px",
                }}
              >
                <Box
                  sx={{
                    width: 300,
                    height: 100,
                    backgroundColor: "white",
                    borderRadius: "5px",
                    ml: 2,
                    mt: 1,
                  }}
                ></Box>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    justifyContent: "left",
                  }}
                >
                  <Typography ml={2} variant="h5" color="white">
                    {clubInfo.name}
                  </Typography>
                  <Typography ml={2} variant="subtitle2" color="white">
                    {clubInfo.description}
                  </Typography>

                  <div style={{ display: "flex", flexDirection: "row", marginLeft: "10px"}}>
                    <Tooltip title="Create Post">
                      <IconButton sx={{ color: "white" }}>
                        <CreateIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Club Settings">
                      <IconButton sx={{ color: "white" }}>
                        <SettingsIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Follow Club">
                      <IconButton sx={{ color: "white" }}>
                        <AddBoxIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Members List">
                      <IconButton sx={{ color: "white" }}>
                        <PeopleIcon />
                      </IconButton>
                    </Tooltip>

                  </div>

                </div>

              </Box>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <Box
                  sx={{
                    borderRadius: "10px",
                    border: "3px solid #000000",
                    height: "75px",
                    width: "200px",
                    background:
                      "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
                    display: "flex",

                    alignItems: "left",
                    paddingRight: "10px",
                    mt: 2,
                    ml: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography ml={4} mt={1} variant="h3" color="white">
                    Posts
                  </Typography>
                </Box>

                <Box
                  sx={{
                    borderRadius: "10px",
                    border: "3px solid #000000",
                    height: "75px",
                    width: "200px",
                    background:
                      "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
                    display: "flex",

                    alignItems: "left",
                    paddingRight: "10px",
                    mt: 2,
                    ml: 50,
                    textAlign: "center",
                  }}
                >
                  <Typography ml={3} mt={1} variant="h3" color="white">
                    Events
                  </Typography>
                </Box>
              </div>
            </Paper>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
};

export default ClubPage;
