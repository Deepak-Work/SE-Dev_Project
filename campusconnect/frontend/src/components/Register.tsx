import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import logo from "../assets/CampusConnectLogo.svg";
import CustomPaletteOptions from "./UI/CustomPaletteOptions";

interface Form {
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
}

interface Errors {
  email: boolean;
  password: boolean;
  verifyPassword: boolean;
  username: boolean;
  emailErrorMessage: string;
  passwordErrorMessage: string;
  verifyPasswordErrorMessage: string;
  usernameErrorMessage: string;
}

const Register = () => {
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

  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");

  const [errors, setErrors] = useState<Errors>({
    email: false,
    password: false,
    verifyPassword: false,
    username: false,
    emailErrorMessage: "",
    passwordErrorMessage: "",
    verifyPasswordErrorMessage: "",
    usernameErrorMessage: "",
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

  const handleEmailChange = (event: any) => {
    if (event.target.validity.valid) {
      setErrors({ ...errors, email: false });
    } else {
      setErrors({
        ...errors,
        email: true,
        emailErrorMessage: "Enter a valid email address",
      });
    }
  };

  const handlePasswordChange = (event: any) => {
    //const validPassword = event.target.search(/[A-Z]/) != -1 && event.target.search(/[a-z]/) != -1 && event.target.search(/[0-9]/) ;
    setPassword(event.target.value);
    if (event.target.validity.valid) {
      setErrors({ ...errors, password: false });
      if (event.target.value == verifyPassword) {
        setErrors({
          ...errors,
          password: false,
          verifyPassword: false,
        });
      } else {
        setErrors({
          ...errors,
          password: false,
          verifyPassword: true,
          verifyPasswordErrorMessage: "Passwords do not match",
        });
      }
    } else {
      if (event.target.value !== verifyPassword)
        setErrors({
          ...errors,
          verifyPassword: true,
          verifyPasswordErrorMessage: "Passwords do not match",
          password: true,
          passwordErrorMessage:
            "Password needs at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and at least 8 characters long",
        });
      else
        setErrors({
          ...errors,
          password: true,
          passwordErrorMessage:
            "Password needs at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and at least 8 characters long",
        });
    }
  };

  const handleVerifyPasswordChange = (event: any) => {
    setVerifyPassword(event.target.value);
    if (event.target.validity.valid) {
      if (password == event.target.value) {
        setErrors({ ...errors, verifyPassword: false });
      } else {
        setErrors({
          ...errors,
          verifyPassword: true,
          verifyPasswordErrorMessage: "Passwords do not match",
        });
      }
    } else {
      setErrors({
        ...errors,
        verifyPassword: true,
        verifyPasswordErrorMessage: "Passwords do not match",
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior for forms. We need this other some browsers (like Firefox) blocks the request.
    event.preventDefault();

    setPassword("");

    const data = new FormData(event.currentTarget);
    const form: Form = {
      email: data.get("email") as string,
      password: data.get("password") as string,
      username: data.get("username") as string,
      first_name: data.get("first_name") as string,
      last_name: data.get("last_name") as string,
    };

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    const response: Response = await fetch("/api/authentication/register", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(form),
    });

    if (response.ok) {
      navigate("/login");
      console.log("Registration successful");
    } else {
      console.log("Registration failed");
      setErrors({
        ...errors,
        username: true,
        usernameErrorMessage: "Username found",
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2022/10/02/17/12/black-and-white-7494005_1280.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          component="main"
          maxWidth="md"
          sx={{
            background: "linear-gradient(to right, #111, #7A028B)",
            pb: 10,
            border: "2px #000 solid",
            borderRadius: "20px",
          }}
        >
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img width="100" height="100" src={logo} alt="CampusConnect Logo" onClick={() => navigate("/login")} style={{cursor: "pointer", userSelect: "none",}} />
            <Box
              sx={{
                px: 2,
                backgroundColor: "transparent",
                border: "#000 solid 0px",
                borderRadius: "20px",
              }}
            >
              <Box
                sx={{
                  px: 2,
                  // backgroundColor: "back.light",
                  border: "#000 solid 0px",
                  borderRadius: "20px",
                }}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    fontSize: "2.5rem",
                    color: "back.light",
                    fontFamily: "RampartOne",
                    textShadow: "1px 1px 3px secondary.main",
                    userSelect: "none",
                  }}
                >
                  Create an Account
                </Typography>
              </Box>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="first_name"
                    required
                    fullWidth
                    variant="filled"
                    id="firstName"
                    label="First Name"
                    autoFocus
                    color="secondary"
                    sx={{
                      input: { color: "back.dark" },
                      backgroundColor: "back.light",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="family-name"
                    required
                    fullWidth
                    variant="filled"
                    name="last_name"
                    id="lastName"
                    label="Last Name"
                    color="secondary"
                    sx={{
                      input: { color: "back.dark" },
                      backgroundColor: "back.light",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    onChange={handleUsernameChange}
                    error={errors.username}
                    helperText={
                      errors.username ? errors.usernameErrorMessage : ""
                    }
                    inputProps={{ pattern: ".{10,}" }}
                    autoComplete="username"
                    required
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    color="secondary"
                    sx={{
                      input: { color: "back.dark" },
                      backgroundColor: "back.light",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    onChange={handleEmailChange}
                    error={errors.email}
                    helperText={errors.email ? errors.emailErrorMessage : ""}
                    // inputProps={{ pattern: ".*@nyu[.]edu$" }}
                    inputProps={{
                      pattern:
                        "^([a-zA-Z0-9[.]_]-*)+@(([a-zA-Z0-9_]-*)+[.])+([a-zA-Z0-9_]-*){2,4}$",
                    }}
                    // inputProps={{ pattern: "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$" }}
                    autoComplete="email"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    color="secondary"
                    sx={{
                      input: { color: "back.dark" },
                      backgroundColor: "back.light",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
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
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    color="secondary"
                    sx={{
                      input: { color: "back.dark" },
                      backgroundColor: "back.light",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="filled"
                    onChange={handleVerifyPasswordChange}
                    error={errors.verifyPassword}
                    helperText={
                      errors.verifyPassword
                        ? errors.verifyPasswordErrorMessage
                        : ""
                    }
                    inputProps={{
                      pattern:
                        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*\\-]).{8,}$",
                    }}
                    autoComplete="verify-new-password"
                    required
                    fullWidth
                    name="verify-password"
                    label="Re-Enter Password"
                    type="password"
                    id="verify-password"
                    color="secondary"
                    sx={{
                      input: { color: "back.dark" },
                      backgroundColor: "back.light",
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Typography variant="body2" color="back.light" align="center">
                Already have an account?{" "}
                <a
                  href="/login"
                  style={{ color: "#1976d2", textDecoration: "underline" }}
                >
                  Login
                </a>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Register;
