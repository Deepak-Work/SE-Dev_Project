import { useNavigate } from "react-router";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import Explore from "./Explore";

const NavBar = () => {
  const navigate = useNavigate();
  
  const [exploreOpen, setExploreOpen] = useState<boolean>(false);
    
  const handleExploreOpen : () => void = () => setExploreOpen(true);
  const handleExploreClose : () => void = () => setExploreOpen(false);

  const theme = createTheme({
    palette: {
      text: {
        primary: "#ffffff",
      },
    },
  });

  const handleLogout = () => {
    let logout = async () => {
      await fetch("/api/authentication/logout", {
        method: "GET",
      });
    };
    logout();
    navigate("/login");
  };

  // TODO: Add drawer/fix hamburger menu when zooming in

  return (
    <ThemeProvider theme={theme}>
      <AppBar
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
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "3px solid black",
              boxShadow:
                "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
              background:
                "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
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
                <Typography
                  fontFamily="RampartOne"
                  variant="h4"
                  color="text.primary"
                  sx={{ ml: "20px" }}
                >
                  CampusConnect
                </Typography>

                <MenuItem sx={{ ml: "20px", py: "6px", px: "12px" }}>
                  <Typography variant="h6" color="text.primary">
                    My Clubs
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Typography variant="h6" color="text.primary" onClick={handleExploreOpen}>
                    Explore
                  </Typography>
                </MenuItem>
                <MenuItem  onClick={() => navigate("/club/application")}sx={{ py: "6px", px: "12px" }}>
                  <Typography variant="h6" color="text.primary">
                    Create a Club
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
              <Tooltip title="Profile Page">
                <IconButton sx={{ color: "white", mr: "5px" }}>
                  <AccountBoxIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton
                  onClick={handleLogout}
                  sx={{ color: "white", mr: "20px" }}
                >
                  <LogoutIcon fontSize="large" />
                </IconButton>
              </Tooltip>
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

      <Explore exploreOpen={exploreOpen} handleExploreOpen={handleExploreOpen} handleExploreClose={handleExploreClose} />
      
    </ThemeProvider>
  );
};

export default NavBar;
