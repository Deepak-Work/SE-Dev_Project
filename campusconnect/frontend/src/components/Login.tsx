import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from 'js-cookie';

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


interface Form {
  password: string;
  username: string;
}


const Login = () => {
  const theme = createTheme({
    palette: {
      text: {
        primary: "#ffffff"
      },
    },
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
      // Prevent default behavior for forms. We need this other some browsers (like Firefox) blocks the request.
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const form: Form = {
          password: data.get('password') as string,
          username: data.get('username') as string,
      }

      const headers = {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken') || '',
      }

      try {
        const response: Response = await fetch('api/authentication/login', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(form)
        });

        const data = await response.json();

        if (response.ok) {
            navigate("/home");
            console.log('Login successful');
            // Redirect to home page or another action
        } else {
            // Display error message from server
            console.log('Login failed!');
            setErrorMessage(data.error);
        }
    } catch (error) {
        // Handle network errors
        console.error('There was a problem with your fetch operation:', error);
        setErrorMessage('Network error, please try again later.');
    }

  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
          background: 'linear-gradient(to right, #6366F1, #8B139C)',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container component="main" maxWidth="xl">
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
                      {errorMessage && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {errorMessage}
                            </Alert>
                        )}
                  </Box>
                <Typography variant="body2">
                      Don't have an account? <a href="/register">Register!</a>
                  </Typography>
              </Box>
          </Container>
        </Box>
    </ThemeProvider>
  );
}
export default Login;