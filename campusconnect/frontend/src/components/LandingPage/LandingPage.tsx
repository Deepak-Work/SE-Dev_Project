import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import NavBar from "./NavBar";
import Calendar from "./Calendar";
import Newsletter from "./Newsletter";

import { useEffect } from "react";

interface Props {
  isAuth: boolean;
}

const LandingPage: React.FC<Props> = (props): JSX.Element => {
  // TODO: Landing page should be protected (only logged in users able to see it)

  // const navigate = useNavigate();
  // const createNewClub = () => {

  //    // event?.preventDefault();

  //    // navigate('/create-club');

  // }

  useEffect(() => {
    console.log(props.isAuth);
  }, [])

  const theme = createTheme();

  return (
    <>
      {!props.isAuth ? (
        <p>You are not authorized to view this page.</p>
      ) : (
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
            <NavBar />

            <Grid
              mt={15}
              container
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Newsletter />
              </Grid>
              <Grid item>
                <Calendar />
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
};

export default LandingPage;
