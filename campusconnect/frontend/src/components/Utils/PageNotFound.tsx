import Box from "@mui/material/Box";
import { ThemeProvider, Typography } from "@mui/material";

import theme from "../UI/theme";

const PageNotFound = () => {
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
          sx={{ ml: "5px", fontFamily: "RampartOne" }}
        >
          Error 404 - Page Not Found
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default PageNotFound;
