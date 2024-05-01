import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import CustomPaletteOptions from "../UI/CustomPaletteOptions";

const LoadingIndicator = () => {
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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexFlow: "column nowrap",
          minHeight: "100vh",
          minWidth: "100vw",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          background:
            "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
        }}
      >
        <Box         sx={{
          display: "flex",
          flexFlow: "column nowrap",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}>
        <Typography
          variant="h1"
          color="back.light"
          sx={{ml: "5px", fontFamily: "RampartOne", wordBreak:"break-all" }}
        >
          CampusConnect
        </Typography>
        <CircularProgress size={200} sx={{ color: "back.light" }} />
        </Box>
      </Box>
    </ThemeProvider>
  );

  {
    /* You can add additional styling or animation for the loading indicator */
  }
};

export default LoadingIndicator;
