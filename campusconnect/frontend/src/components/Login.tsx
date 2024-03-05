import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


interface Form {
  password: string;
  username: string;
}

// interface Errors {
//   email: boolean;
//   password: boolean;
// }

const Login = () => {
  const defaultTheme = createTheme();

  const navigate = useNavigate();

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
      // Prevent default behavior for forms. We need this other some browsers (like Firefox) blocks the request.
      event.preventDefault();

      console.log("1")
      const data = new FormData(event.currentTarget);
      const form: Form = {
          password: data.get('password') as string,
          username: data.get('username') as string,
      }

      console.log("2")

      const headers = {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken') || '',
      }

      console.log("3")


      const response: Response = await fetch('api/authentication/login', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(form)
      })

      if (response.ok) {
          navigate("/home");
          console.log("Login successful");
      } else {
          console.log("Login failed");
      }

  }

  return (
      <>
      <ThemeProvider theme={defaultTheme}>
          <Container className="bg-gradient-to-r from-indigo-400 to-[#8b139c]"  component="main" maxWidth="xl" >
              <CssBaseline/>
              <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <Typography component="h1" variant="h5">Login</Typography>
                  <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                      <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                              <TextField autoComplete="username" name="username" required fullWidth id="username" label="Username" autoFocus/>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                              <TextField autoComplete="password" required fullWidth name="password" type = "password" id="password" label="Password"/>
                          </Grid>
                      </Grid>
                      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Login</Button>
                  </Box>
                <Typography variant="body2">
                      Don't have an account? <a href="/register">Register</a>
                  </Typography>
              </Box>
          </Container>
      </ThemeProvider>
      </>
  );
}
export default Login;