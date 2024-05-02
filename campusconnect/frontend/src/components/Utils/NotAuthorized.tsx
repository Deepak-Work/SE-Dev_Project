import Box from "@mui/material/Box";
import { ThemeProvider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import theme from "../UI/theme";

const NotAuthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/login"), 5000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexFlow: "column nowrap",
          height: "100vh",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          background:
            "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
        }}
      >
        <Typography
          variant="h1"
          color="back.light"
          sx={{ ml: "5px", fontFamily: "Rampart One" }}
        >
          Page Not Authorized
        </Typography>
        <Typography
          variant="h4"
          color="back.light"
          sx={{ ml: "5px", fontFamily: "Rampart One" }}
        >
          Redirecting in 5 Seconds...
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default NotAuthorized;
