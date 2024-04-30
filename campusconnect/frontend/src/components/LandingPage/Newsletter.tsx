import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Typography,
  Box,
  Paper,
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  CardContent,
  Card,
} from "@mui/material";

import NewsletterElement from "./NewsletterElement";
import TextMobileStepper from "../UI/TextMobileStepper";
import LoadingComponentIndicator from "../Utils/LoadingComponentIndicator";
import { useNavigate } from "react-router-dom";

interface Club {
  club_id: number;
  club_name: string;
}


interface PostsByClub {
club_posts: any[]
club_name: string;
club_id: number;
club_image: string;
}

const Newsletter = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };

  const navigate = useNavigate();
  const [isLoadingNewsletter, setIsLoadingNewsletter] = useState<boolean>(true);
  const [followedClubs, setFollowedClubs] = useState<Club[]>([]);
  const [postsByClubs, setPostsByClubs] = useState<PostsByClub[]>([]);
  const [selectedPostsByClubs, setSelectedPostsByClubs] = useState<PostsByClub[]>([]);

  const [selectedClub, setSelectedClub] = useState('');

  const handleSelectedClubChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setSelectedClub(event.target.value);
    if(event.target.value) {
      setSelectedPostsByClubs(postsByClubs.filter((value) => value.club_id === Number(event.target.value)))
    }
    else {
      setSelectedPostsByClubs(postsByClubs);
    }
  };

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
        console.log(value.clubs_data);
        // const clubIds = value.clubs_data.map((x) => x['club_id']); // Assuming the club ID is the first element in the tuple
        // setFollowedClubs(clubIds.join(','));
        setFollowedClubs(value.clubs_data);
      });
    }    
  };

  const getPosts = async() => {
    console.log("Getting posts");
    const response = await fetch(
      `/api/posts/newsletter-posts`,
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
        console.log(value.posts_by_club);
        setPostsByClubs(value.posts_by_club);
        setSelectedPostsByClubs(value.posts_by_club);
      });
    }
    setTimeout(() => {setIsLoadingNewsletter(false)}, 400);
  }

  useEffect(() => {
    getFollowedClubs();
    getPosts();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "15px",
        textAlign: "left",
        width: "700px",
        height: "800px",
        display: "flex",
        flexDirection: "column",
        border: "5px solid #000000",
      }}
    >
      <Box
        sx={{
          border: "3px solid #000000",
          borderBottom:"5px solid",
          borderRadius: "10px 10px 0 0",
          height: "70px",
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
          fontFamily="Lobster"
          sx={{ pt: 1, pl: 3 }}
        >
          My Newsletter
        </Typography>
        <FormControl>
          <InputLabel id="followed-clubs-select-label" sx={{ fontFamily: "Lobster", color: "#000" }}>Clubs</InputLabel>
          <Select
            variant="outlined"
            sx={{
              width: "200px",
              maxHeight: "50px",
              border: "1px solid black",
              backgroundColor: "#fff",
              color: "#000",
              fontFamily: "Lobster",
              "& .MuiSvgIcon-root": {
                color: "black",
              },
              "&:focus": {
                borderColor: "black",
              },
            }}
            placeholder="Select a Club"
            label="Clubs"
            labelId="followed-clubs-select-label"
            id="followed-clubs-select"
            value={selectedClub}
            onChange={handleSelectedClubChange}
            // MenuProps={{ MenuListProps: { sx: { maxHeight: "200px" } } }}
            MenuProps={MenuProps}
          >
            <MenuItem value="">
            <Typography fontFamily="Lobster">All</Typography>
            </MenuItem>
          {followedClubs.map((club) => (
          <MenuItem key={club.club_id} value={club.club_id} sx={{fontFamily:"Lobster"}}>{club.club_name.length < 15 ? club.club_name : club.club_name.substring(0,15) + "..."}</MenuItem>
        ))}
          </Select>
        </FormControl>
      </Box>
      {isLoadingNewsletter ? <LoadingComponentIndicator /> : 
      <Box sx={{display:"flex", flexFlow: "column nowrap", height:"100%", overflow: "auto", justifyContent:"start" }}>
      {selectedPostsByClubs.length > 0 ? selectedPostsByClubs.map((postsByClub) => (
       <Box sx={{ display:"flex", flexFlow: "column nowrap", justifyContent:"space-between", border: "0px solid", borderColor: "back.dark"}}>
         {postsByClub.club_posts.length > 0 ?
           <TextMobileStepper clubId={postsByClub.club_id} clubName={postsByClub.club_name} clubImage={postsByClub.club_image} clubPosts={postsByClub.club_posts} />
         : <Box
         sx={{
          m: 1
         }}
       >
        <Card
      sx={{
        //  display:"flex",
        border: "3px solid",
        borderColor: "back.dark",
        borderRadius: "35px",
        // width: "450px",
        minWidth: "600px",
        textWrap: "balance",
      }}
    >


    <CardContent
        sx={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: "back.main",
          gap:2,
        }}
      >
        <Box
          sx={{
            borderRadius: "10px",
            border: "3px solid #000000",
            maxHeight: "200px",
            maxWidth: "50%",
            backgroundColor: "primary.main",
            // background:
            //   "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <Box
            component="img"
            sx={{
              width: "50px",
              height: "50px",
              border: "4px solid",
              borderColor: "back.light",
              borderRadius: "5px",
              mx: 1,
              my: 1,
              backgroundColor: "#fff",
            }}
            alt="Club image"
            src={postsByClub.club_image}
          />
          <Typography onClick={() => navigate(`/club/${postsByClub.club_name}/${postsByClub.club_id}`)} fontFamily={"Lobster"} sx={{color: "back.light", mx: 1, wordBreak:"break-word", cursor:"pointer", "&:hover" : {color:"back.dark"}}}>{postsByClub.club_name}</Typography>
        </Box>
        
        <Box>
         <Typography
           component="h2"
           variant="h2"
           fontFamily={"RampartOne"}
           sx={{
             color: "secondary.dark",
             fontSize: "2rem",
           }}
         >
           No Posts To Show...
         </Typography>
         </Box>
       </CardContent>
       </Card>
       </Box> 
       }
        </Box>
        )) : 
        
        <Box
        sx={{
          height: "100%",
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
          justifyContent:"center",
        }}
      >
        <Typography
          component="h2"
          variant="h2"
          fontFamily={"RampartOne"}
          sx={{
            color: "secondary.dark",
            fontSize: "2rem",
          }}
        >
          No Clubs/Posts To Show...
        </Typography>
      </Box>}
        
      </Box>
      }
    </Paper>
  );
};

export default Newsletter;
