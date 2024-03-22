import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";

const Calendar = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "15px",
        textAlign: "left",
        width: "550px",
        height: "500px",
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
        My Club Events
      </Typography>
      </Box>

      {/* <Typography variant="h6" color="black" sx={{ pl: 3 }}>
        This section will display the upcoming events of each club you follow.
      </Typography> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          sx={{
            mt: 5,
            border: "3px solid black",
            borderRadius: "25px",
            bgcolor: "#ffffff",
            padding: "8px",
            boxShadow:
              "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
};

export default Calendar;
