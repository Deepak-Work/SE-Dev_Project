import { useState } from "react";
import Cookies from "js-cookie";
import {
  Typography,
  Box,
  Paper,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const Newsletter = () => {
  const [club, setClub] = useState("");
  // const [show, setShow] = useState(false);
  const [followedClubs, setFollowedClubs] = useState("");
  const [posts, setPosts] = useState("");
  const getFollowedClubs = async() => {
    console.log("Getting followed clubs");
    const response = await fetch(
      `/api/clubs/my-clubs`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    if (response.ok) {
      response.json().then((value) => {
        const clubIds = value.map((x) => x[0]); // Assuming the club ID is the first element in the tuple
        setFollowedClubs(clubIds.join(','));
      });
    }    
  };

  const getPosts = async() => {
    console.log("Getting posts");
    const response = await fetch(
      `/api/posts/get/posts/${followedClubs}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    if (response.ok) {
      response.json().then((value) => {
        setPosts(value);
        console.log(posts);
      });
    }
  }
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "15px",
        textAlign: "left",
        width: "700px",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        border: "5px solid #000000",
      }}
    >
      <Box
        sx={{
          borderRadius: "10px",
          border: "3px solid #000000",
          height: "50px",
          background:
            "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "10px",
        }}
      >
        <Typography
          variant="h5"
          color="white"
          fontWeight="bold"
          sx={{ pt: 1, pl: 3 }}
        >
          My Newsletter
        </Typography>
        <FormControl>
          {/* <InputLabel sx={{ color: "#fff" }}>Clubs</InputLabel> */}
          <Select
            variant="outlined"
            sx={{
              width: "200px",
              height: "30px",
              border: "1px solid black",
              backgroundColor: "#fff",
              color: "#fff",
              "& .MuiSvgIcon-root": {
                color: "black",
              },
              "&:focus": {
                borderColor: "black",
              },
            }}
            placeholder="Clubs"
            label="Clubs"
            value={club}
            onChange={(e: SelectChangeEvent) => setClub(e.target.value)}
            // MenuProps={{ MenuListProps: { sx: { maxHeight: "200px" } } }}
          >
            {/* // TODO: Get list of clubs from database */}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h6" color="black" sx={{ pl: 3 }}>
        Here, a summarized version of each recent post from the club you choose will be displayed.
      </Typography>
    </Paper>
  );
};

export default Newsletter;
