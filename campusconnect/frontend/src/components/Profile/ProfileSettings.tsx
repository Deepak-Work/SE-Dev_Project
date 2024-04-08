import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  DialogContent,
  DialogTitle,
  Dialog,
  Slide,
  Typography,
  Container,
  Button,
  Grid,
  TextField,
  Box,
} from "@mui/material";
import { InputAdornment, PaletteOptions, styled } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import Cookies from "js-cookie";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { createTheme, ThemeProvider } from "@mui/material/styles";

interface User {
  name: string;
  username: string;
  email: string;
}

interface SettingsProps {
  user: User;
  settingsOpen: boolean;
  handleSettingsOpen: () => void;
  handleSettingsClose: () => void;
}

interface Errors {
  username: boolean;
  password: boolean;
  usernameErrorMessage: string;
  passwordErrorMessage: string;
}

type ImageFile = File | null;

const slideTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

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

const ProfileSettings = (props: SettingsProps) => {
  const navigate = useNavigate();

  const { user, settingsOpen, handleSettingsOpen, handleSettingsClose } = props;

  const [errors, setErrors] = useState<Errors>({
    username: false,
    password: false,
    usernameErrorMessage: "",
    passwordErrorMessage: "",
  });

  const handleUsernameChange = (event: any) => {
    if (event.target.validity.valid) {
      setErrors({ ...errors, username: false });
    } else {
      setErrors({
        ...errors,
        username: true,
        usernameErrorMessage: "Username must be at least 10 characters long",
      });
    }
  };

  const handlePasswordChange = (event: any) => {
    if (event.target.validity.valid) {
      setErrors({ ...errors, password: false });
    } else {
      setErrors({
        ...errors,
        password: true,
        passwordErrorMessage:
          "Password needs at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and at least 8 characters long",
      });
    }
  };

  const [profileImage, setprofileImage] = useState<ImageFile>(null);

  const handleImageSelect = (event: any) => {
    const imageFiles = event.target.files;

    if (!imageFiles || imageFiles.length == 0) {
      setprofileImage(null);
      return;
    }

    setprofileImage(imageFiles[0]);
  };

  const handleImageRemove = () => {
    const fileList: HTMLInputElement = document.getElementById(
      "image"
    ) as HTMLInputElement;
    fileList.value = "";
    setprofileImage(null);
  };

  const handleImageSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior for forms. We need this other some browsers (like Firefox) blocks the request.
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const image = data.get("image") as File;

    console.log(image);

    if (profileImage !== null) {
      const headers = {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      };

      const form = new FormData();
      form.append("image", image);

      const response: Response = await fetch("/api/prof/edit/image", {
        method: "POST",
        headers: headers,
        body: form,
      });

      if (response.ok) {
        window.location.reload();
      }
    }
  };

  const handleUsernameSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // Prevent default behavior for forms. We need this other some browsers (like Firefox) blocks the request.
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    // TODO: Need to add upload profile pic field

    if (username.length === 0) {
      setErrors({
        ...errors,
        username: true,
        usernameErrorMessage: "Username must be at least 10 characters long",
      });
    }

    const response: Response = await fetch("/api/prof/edit/username", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ username: username }),
    });

    if (!response.ok) {
      setErrors({
        ...errors,
        username: true,
        usernameErrorMessage: "Username found",
      });
    } else {
      window.location.reload();
    }
  };

  const handlePasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // Prevent default behavior for forms. We need this other some browsers (like Firefox) blocks the request.
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const password = data.get("password") as string;

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    // TODO: Need to add upload profile pic field

    if (password.length === 0) {
      setErrors({
        ...errors,
        password: true,
        passwordErrorMessage: "Password cannot be empty",
      });
    }

    const response: Response = await fetch("/api/prof/edit/password", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ password: password }),
    });

    if (!response.ok) {
      setErrors({
        ...errors,
        username: true,
        usernameErrorMessage: "Username found",
      });
    } else {
      navigate("/login");
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#7108d8",
      },
      secondary: {
        main: "#8B139C",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={settingsOpen}
        onClose={handleSettingsClose}
        TransitionComponent={slideTransition}
        fullWidth
        maxWidth={"sm"}
        PaperProps={{
          sx: {
            height: "600px",
            border: "2px #000 solid",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle
          sx={{
            background:
              "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
            border: "2px #000 solid",
            borderRadius: "15px",
          }}
        >
          <Container
            component="div"
            sx={{
              display: "flex",
              columnGap: 5,
              justifyContent: "center",
            }}
          >
            <Typography
              component="h3"
              variant="h3"
              fontFamily="RampartOne"
              color="white"
            >
              Edit profile
            </Typography>
          </Container>
        </DialogTitle>
        <DialogContent
          sx={{
            mt: 2,
            mb: 2,
            ml: 2,
            mr: 2,
            bgcolor: "primary.main",
            borderRadius: "20px",
          }}
        >
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box component="form" onSubmit={handleImageSubmit}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      sx={{ bgcolor: "secondary.main" }}
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
                        backgroundColor: "white",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "2px #000 solid",
                        borderRadius: "10px",
                      }}
                    >
                      {profileImage && (
                        <>
                          <Typography
                            component="span"
                            color="primary"
                            sx={{ pl: 5, fontSize: "0.75rem" }}
                          >
                            {profileImage.name}
                          </Typography>
                          <Button onClick={handleImageRemove} color="error">
                            X
                          </Button>
                        </>
                      )}
                    </Box>
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
                  >
                    Update
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box component="form" onSubmit={handleUsernameSubmit}>
                  <TextField
                    defaultValue={user.username}
                    variant="filled"
                    onChange={handleUsernameChange}
                    error={errors.username}
                    helperText={
                      errors.username ? errors.usernameErrorMessage : ""
                    }
                    inputProps={{ pattern: ".{10,}" }}
                    autoComplete="username"
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    color="secondary"
                    sx={{
                      input: { color: "#000" },
                      backgroundColor: "white",
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
                  >
                    Update
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box component="form" onSubmit={handlePasswordSubmit}>
                  <TextField
                    variant="filled"
                    onChange={handlePasswordChange}
                    error={errors.password}
                    helperText={
                      errors.password ? errors.passwordErrorMessage : ""
                    }
                    inputProps={{
                      pattern:
                        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*\\-]).{8,}$",
                    }}
                    autoComplete="new-password"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    color="secondary"
                    sx={{
                      input: { color: "#000" },
                      backgroundColor: "white",
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
                  >
                    Update
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default ProfileSettings;
