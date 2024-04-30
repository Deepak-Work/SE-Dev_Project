import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import NavBar from "./NavBar";
import Calendar from "./Calendar";
import Newsletter from "./Newsletter";
import LoadingIndicator from "../Utils/LoadingIndicator";
import CustomPaletteOptions from "../UI/CustomPaletteOptions";

interface Props {
  username: string;
  isAuth: boolean;
  loading: boolean;
}

const LandingPage = (props: Props) => {
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

  if (!props.isAuth && !props.loading) {
    return <p>You are not authorized to view this page.</p>;
  }

  return (
    <>
      {!props.isAuth ? (
        <LoadingIndicator />
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
            <NavBar username={props.username} />

            <Grid
              mt={0}
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
