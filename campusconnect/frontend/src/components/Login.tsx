
import '../index.css';

import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Checkbox, FormControlLabel, Link } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Errors {
  email: boolean;
  password: boolean;
}
const Login = () => {
  const defaultTheme = createTheme();

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Errors>({
    email: false,
    password: false,
  })


  const handleEmailChange = (event: any) => {
    if (event.target.validity.valid) {
      setErrors({...errors, email: false});
    }
    else {
      setErrors({...errors, email: true});
    }
  }

  const handlePasswordChange = (event: any) => {
    if (event.target.validity.valid) {
      setErrors({...errors, password: false});
    }
    else {
      setErrors({...errors, password: true});
    }
  }
    // const [form, setForm] = useState({
    //     'password': '',
    //     'username': '',
    // });

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior for forms. We need this other some browsers (like Firefox) blocks the request.
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const form: Form = {
        email: data.get('email') as string,
        password: data.get('password') as string,}

      const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken') || '',
      }

      const response: Response = await fetch('api/authentication/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(form),
      })

      if (response.ok) {
        navigate("/home");
      }
      else {
        console.log("Login failed");
      }
  }

    return (
      <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{marginTop: 8,display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" onChange={handleEmailChange} required fullWidth id="email" label="Email Address" name="email" autoComplete="email" error={errors.email} autoFocus helperText={errors.email ? "Enter a valid NYU email id" : ""} inputProps={{ pattern: '.*\@nyu\.edu$'}}/>
            <TextField margin="normal" onChange={handlePasswordChange} required fullWidth name="password" label="Password" type="password" id="password" error={errors.password} autoComplete="current-password" helperText={errors.password ? "Enter a valid password" : ""} inputProps={{pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'}}/>
              
            <FormControlLabel control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" onSubmit={handleSubmit} fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );

}
export default Login;