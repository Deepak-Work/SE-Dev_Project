import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box, Paper, Typography, Button} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';

import { purple } from "@mui/material/colors";

import NavBar from "../LandingPage/NavBar";

// interface ClubInfo {
//   name: string;
//   description: string;
//   location: string;
//   email: string;
//   pnum: string;
//   website: string;

//   members: any[];
//   // posts: any[];
//   // events: any[];
//   // auditLog: any[];
// }

const ClubPage = () => {
  const theme = createTheme({
    palette: {
        primary: purple,
    }
  });

  //   const info: ClubInfo = {

  //   }

  const { name, id } = useParams();

  useEffect(() => {
    let fetchClub = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/clubs/fetch/${name}/${id}`, {
            method: "GET",
        });
        if (response.ok) {
            response.json().then((value) => {
                console.log(value);
            });
        }
    }
    fetchClub();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          overflow: "auto",
          minHeight: "100vh",
          alignItems: "center",
          flexDirection: "column",
          background: "linear-gradient(to right, #a68bf0, #8e63d5, #7d3ebd);",
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
              height: "75px",
              background:
                "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
              display: "flex",
              
              alignItems: "left",
              paddingRight: "10px",
            }}
          >

            <Box sx={{width: 50, height: 50, backgroundColor: "white", borderRadius: "5px", ml: 2, mt: 1 }}></Box>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "left", justifyContent: "left" }}>
                <Typography ml={2} variant="h5" color="white">
                Club Name
                </Typography>
                <Typography ml={2} variant="h5" color="white">
                Club Description
                </Typography>
            </div>

            <div style={{display: "flex", marginLeft: "auto"}}>
                <CreateIcon fontSize="large" sx={{mt: 2, mr: 4, color: "white"}}/>
                <SettingsIcon fontSize="large" sx={{mt: 2, mr: 4, color: "white"}}/>
                <Button color="primary" variant="contained" sx={{ height: "50px", width: "100px", mt: 1, mr: 4}}>Follow</Button>
                <Button color="primary" variant="contained" sx={{ height: "50px", width: "100px", mt: 1}}>Members List</Button>
            </div>

          </Box>

          <div style={{display: "flex", flexDirection: "row"}}>
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
                <Typography ml={4} mt={1} variant="h3" color="white">Posts</Typography>
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
            <Typography ml={3} mt={1} variant="h3" color="white">Events</Typography>
          </Box>

          </div>



        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default ClubPage;
