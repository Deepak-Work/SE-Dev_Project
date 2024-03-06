import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface Form {
  password: string;
  username: string;
}

const Login = () => {
  const theme = createTheme({
    palette: {
      text: {
        primary: "#e9ecef",
        secondary: "#8B139C",
      },
    },
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior for forms. We need this other some browsers (like Firefox) blocks the request.
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const form: Form = {
      password: data.get("password") as string,
      username: data.get("username") as string,
    };

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };

    try {
      const response: Response = await fetch("api/authentication/login", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/home");
        console.log("Login successful");
        // Redirect to home page or another action
      } else {
        // Display error message from server
        console.log("Login failed!");
        setErrorMessage(data.error);
      }
    } catch (error) {
      // Handle network errors
      console.error("There was a problem with your fetch operation:", error);
      setErrorMessage("Network error, please try again later.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: "linear-gradient(to right, #000, #8B139C)",
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
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2022/10/02/17/12/black-and-white-7494005_1280.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: "20px",
            width: "100%",
            height: "60%",
            borderColor: "#000",
            borderWidth: "2px",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "30vh",
            }}
          >
            <Container
              component="main"
              maxWidth="xs"
              sx={{
                display: "flex",
                margin: "3%",
                backgroundColor: "text.primary",
                borderRadius: "20px",
                borderColor: "#000",
                borderWidth: "2px",
                justifyContent: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontSize: "2rem", color: "#8B139C" }}
              >
                CampusConnect
              </Typography>
            </Container>
            <Box component="main" sx={{ mt: 0, ml:0}}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="username"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    color="secondary"
                    sx={{input: {color: "#000"}, backgroundColor: "text.primary"}}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="password"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    label="Password"
                    color="secondary"
                    sx={{input: {color: "#000"}, backgroundColor: "text.primary"}}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              {errorMessage && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {errorMessage}
                </Alert>
              )}
            </Box>
            <Container
                component="main"
                sx={{
                  mt: "3%",
                  mb: "2%",
                  backgroundColor: "#e9ecef",
                  borderRadius: "20px",
                  borderColor: "#8B139A",
                  borderWidth: "2px",
                  width: "80%",
                }}
              ></Container>
              <Typography variant="body2" sx={{ ml:"25%", color: "primary" }}>
                Don't have an account?{" "}
                <a href="/register" style={{ color: "#8B139A" }}>
                  Register!
                </a>
              </Typography>
              </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default Login;
