import { useState } from "react";
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
    email: string;
    password: string;
    username: string;
    first_name: string;
    last_name: string;
}

interface Errors {
    email: boolean;
    password: boolean;
    username: boolean;
}

const Register = () => {
    const defaultTheme = createTheme({
        palette: {
          text: {
            primary: "#e9ecef",
            secondary: "#8B139C",
          },
        },
      });

    const navigate = useNavigate();

    const [errors, setErrors] = useState<Errors>({
        email: false,
        password: false,
        username: false,
    });

    const handleUsernameChange = (event: any) => {
        if (event.target.validity.valid) {
            setErrors({...errors, username: false});
        } else {
            setErrors({...errors, username: true});
        }
    }

    const handleEmailChange = (event: any) => {
        if (event.target.validity.valid) {
            setErrors({...errors, email: false});
        } else {
            setErrors({...errors, email: true});
        }  
    }

    const handlePasswordChange = (event: any) => {
        if (event.target.validity.valid) {
            setErrors({...errors, password: false});
        } else {
            setErrors({...errors, password: true});
        }
    }

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        // Prevent default behavior for forms. We need this other some browsers (like Firefox) blocks the request.
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const form: Form = {
            email: data.get('email') as string,
            password: data.get('password') as string,
            username: data.get('username') as string,
            first_name: data.get('first_name') as string,
            last_name: data.get('last_name') as string,
        }

        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken') || '',
        }

        const response: Response = await fetch('http://127.0.0.1:8000/api/authentication/register', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(form)
        })

        if (response.ok) {
            navigate("/login");
            console.log("Registration successful");
        } else {
            console.log("Registration failed");
        }

    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box         sx={{
backgroundImage:
"url(https://cdn.pixabay.com/photo/2022/10/02/17/12/black-and-white-7494005_1280.jpg)",
backgroundRepeat: "no-repeat",
backgroundSize: "cover",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
            <Container component="main" maxWidth="md" sx={{ background: "linear-gradient(to right, #111, #7A028B)",pb: 10, border:"2px #000 solid", borderRadius: "20px"
    }} >
                <CssBaseline/>

                <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Box sx={{ px: 2, backgroundColor:"transparent", border:"#000 solid 0px", borderRadius:"20px"}}>
                    <Typography component="h1" variant="h5" sx={{ fontSize: "2.5rem", color: "text.primary", fontFamily:"RampartOne", }}>
                        Create an Account
                    </Typography>

                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField autoComplete="given-name" name="first_name" required fullWidth variant="filled"  id="firstName" label="First Name" autoFocus color="secondary" sx={{input: {color: "#000"}, backgroundColor: "text.primary"}}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField autoComplete="family-name" required fullWidth variant="filled" name="last_name" id="lastName" label="Last Name" color="secondary" sx={{input: {color: "#000"}, backgroundColor: "text.primary"}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="filled" onChange={handleUsernameChange} error={errors.username} helperText={errors.username ? 'Username must be at least 10 characters long' : ''} 
                                inputProps={{pattern: '.{10,}'}} autoComplete="username" required fullWidth id="username" name="username"label="Username" color="secondary" sx={{input: {color: "#000"}, backgroundColor: "text.primary"}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="filled" onChange={handleEmailChange} error={errors.email} helperText={errors.email ? 'Enter a valid NYU email address (ends in @nyu.edu)' : ''} 
                                inputProps={{pattern: '.*\@nyu\.edu$'}} autoComplete="email" required fullWidth id="email" name="email"label="Email Address" color="secondary" sx={{input: {color: "#000"}, backgroundColor: "text.primary"}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="filled"  onChange={handlePasswordChange} error={errors.password} 
                                helperText={errors.password ? 'Password needs at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and at least 8 characters long': ''} 
                                inputProps={{pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"}}
                                autoComplete="new-password" required fullWidth name="password" label="Password" type="password"id="password" color="secondary" sx={{input: {color: "#000"}, backgroundColor: "text.primary"}}/>
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Register</Button>
                        <Typography variant="body2" color="text.secondary" align="center">
                                Already have an account? <a href="/login" style={{color: "#fff"}}>Login</a>
                        </Typography>
                    </Box>
                </Box>
            </Container>
            </Box>
        </ThemeProvider>
    );
}

export default Register;