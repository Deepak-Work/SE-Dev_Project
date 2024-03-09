import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { CssBaseline } from "@mui/material";

import NavBar from "./NavBar";
import Calendar from "./Calendar";
import Newsletter from "./Newsletter";

const LandingPage = () => {
  // TODO: Landing page should be protected (only logged in users able to see it)

  // const navigate = useNavigate();
  // const createNewClub = () => {

  //    // event?.preventDefault();

  //    // navigate('/create-club');

  // }

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(0deg, rgba(83,0,255,1) 0%, rgba(148,41,185,1) 100%)",
        }}
      >
        <CssBaseline />
        <NavBar />
        <Box
          sx={{
            flex: 1,
            padding: theme.spacing(2),
            textAlign: "center",
            order: 1, 
          }}
        >
          <Newsletter />
        </Box>

        <Box
          sx={{
            flex: 1,
            padding: theme.spacing(2),
            textAlign: "center",
            order: 2,
          }}
        >
          <Calendar />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
