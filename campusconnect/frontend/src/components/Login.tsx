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
        <CssBaseline />
        <Box
          component="div"
          sx={{
            backgroundColor: "text.primary",
            width: "75%",
            height: "65%",
            border: "#000 solid 2px",
            borderRadius: "20px",
            display: "flex",
          }}
        >
          <Container
            component="div"
            maxWidth="md"
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
              backgroundImage:
                "url(https://cdn.pixabay.com/photo/2022/10/02/17/12/black-and-white-7494005_1280.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "100%",
              border: "#000 solid 1px",
              borderRadius: "10px",
            }}
          ></Container>
          <Container
            sx={{
              marginTop: 12,
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
                margin: "0%",
                backgroundColor: "text.primary",
                border: "#000 solid 0px",
                borderRadius: "20px",
                justifyContent: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontSize: "2.5rem", color: "#8B139C", fontFamily:"RampartOne" }}
              >
                CampusConnect
              </Typography>
            </Container>

            <Box component="main" sx={{ mt: 1, ml: 0 }}>
              {errorMessage && (
                <Alert severity="error" sx={{ mt: 0 }}>
                  {errorMessage}
                </Alert>
              )}
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
                      sx={{
                        input: { color: "#000" },
                        backgroundColor: "text.primary",
                        borderColor: "#000",
                        borderWidth: "10px",
                      }}
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
                      sx={{
                        input: { color: "#000" },
                        backgroundColor: "text.primary",
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
                  Login
                </Button>
              </Box>
              <Container
                component="div"
                sx={{
                  backgroundColor: "#e9ecef",
                  borderColor: "#8B139A solid 2px",
                  borderRadius: "20px",
                  width: "80%",
                  mt: "3%",
                  mb: "2%",
                }}
              ></Container>
              <Container
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "20px",
                  borderColor: "transparent",
                  borderWidth: "2px",
                  mt: "2%",
                }}
              >
                <Typography variant="body1" sx={{ color: "#000" }}>
                  Don't have an account?{" "}
                  <a href="/register" style={{ color: "#8B139A" }}>
                    Register!
                  </a>
                </Typography>
              </Container>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default Login;
