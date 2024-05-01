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

import logo from "../assets/CampusConnectLogo.svg";
import backgroundImg from "../assets/black-and-white-7494005_1280_0Vh3CSJ.jpg";
import { Link } from "@mui/material";
import CustomPaletteOptions from "./UI/CustomPaletteOptions";

interface Form {
  password: string;
  username: string;
}

interface LoginProps {
  setAuth : React.Dispatch<React.SetStateAction<boolean>>
  setUsername : React.Dispatch<React.SetStateAction<string>>
}

const Login = (props: LoginProps) => {
  const {setAuth, setUsername} = props;
  const theme = createTheme({
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

  const [errorMessage, setErrorMessage] = useState("");

  const checkAuth = async () => {
    try {
      let response = await fetch("/api/authentication/isauth", {
        method: "GET",
      });
      if (response.ok) {
        setAuth(true);
        response.json().then((value) => setUsername(value.username));
      } else {
        setAuth(false);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      // Handle error (e.g., display error message)
    }
  };


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
      const response: Response = await fetch("/api/authentication/login", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        checkAuth();
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
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: "back.main",
            // width: "65%",
            minHeight: "95vh",
            minWidth: "95vw",
            border: "#000 solid 2px",
            borderRadius: "20px",
            display: "flex",
            mx: 1,
          }}
        > 
          <Box
            maxWidth="md"
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
              minHeight: "90vh",
              minWidth: "50vw",
              border: "1px solid #000",
              borderRadius: "10px",
            }}
          >
            <Box component="img" width="100%" height="100%" src={backgroundImg} sx={{border:"2px solid white", borderRadius:"10px", userSelect:"none",}} ></Box>

          </Box>
                      
          <Container
            sx={{
              display: "flex",
              flexFlow: "column nowrap",
              justifyContent:"center",
              alignItems: "center",
              minHeight: "90vh",
            }}
          >
            <Box component="img" width="100" height="100" src={logo} alt="CampusConnect Logo" sx={{userSelect:"none",}}  />
            <Box
              sx={{
                display: "flex",
                margin: "0%",
                backgroundColor: "back.main",
                border: "#000 solid 0px",
                borderRadius: "20px",
                justifyContent: "center",
              }}
            >
              
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontSize: { xs: "2.0rem", sm: "2.0rem", md:"2.5rem"}, color: "secondary.main", fontFamily:"RampartOne", userSelect:"none", }}
              >
                CampusConnect               
              </Typography>
            </Box>

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
                        backgroundColor: "back.light",
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
                  Login
                </Button>
              </Box>
              <Container
                component="div"
                sx={{
                  backgroundColor: "#e9ecef",
                  border:"2px solid",
                  borderColor: "secondary.main",
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
                <Typography variant="h6" fontFamily="Lobster" sx={{ color: "#000",}}>
                  Don't have an account?{" "}
                  <Link href="/register" sx={{ color: "#1976d2", textDecoration: "underline", "&:hover": {color: "secondary.main"}, }}>
                    Register!
                  </Link>
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
