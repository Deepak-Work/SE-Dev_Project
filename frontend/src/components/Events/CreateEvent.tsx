import { Box, Button, Container, Dialog, DialogTitle, Fab, Grid, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";

import Cookies from "js-cookie";
import dayjs, { Dayjs } from "dayjs";
import { useParams } from "react-router-dom";


type ImageFile = File | null;

interface CreateEvent {
    title: string;
    body: string;
    event_date: string;
    event_time: string;
    image? : string;
  }

interface CreateEventProps {
    createEventOpen : boolean;
    handleCreateEventClose : (event?:object, reason?:string) => void;
}

const CreateEvent = (props: CreateEventProps) => {
    const FIVE_MINUTES = 300000;
    const {createEventOpen, handleCreateEventClose } = props;
    const [createEventImage, setCreateEventImage] = useState<ImageFile>(null);
    const [date, setDate] = useState<Dayjs | null>(dayjs(Date().toString()));
    const [time, setTime] = useState<Dayjs | null>(dayjs(Date.now() - Date.now() % FIVE_MINUTES + FIVE_MINUTES));
    const { name, id } = useParams();
    
    const handleEventImageSelect = (event: any) => {
        let imageFiles = event.target.files;
    
        if (!imageFiles || imageFiles.length == 0) {
          return;
        }
    
        setCreateEventImage(imageFiles[0]);
      };
    
    const handleEventImageRemove = () => {
        setCreateEventImage(null);
      };
    const handleEventSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const data = new FormData(event.currentTarget);
        const eventForm: CreateEvent = {
          title: data.get("create-event-title") as string,
          body: data.get("create-event-body") as string,
          event_date: data.get("create-event-date") as string,
          event_time: data.get("create-event-time") as string,
        //   image: data.get('create-event-image') as string,
        };
    
        const headers = {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        };
    
        const response: Response = await fetch(`/api/events/new-event/${name}/${id}`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(eventForm),
        });
    
        if (response.ok) {
          handleCreateEventClose();
          window.location.reload();
          console.log("New event Created Successfully");
        } else {
          console.log("New Event failed");
        }
      };



    return (
        <Dialog open={createEventOpen} onClose={handleCreateEventClose} fullWidth maxWidth={'md'} PaperProps={{ sx:{border: "4px solid", borderColor: 
        "back.dark", borderRadius: "20px",} }}>
        <DialogTitle
          sx={{
            background:
              "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
            color: "back.light",
            // border: "2px #000 solid",
            borderRadius: "0 0 0px 0px",
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
            <Typography component="h2" variant="h2" fontFamily={"Lobster"}>
              New Event
            </Typography>
            <Button
              onClick={handleCreateEventClose}
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

        {/* <DialogContent> */}
        <Container
          component="div"
          sx={{
            py: 2,
            backgroundColor: "back.main",
            // border: "2px #000 solid",
            borderRadius: "0px",
          }}
        >
          <Box component="form" onSubmit={handleEventSubmit}>
            <Grid
              container
              spacing={2}
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
                  name="create-event-title"
                  id="create-event-title"
                  required
                  fullWidth
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
                  name="create-event-body"
                  id="create-event-body"
                  required
                  fullWidth
                  multiline
                  rows={12}
                  sx={{ backgroundColor: "back.light" }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sx={{display:"flex", justifyContent:'space-between'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label='Event Date' name='create-event-date' disablePast value={date} onChange={(newDate) => setDate(newDate)} sx= {{ width: "45%", backgroundColor:"back.light"}} />
                    <TimePicker label='Event Time' name='create-event-time' minutesStep={5} disablePast value={time} onChange={(newTime) => setTime(newTime)}   viewRenderers={{
    hours: renderTimeViewClock,
    minutes: renderTimeViewClock,
    seconds: renderTimeViewClock,
  }}sx= {{ width: "45%", backgroundColor:"back.light"}} />
                </LocalizationProvider>
              </Grid>
              {/* <Grid item xs={12}>
                <Container
                  component="div"
                  sx={{
                    display: "flex",
                    flexDirection: "row nowrap",
                    columnGap: 2,
                  }}
                >
                  <Fab
                    component="label"
                    onChange={handleEventImageSelect}
                    sx={{
                      color: "primary.contrastText",
                      backgroundColor: "primary.main",
                      "&:hover": {
                        backgroundColor: "secondary.main",
                        color: "secondary.contrastText",
                      },
                    }}
                  >
                    +
                    <input
                      type="file"
                      id="create-event-image"
                      name="create-event-image"
                      accept="image/*" 
                      hidden
                    ></input>
                  </Fab>

                  <Typography
                    component="span"
                    sx={{
                      display: { xs: "none", sm: "block", md: "block" },
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    Image <br></br> Attachments
                  </Typography>

                  <Box
                    sx={{
                      width: "60%",
                      backgroundColor: "back.light",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "2px #000 solid",
                      borderRadius: "10px",
                    }}
                  >
                    {createEventImage && (
                      <>
                        <Typography
                          component="span"
                          color="primary"
                          sx={{ pl: 5, fontSize: "0.75rem" }}
                        >
                          {createEventImage.name}
                        </Typography>
                        <Button
                          onClick={handleEventImageRemove}
                          color="error"
                        >
                          X
                        </Button>
                      </>
                    )}
                  </Box>
                </Container>
              </Grid> */}
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
        {/* </DialogContent> */}
      </Dialog>
    );
}

export default CreateEvent;