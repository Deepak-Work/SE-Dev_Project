// import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';

// import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputAdornment, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';

// Club Name
// Club Description
// Club Location
// Club Website
// Club Contact
// Club Members
// Club Events
// Club Image
// Submit

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

interface Form{
    name: string;
    description: string;
    location: string;
    email: string;
    website: string;
    contact: string;
    // members: string;
    // events: string;
    // image: string;
}

interface Errors{
    name: boolean;
    description: boolean;
    location: boolean;
    website: boolean;
    contact: boolean;
    email: boolean;
    // members: boolean;
    // events: boolean;
    // image: boolean;
}

// TODO: Add validation and double check members/events/image fields

const CreateClub = () => {
    const defaultTheme = createTheme();
    
    const [errors, setErrors] = useState<Errors>({
        name: false,
        description: false,
        location: false,
        website: false,
        email: false,
        contact: false,
        // members: false,
        // events: false,
        // image: false,
    });

    const navigate = useNavigate();

    const handleClubNameChange = (event: any) => {
        if (event.target.validity.valid) {
            setErrors({...errors, name: false});
        }
        else {
            setErrors({...errors, name: true});
        }
    }

    const handleClubDescriptionChange = (event: any) => {
        if (event.target.validity.valid) {
            setErrors({...errors, description: false});
        }
        else {
            setErrors({...errors, description: true});
        }
    }

    const handleClubEmailChange = (event: any) => {
        if (event.target.validity.valid) {
            setErrors({...errors, email: false});
        }
        else {
            setErrors({...errors, email: true});
        }
    }


    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        // Prevent default behavior for forms. We need this other some browsers (like Firefox) blocks the request.
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const form: Form = {
            name: data.get('name') as string,
            description: data.get('description') as string,
            location: data.get('location') as string,
            email: data.get('email') as string,
            website: data.get('website') as string,
            contact: data.get('contact') as string,
            // members: data.get('members') as string,
            // events: data.get('events') as string,
            // image: data.get('image') as string,
        }

        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken') || '',
        }

        const response: Response = await fetch('api/clubs/create', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(form),
        })
        
        if (response.ok) {
            console.log("Club created successfully");
            navigate("/home");
        } else {
            console.log("Club creation failed");
        }
    }
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography component="h1" variant="h5">Club Application</Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField onChange={handleClubNameChange} error={errors.name} helperText={errors.name ? 'Please enter a valid club name' : ''} inputProps={{pattern: '.{8,}',maxLength: 50}} autoComplete="club-name" name="name" required fullWidth id="name" label="Club Name" autoFocus/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleClubDescriptionChange} error={errors.description} helperText={errors.description ? 'Please enter a valid club description' : ''} inputProps={{maxLength: 500, minLength: 50}} autoComplete="club-description" multiline fullWidth rows={4} required name="description" id="description" label="Club Description" variant='outlined'/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete="club-location" required fullWidth id="location" name="location" label="Club Location" type='text' variant='outlined' InputProps={{startAdornment: (<InputAdornment position="start">📍</InputAdornment>),}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleClubEmailChange} error={errors.email} helperText={errors.email ? 'Please enter a valid club email' : ''} inputProps={{pattern: '\@nyu\.edu$*'}} autoComplete='club-email' required fullWidth id="email" name="email" label="Club Email" type='email' variant='outlined' InputProps={{startAdornment: (<InputAdornment position="start">📧</InputAdornment>),}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete="club-website" fullWidth id="website" name="website" label="Club Website" type='url' variant='outlined' InputProps={{startAdornment: (<InputAdornment position="start">🌐</InputAdornment>),}} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete="club-contact" required fullWidth id="contact" name="contact" label="Club Contact" type='tel' variant='outlined' InputProps={{startAdornment: (<InputAdornment position="start">📞</InputAdornment>),}}/>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField autoComplete="club-members"  
                                    fullWidth 
                                    id="members" 
                                    name="members" 
                                    label="Club Members" 
                                    select 
                                    SelectProps={{multiple: true, 
                                        renderValue: (selected: unknown) => {
                                            if (Array.isArray(selected)) {
                                              return (
                                                <div>
                                                  {selected.map((value: string) => (
                                                    <Chip key={value} label={value} />
                                                  ))}
                                                </div>
                                              );
                                            }
                                            return null; // Return a default or handle other cases as needed
                                          },
                                        }}/>
                            </Grid> */}
                            {/* <Grid item xs={12}>
                                <TextField autoComplete="club-events" 
                                fullWidth 
                                id="events" 
                                name="events" 
                                label="Club Events"
                                select 
                                SelectProps={{multiple: true, 
                                    renderValue: (selected: unknown) => {
                                        if (Array.isArray(selected)) {
                                          return (
                                            <div>
                                              {selected.map((value: string) => (
                                                <Chip key={value} label={value} />
                                              ))}
                                            </div>
                                          );
                                        }
                                        return null; // Return a default or handle other cases as needed
                                      },
                                    }}/>
                            </Grid> */}
                            <Grid item xs={12}>
                            <Button component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                >
                                Upload Profile Pic
                                <VisuallyHiddenInput type="file" />
                                </Button>
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained"  sx={{ mt: 3, mb: 2 }}>Submit Application</Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};


export default CreateClub;