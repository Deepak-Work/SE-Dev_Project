import React from "react";

import { useState } from "react";

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
import { TransitionProps } from "@mui/material/transitions";

import Cookies from "js-cookie";

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

interface Form {
  username: string;
  password: string;
}

interface Errors {
  username: boolean;
  password: boolean;
  usernameErrorMessage: string;
  passwordErrorMessage: string;
}

const slideTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ProfileSettings = (props: SettingsProps) => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior for forms. We need this other some browsers (like Firefox) blocks the request.
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const form: Form = {
      username: data.get("username") as string,
      password: data.get("password") as string,
    };

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    // TODO: Need to add upload profile pic field
    // TODO: Need to figure out how to handle edit of username and password (user may not want to update one or the other)

    // if (form.username.length === 0) {
    //   setErrors({
    //       ...errors,
    //       username: true,
    //       usernameErrorMessage: "Username must be at least 10 characters long",
    //   })
    // }

    // const response: Response = await fetch("/api/prof/edit", {
    //   method: "POST",
    //   headers: headers,
    //   body: JSON.stringify(form),
    // });

    // if (!response.ok) {
    //   setErrors({
    //     ...errors,
    //     username: true,
    //     usernameErrorMessage: "Username found",
    //   });
    // }
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
            height: "500px",
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
            >
              Save
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default ProfileSettings;
