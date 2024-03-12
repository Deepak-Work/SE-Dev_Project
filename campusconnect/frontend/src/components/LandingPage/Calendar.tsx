// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { Typography } from "@mui/material";
import { Paper } from "@mui/material";

const Calendar = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "15px",
        textAlign: "left",
        width: "500px",
        height: "250px",
      }}
    >
      <Typography
        variant="h5"
        color="#8300c4"
        fontWeight="bold"
        sx={{ pt: 3, pl: 3 }}
      >
        Events Calendar
      </Typography>
      <Typography variant="h6" color="black" sx={{ pl: 3 }}>
        This section will display the upcoming events of each club you follow.
      </Typography>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          sx={{
            border: "1px solid #000000",
            borderRadius: "25px",
            bgcolor: "#ffffff",
            padding: "8px",
            boxShadow:
              "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            width: "50%",
            height: "100%",
          }}
        />
      </LocalizationProvider> */}
    </Paper>
  );
};

export default Calendar;
