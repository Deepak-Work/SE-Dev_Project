import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";

import { Badge, Box, Tooltip } from "@mui/material";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";

interface Event {
  author: string;
  club: string;
  description: string;
  event_date: string;
  event_time: string;
  name: string;
  likes: number;
  dislikes: number;
}

const Calendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<dayjs.Dayjs>(dayjs());
  const [selectedYear, setSelectedYear] = useState<dayjs.Dayjs>(dayjs());

  function ServerDay(
    props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
  ): any {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const pickedDay = props.day.date();

    let tooltip: Event | null = null;
    let isSelected = false;

    const e = events.find(
      (event) =>
        event.event_date.split("-").map(Number)[2] === pickedDay &&
        event.event_date.split("-").map(Number)[1] ===
          selectedMonth.month() + 1 &&
        event.event_date.split("-").map(Number)[0] === selectedYear.year()
    );
    if (e) {
      tooltip = {
        author: e.author,
        club: e.club,
        description: e.description,
        event_date: e.event_date,
        event_time: e.event_time,
        name: e.name,
        likes: e.likes,
        dislikes: e.dislikes,
      };
      isSelected = true;
    }

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? "*" : undefined}
      >
        <Tooltip
          title={
            isSelected && tooltip ? (
              <div>
                {tooltip.name} hosted by {tooltip.club} on {tooltip.event_date}{" "}
                at {tooltip.event_time}
                <br />
                {tooltip.description}
              </div>
            ) : (
              ""
            )
          }
          arrow
        >
          <PickersDay
            {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
          />
        </Tooltip>
      </Badge>
    );
  }

  const handleYearChange = (newYear: dayjs.Dayjs) => {
    setSelectedYear(newYear);
  };
  const handleMonthChange = (newMonth: dayjs.Dayjs) => {
    setSelectedMonth(newMonth);
  };

  useEffect(() => {
    let fetchEvents: () => Promise<void> = async () => {
      let response = await fetch("/api/clubs/my-events", {
        method: "GET",
      });
      if (response.ok) {
        response.json().then((value) => {
          const events: Event[] = value.event_data;
          setEvents(events);
        });
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const days = events
      .filter((event) => {
        const [year, month, day] = event.event_date.split("-").map(Number);
        return month === selectedMonth.month() + 1;
      })
      .map((event) => {
        const [year, month, day] = event.event_date.split("-").map(Number);
        return day;
      });
    setHighlightedDays(days);
  }, [selectedMonth]);

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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          sx={{
            mt: 5,
            border: "3px solid black",
            borderRadius: "25px",
            bgcolor: "#ffffff",
            padding: "8px",
            boxShadow:
              "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
          }}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            } as any,
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
};

export default Calendar;
