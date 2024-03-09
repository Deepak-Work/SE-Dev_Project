import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const NavBar = () => {
  const theme = createTheme({
    palette: {
      text: {
        primary: "#ffffff",
      },
    },
  });

  // TODO: Will have to implement logout functionality later

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem disabled sx={{ py: "6px", px: "12px" }}>
                  <Typography variant="h4" color="text.primary">
                    CampusConnect
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ ml: "20px", py: "6px", px: "12px" }}>
                  <Typography variant="h6" color="text.primary">
                    My Clubs
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Typography variant="h6" color="text.primary">
                    My Profile
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <SettingsIcon sx={{mr: '20px', ":hover": {cursor: 'pointer'}}}/>
              <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                target="_blank"
              >
                Logout
              </Button>
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
