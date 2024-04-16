// import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

// import * as React from 'react';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InputAdornment, PaletteOptions, styled } from "@mui/material";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import logo from "../../assets/CampusConnectLogo.svg";
import NavBar from "../LandingPage/NavBar";

// Club Name
// Club Description
// Club Location
// Club Website
// Club Contact
// Club Members
// Club Events
// Club Image
// Submit

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// interface Form{
//     name: string;
//     description: string;
//     location: string;
//     email: string;
//     website: string;
//     contact: string;
//     // members: string;
//     // events: string;
//     image?: File;
// }

interface Props {
  username: string;
  isAuth: boolean;
}

interface Errors {
  name: boolean;
  description: boolean;
  location: boolean;
  website: boolean;
  contact: boolean;
  email: boolean;
  // members: boolean;
  // events: boolean;
  // image: boolean;
}

interface CustomPaletteOptions extends PaletteOptions {
  back?: {
    main: string;
    light?: string;
    dark?: string;
    contrastText?: string;
  };
}

type ImageFile = File | null;

// TODO: Add validation and double check members/events/image fields

const CreateClub = (props: Props) => {
  const defaultTheme = createTheme({
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
  });

  const [errors, setErrors] = useState<Errors>({
    name: false,
    description: false,
    location: false,
    website: false,
    email: false,
    contact: false,
    // members: false,
    // events: false,
    // image: false,
  });

  const [clubImage, setClubImage] = useState<ImageFile>(null);

  const handleImageSelect = (event: any) => {
    const imageFiles = event.target.files;

    if (!imageFiles || imageFiles.length == 0) {
      setClubImage(null);
      return;
    }

    setClubImage(imageFiles[0]);
  };

  const handleImageRemove = () => {
    const fileList: HTMLInputElement = document.getElementById(
      "image"
    ) as HTMLInputElement;
    fileList.value = "";
    setClubImage(null);
  };

  const navigate = useNavigate();

  const handleClubNameChange = (event: any) => {
    if (event.target.validity.valid) {
      setErrors({ ...errors, name: false });
    } else {
      setErrors({ ...errors, name: true });
    }
  };

  const handleClubDescriptionChange = (event: any) => {
    if (event.target.validity.valid) {
      setErrors({ ...errors, description: false });
    } else {
      setErrors({ ...errors, description: true });
    }
  };

  const handleClubEmailChange = (event: any) => {
    if (event.target.validity.valid) {
      setErrors({ ...errors, email: false });
    } else {
      setErrors({ ...errors, email: true });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("submitting");
    // Prevent default behavior for forms. We need this other some browsers (like Firefox) blocks the request.
    event.preventDefault();
    // console.log(event.currentTarget);
    // const dataNow = new FormData(event.currentTarget);

    const data = new FormData(event.currentTarget);
    // console.log(data.get("image"));
    const image: File | null = data.get("image") as File;
    // if (!image) {
    //     console.log("No image selected");
    //     // Handle the absence of an image (e.g., display an error message to the user)
    //     return;
    // }
    // console.log(image);
    // const form: Form = {
    //     name: data.get('name') as string,
    //     description: data.get('description') as string,
    //     location: data.get('location') as string,
    //     email: data.get('email') as string,
    //     website: data.get('website') as string,
    //     contact: data.get('contact') as string,
    //     // members: data.get('members') as string,
    //     // events: data.get('events') as string,
    //     image: image,
    // }
    const form = new FormData();
    form.append("name", data.get("name") as string);
    form.append("description", data.get("description") as string);
    form.append("location", data.get("location") as string);
    form.append("email", data.get("email") as string);
    form.append("website", data.get("website") as string);
    form.append("contact", data.get("contact") as string);
    // Append the file
    if (image) {
      form.append("image", image);
    }
    // else {
    //   form.append("image", logo);
    // }

    // console.log(form);

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    const response: Response = await fetch("/api/clubs/create", {
      method: "POST",
      headers: headers,
      body: form,
    });

    if (response.ok) {
      response.json().then((value) => {
        navigate(`/club/${form.get("name")}/${value.club_id}`);
      });
      console.log("Club created successfully");
    } else {
      console.log("Club creation failed");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexFlow: "column nowrap",
          // gap: 10,
          background: "linear-gradient(to right, #a68bf0, #8e63d5, #7d3ebd)",
        }}
      >
        {/* <NavBar username={props.username}></NavBar> */}
        <Typography sx={{ py: 3, width: "100%" }}></Typography>
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            my: 0,
            py: 5,
            backgroundColor: "back.main",
            border: "2px solid black",
            borderRadius: "20px",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/home")}
              width="100"
              height="100"
              src={logo}
              alt="CampusConnect Logo"
            />
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: "primary.main",
                fontFamily: "RampartOne",
                fontSize: "2rem",
              }}
            >
              Club Application
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    sx={{ backgroundColor: "back.light" }}
                    variant="filled"
                    onChange={handleClubNameChange}
                    error={errors.name}
                    helperText={
                      errors.name ? "Please enter a valid club name" : ""
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">📜</InputAdornment>
                      ),
                    }}
                    inputProps={{ maxLength: 50 }}
                    autoComplete="club-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Club Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ backgroundColor: "back.light" }}
                    variant="filled"
                    onChange={handleClubDescriptionChange}
                    error={errors.description}
                    helperText={
                      errors.description
                        ? "Please enter a valid club description"
                        : ""
                    }
                    inputProps={{ maxLength: 500 }}
                    autoComplete="club-description"
                    multiline
                    fullWidth
                    rows={4}
                    required
                    name="description"
                    id="description"
                    label="Club Description"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ backgroundColor: "back.light" }}
                    variant="filled"
                    autoComplete="club-location"
                    required
                    fullWidth
                    id="location"
                    name="location"
                    label="Club Location"
                    type="text"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">📍</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ backgroundColor: "back.light" }}
                    variant="filled"
                    onChange={handleClubEmailChange}
                    error={errors.email}
                    helperText={
                      errors.email ? "Please enter a valid club email" : ""
                    }
                    autoComplete="club-email"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Club Email"
                    type="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">📧</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ backgroundColor: "back.light" }}
                    variant="filled"
                    autoComplete="club-website"
                    fullWidth
                    id="website"
                    name="website"
                    label="Club Website"
                    type="url"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">🌐</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ backgroundColor: "back.light" }}
                    variant="filled"
                    autoComplete="club-contact"
                    required
                    fullWidth
                    id="contact"
                    name="contact"
                    label="Club Contact"
                    type="tel"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">📞</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                                <TextField autoComplete="club-members"  
                                    fullWidth 
                                    id="members" 
                                    name="members" 
                                    label="Club Members" 
                                    select 
                                    SelectProps={{multiple: true, 
                                        renderValue: (selected: unknown) => {
                                            if (Array.isArray(selected)) {
                                              return (
                                                <div>
                                                  {selected.map((value: string) => (
                                                    <Chip key={value} label={value} />
                                                  ))}
                                                </div>
                                              );
                                            }
                                            return null; // Return a default or handle other cases as needed
                                          },
                                        }}/>
                            </Grid> */}
                {/* <Grid item xs={12}>
                                <TextField autoComplete="club-events" 
                                fullWidth 
                                id="events" 
                                name="events" 
                                label="Club Events"
                                select 
                                SelectProps={{multiple: true, 
                                    renderValue: (selected: unknown) => {
                                        if (Array.isArray(selected)) {
                                          return (
                                            <div>
                                              {selected.map((value: string) => (
                                                <Chip key={value} label={value} />
                                              ))}
                                            </div>
                                          );
                                        }
                                        return null; // Return a default or handle other cases as needed
                                      },
                                    }}/>
                            </Grid> */}
                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Profile Pic
                      <VisuallyHiddenInput
                        id="image"
                        name="image"
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                      />
                    </Button>

                    <Box
                      sx={{
                        width: "50%",
                        backgroundColor: "back.light",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "2px #000 solid",
                        borderRadius: "10px",
                      }}
                    >
                      {clubImage && (
                        <>
                          <Typography
                            component="span"
                            color="primary"
                            sx={{ pl: 5, fontSize: "0.75rem" }}
                          >
                            {clubImage.name}
                          </Typography>
                          <Button onClick={handleImageRemove} color="error">
                            X
                          </Button>
                        </>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit Application
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CreateClub;
