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
import { ThemeProvider } from "@mui/material/styles";

import logo from "../assets/CampusConnectLogo.svg";
import backgroundImg from "../assets/black-and-white-7494005_1280_0Vh3CSJ.jpg";

import { IconButton, InputAdornment, Link } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

import theme from "./UI/theme";

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
  const defaultTheme = theme;

  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
    event.preventDefault();

    if (password !== verifyPassword) {
      console.log("Passwords did not match");
      return;
    }

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
      setPassword("");
      setVerifyPassword("");
    } else {
      console.log("Registration failed");
      setErrors({
        ...errors,
        username: true,
        usernameErrorMessage: "Username Found, Please Enter A New Username ",
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          component="div"
          maxWidth="md"
          sx={{
            minHeight: "80vh",
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(to right, #111, #7A028B)",
            pb: 10,
            border: "2px #000 solid",
            borderRadius: "20px",
          }}
        >
          <CssBaseline />

          <Box
            sx={{
              display: "flex",
              flexFlow: "column nowrap",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
              height: "20%",
            }}
          >
            <Box
              component="img"
              width={250}
              height={150}
              src={logo}
              alt="CampusConnect Logo"
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer", userSelect: "none" }}
            />
            <Typography
              component="h1"
              variant="h3"
              sx={{
                color: "back.light",
                fontFamily: "Rampart One",
                textShadow: "1px 1px 3px secondary.main",
                userSelect: "none",
              }}
            >
              Create an Account
            </Typography>
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
                  inputProps={{
                    pattern:
                      "^([a-zA-Z0-9[.]_]-*)+@(([a-zA-Z0-9_]-*)+[.])+([a-zA-Z0-9_]-*){2,4}$",
                  }}
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
                  value={password}
                  error={errors.password}
                  helperText={
                    errors.password ? errors.passwordErrorMessage : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    pattern:
                      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*\\-]).{8,}$",
                  }}
                  autoComplete="new-password"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
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
                  value={verifyPassword}
                  onChange={handleVerifyPasswordChange}
                  error={errors.verifyPassword}
                  helperText={
                    errors.verifyPassword
                      ? errors.verifyPasswordErrorMessage
                      : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    pattern:
                      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*\\-]).{8,}$",
                  }}
                  autoComplete="verify-new-password"
                  required
                  fullWidth
                  name="verify-password"
                  label="Verify Password"
                  type={showPassword ? "text" : "password"}
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
            <Typography
              variant="h6"
              color="back.light"
              fontFamily="Lobster"
              align="center"
            >
              Already have an account?{" "}
              <Link
                href="/login"
                sx={{
                  color: "#1976d2",
                  textDecoration: "underline",
                  "&:hover": { color: "secondary.main" },
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Register;
