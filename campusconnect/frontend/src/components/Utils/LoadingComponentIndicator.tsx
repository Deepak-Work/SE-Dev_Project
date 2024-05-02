import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ThemeProvider, Typography } from "@mui/material";
import theme from "../UI/theme";

const LoadingComponentIndicator = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexFlow: "column nowrap",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          rowGap: 10,
          background:
            "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
        }}
      >
        <Typography
          variant="h4"
          color="back.light"
          sx={{ml: "5px", mt:-10, fontFamily: "Rampart One" }}
        >
          CampusConnect
        </Typography>
        <CircularProgress size={100} sx={{ color: "back.light" }} />
      </Box>
    </ThemeProvider>
  );

};

export default LoadingComponentIndicator;
