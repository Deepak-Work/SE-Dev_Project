import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { Typography } from "@mui/material";

const Calendar = () => {
  return (
    <div style={{alignContent: 'center', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
        <Typography variant="h4" color="white">Events Calendar</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                sx={{
                border: "1px solid #000000",
                borderRadius: "50px",
                bgcolor: "#ffffff",
                padding: "8px",
                boxShadow: "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
                }}
            />
        </LocalizationProvider>
    </div>

  );
};

export default Calendar;
