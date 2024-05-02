import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ThemeProvider, Typography } from "@mui/material";
import theme from "../UI/theme";

const LoadingIndicator = () => {
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
        <Box
          sx={{
            display: "flex",
            flexFlow: "column nowrap",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Typography
            variant="h1"
            color="back.light"
            sx={{ ml: "5px", fontFamily: "Rampart One", wordBreak: "break-all" }}
          >
            CampusConnect
          </Typography>
          <CircularProgress size={200} sx={{ color: "back.light" }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LoadingIndicator;
