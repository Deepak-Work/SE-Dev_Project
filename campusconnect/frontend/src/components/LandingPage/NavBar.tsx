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
import logo from "../../assets/CampusConnectLogo.svg";


import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Explore from "./Explore";
import MyClubs from "./MyClubs";
import CustomPaletteOptions from "../UI/CustomPaletteOptions";

interface Props {
  username: string;
}

interface Club {
  id: number;
  name: string;
  member_count: number;
  image: string | null;
}

const NavBar = ( { username }: Props) => {
  const navigate = useNavigate();

  const [clubs, setClubs] = useState<Club[] | null>([]);
  const [followedClubs, setFollowedClubs] = useState<Map<number, number>>(
    new Map()
  );

  const fetchFollowedClubs: () => Promise<void> = async () => {
    let response = await fetch(`/api/clubs/followed-clubs`, {
      method: "GET",
    });

    if (response.ok) {
      response.json().then((value) => {
        console.log("FollowedClubs: " + value.clubs_id);
        for (let clubID of value.clubs_id) {
          setFollowedClubs(new Map(followedClubs.set(clubID, 1)));
        }
        setClubs(value.clubs_data);
      });
    } else {
      console.log("fetchFollowedClubs: No Clubs Found");
      setFollowedClubs(new Map());
      setClubs([]);
    }
  };

  const fetchFollowedClubsID: () => Promise<void> = async () => {
    let response = await fetch(`/api/clubs/followed-clubs`, {
      method: "GET",
    });

    if (response.ok) {
      response.json().then((value) => {
        console.log("FollowedClubs: " + value.clubs_id);
        for (let clubID of value.clubs_id) {
          setFollowedClubs(new Map(followedClubs.set(clubID, 1)));
        }
      });
    } else {
      console.log("FetchFolowedClubsID: No Clubs Found");
      setFollowedClubs(new Map());
    }
  };

  const fetchClubs: () => Promise<void> = async () => {
    let response = await fetch(`/api/clubs/explore-clubs`, {
      method: "GET",
    });
    if (response.ok) {
      response.json().then((value) => {
        const club_data = value.clubs_data;
        console.log("ExploreClubs2: " + club_data[0].image);
        setClubs(club_data);
      });
    } else {
      console.log("fetchClubs: No Clubs Found");
      setClubs([]);
    }
  };



  const [exploreOpen, setExploreOpen] = useState<boolean>(false);

  const handleExploreOpen: () => void = async () => {
    // console.log("Followed Clubs: ", followedClubs)
    fetchClubs();
    fetchFollowedClubsID();
    // console.log("Followed Clubs2: ", followedClubs);
    setExploreOpen(true);
    // console.log("Clubs: ", clubs)
  };
  const handleExploreClose: () => void = () => setExploreOpen(false);


  const [myClubsOpen, setMyClubsOpen] = useState<boolean>(false);

  const handleMyClubsOpen: () => void = () => {
    // setFollowedClubs(new Map());
    fetchFollowedClubs();
    setMyClubsOpen(true);
  };
  const handleMyClubsClose: () => void = () => setMyClubsOpen(false);

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
  })

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
                ml: "0px",
                px: 0,
              }}
            >
              <Box sx={{ display: {xs:"none", sm:"none", md: "flex", } }}>
                <Box sx={{display:{xs:"none", sm:"none", md: "flex"}, flexFlow: "row nowrap" , alignItems: "center",justifyContent: "space-between"}}>
                <Box component="img" sx={{ width: "60px", height:"40px", cursor: "pointer", backgroundColor:"back.light", border: "1px solid black", borderRadius: "20px"}} onClick={() => navigate("/home")}  src={logo} alt="CampusConnect Logo"/>
                <Typography
                  variant="h4"
                  color="back.light"
                  sx={{ fontSize:"1.75rem", ml: "5px", fontFamily:"RampartOne", }}
                >
                  CampusConnect
                </Typography>
                </Box>

                <MenuItem
                  sx={{ ml: "20px", py: "6px", px: "12px" }}
                  onClick={handleMyClubsOpen}
                >
                  <Typography variant="h6" color="back.light" sx={{fontFamily:"RampartOne",}}>
                    My Clubs
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Typography
                    variant="h6"
                    color="back.light"
                    onClick={handleExploreOpen}
                    sx={{fontFamily:"RampartOne",}}
                  >
                    Explore
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => navigate("/club/application")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="h6" color="back.light" sx={{fontFamily:"RampartOne",}}>
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
                <IconButton
                  onClick={() => navigate(`/profile/${username}`)}
                  sx={{ color: "white", mr: "5px" }}
                >
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

      <Explore
        exploreOpen={exploreOpen}
        handleExploreOpen={handleExploreOpen}
        handleExploreClose={handleExploreClose}
        clubs={clubs}
        setClubs={setClubs}
        followedClubs={followedClubs}
        setFollowedClubs={setFollowedClubs}
      />
      <MyClubs
        myClubsOpen={myClubsOpen}
        handleMyClubsOpen={handleMyClubsOpen}
        handleMyClubsClose={handleMyClubsClose}
        clubs={clubs}
        setClubs={setClubs}
        followedClubs={followedClubs}
        setFollowedClubs={setFollowedClubs}
      />
    </ThemeProvider>
  );
};

export default NavBar;
