import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Cookies from "js-cookie";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

// type ImageFile = File | null;

interface EditEvent {
  title: string;
  body: string;
  event_date: string;
  event_time: string;
  image?: string;
}

interface EditEventProps {
  editEventOpen: boolean;
  handleEditEventClose: (event? : object, reason?: string) => void;
}

const EditEvent = (props: EditEventProps) => {
  const FIVE_MINUTES = 300000;
  const { editEventOpen, handleEditEventClose } = props;
  // const [editEventImage, setEditEventImage] = useState<ImageFile>(null);
  const [date, setDate] = useState<Dayjs | null>(dayjs(Date().toString()));
  const [time, setTime] = useState<Dayjs | null>(
    dayjs(Date.now() - (Date.now() % FIVE_MINUTES) + FIVE_MINUTES)
  );

  const { id } = useParams();

  // const handleEventImageSelect = (event: any) => {
  //   let imageFiles = event.target.files;

  //   if (!imageFiles || imageFiles.length == 0) {
  //     return;
  //   }

  //   setEditEventImage(imageFiles[0]);
  // };

  // const handleEventImageRemove = () => {
  //   const fileList: HTMLInputElement = document.getElementById(
  //     "edit-event-image"
  //   ) as HTMLInputElement;
  //   fileList.value = "";
  //   setEditEventImage(null);
  // };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);

    const eventForm: EditEvent = {
      title: data.get("edit-event-title") as string,
      body: data.get("edit-event-body") as string,
      event_date: data.get("edit-event-date") as string,
      event_time: data.get("edit-event-time") as string,
    };

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    const response: Response = await fetch(`/api/events/event/${id}/edit`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(eventForm),
    });

    if (response.ok) {
      handleEditEventClose();
      window.location.reload();
    } else {
      console.log("Event Edit failed");
    }
  };

  return (
    <Dialog
      open={editEventOpen}
      onClose={handleEditEventClose}
      fullWidth
      maxWidth={"md"}
      PaperProps={{
        sx: {
          border: "4px solid",
          borderColor: "back.dark",
          borderRadius: "20px",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          background:
            "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
          color: "back.light",
          borderBottom: "4px #000 solid",
          borderRadius: "0",
        }}
      >
        <Container
          component="div"
          sx={{
            display: "flex",
            columnGap: 5,
            justifyContent: "space-between",
          }}
        >
          <Typography component="h2" variant="h2" fontFamily={"Rampart One"}>
            Edit Event
          </Typography>
          <Button
            onClick={handleEditEventClose}
            sx={{
              color: "back.dark",
              fontSize: "2rem",
              "&:hover": {
                color: "#F00",
              },
            }}
          >
            X
          </Button>
        </Container>
      </DialogTitle>

      <Container
        component="div"
        sx={{
          py: 3,
          backgroundColor: "back.main",
          borderRadius: "0px",
        }}
      >
        <Box component="form" onSubmit={handleEditSubmit}>
          <Grid
            container
            spacing={3}
            sx={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Grid item xs={12}>
              <Typography
                component="label"
                variant="h5"
                sx={{ color: "back.dark" }}
              >
                Title
              </Typography>
              <TextField
                component="div"
                name="edit-event-title"
                id="edit-event-title"
                fullWidth
                required
                sx={{
                  backgroundColor: "back.light",
                  "&:focus": {
                    border: "2px solid black",
                  },
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="h5">
                Body
              </Typography>
              <TextField
                component="div"
                name="edit-event-body"
                id="edit-event-body"
                fullWidth
                required
                multiline
                rows={12}
                sx={{ backgroundColor: "back.light" }}
              ></TextField>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Event Date"
                  name="edit-event-date"
                  disablePast
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  sx={{ width: "45%", backgroundColor: "back.light" }}
                />
                <TimePicker
                  label="Event Time"
                  name="edit-event-time"
                  minutesStep={5}
                  disablePast
                  value={time}
                  onChange={(newTime) => setTime(newTime)}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  sx={{ width: "45%", backgroundColor: "back.light" }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  color: "primary.contrastText",
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "secondary.contrastText",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Dialog>
  );
};

export default EditEvent;
