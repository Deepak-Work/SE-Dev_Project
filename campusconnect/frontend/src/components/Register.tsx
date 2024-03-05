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
    const defaultTheme = createTheme();

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

        const response: Response = await fetch('api/authentication/register', {
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
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography component="h1" variant="h5">Register</Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField autoComplete="given-name" name="first_name" required fullWidth id="firstName" label="First Name" autoFocus/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField autoComplete="family-name" required fullWidth name="last_name" id="lastName" label="Last Name"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleUsernameChange} error={errors.username} helperText={errors.username ? 'Username must be at least 10 characters long' : ''} 
                                inputProps={{pattern: '.{10,}'}} autoComplete="username" required fullWidth id="username" name="username"label="Username"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleEmailChange} error={errors.email} helperText={errors.email ? 'Enter a valid NYU email address (ends in @nyu.edu)' : ''} 
                                inputProps={{pattern: '.*\@nyu\.edu$'}} autoComplete="email" required fullWidth id="email" name="email"label="Email Address"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handlePasswordChange} error={errors.password} 
                                helperText={errors.password ? 'Password needs at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and at least 8 characters long': ''} 
                                inputProps={{pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'}}
                                autoComplete="new-password" required fullWidth name="password" label="Password" type="password"id="password"/>
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Register</Button>
                        <Typography variant="body2" color="text.secondary" align="center">
                                Already have an account? <a href="/login">Login</a>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Register;