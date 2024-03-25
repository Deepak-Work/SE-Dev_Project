import { useState } from "react";
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
