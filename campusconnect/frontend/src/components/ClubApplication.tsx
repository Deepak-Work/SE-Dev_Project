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
import { Chip, InputAdornment, styled } from '@mui/material';
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
    club_name: string;
    club_description: string;
    club_location: string;
    club_email: string;
    club_website: string;
    club_contact: string;
    club_members: string;
    club_events: string;
    club_image: string;
}

interface Errors{
    club_name: boolean;
    club_description: boolean;
    club_location: boolean;
    club_website: boolean;
    club_contact: boolean;
    club_email: boolean;
    club_members: boolean;
    club_events: boolean;
    club_image: boolean;
}



const CreateClub = () => {
    const defaultTheme = createTheme();
    
    const [errors, setErrors] = useState<Errors>({
        club_name: false,
        club_description: false,
        club_location: false,
        club_website: false,
        club_email: false,
        club_contact: false,
        club_members: false,
        club_events: false,
        club_image: false,
    });

    const navigate = useNavigate();

    const handleClubNameChange = (event: any) => {
        if (event.target.validity.valid) {
            setErrors({...errors, club_name: false});
        }
        else {
            setErrors({...errors, club_name: true});
        }
    }

    const handleClubDescriptionChange = (event: any) => {
        if (event.target.validity.valid) {
            setErrors({...errors, club_description: false});
        }
        else {
            setErrors({...errors, club_description: true});
        }
    }

    const handleClubEmailChange = (event: any) => {
        if (event.target.validity.valid) {
            setErrors({...errors, club_email: false});
        }
        else {
            setErrors({...errors, club_email: true});
        }
    }


    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        // Prevent default behavior for forms. We need this other some browsers (like Firefox) blocks the request.
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const form: Form = {
            club_name: data.get('club_name') as string,
            club_description: data.get('club_description') as string,
            club_location: data.get('club_location') as string,
            club_email: data.get('club_email') as string,
            club_website: data.get('club_website') as string,
            club_contact: data.get('club_contact') as string,
            club_members: data.get('club_members') as string,
            club_events: data.get('club_events') as string,
            club_image: data.get('club_image') as string,
        }

        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken') || '',
        }

        const response: Response = await fetch('api/club/create', {
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
                                <TextField onChange={handleClubNameChange} error={errors.club_name} helperText={errors.club_name ? 'Please enter a valid club name' : ''} inputProps={{pattern: '.{8,}',maxLength: 50}} autoComplete="club-name" name="club_name" required fullWidth id="club_name" label="Club Name" autoFocus/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleClubDescriptionChange} error={errors.club_description} helperText={errors.club_description ? 'Please enter a valid club description' : ''} inputProps={{maxLength: 500, minLength: 50}} autoComplete="club-description" multiline fullWidth rows={4} required name="club_description" id="club_description" label="Club Description" variant='outlined'/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete="club-location" required fullWidth id="club_location" name="club_location" label="Club Location" type='text' variant='outlined' InputProps={{startAdornment: (<InputAdornment position="start">📍</InputAdornment>),}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleClubEmailChange} error={errors.club_email} helperText={errors.club_email ? 'Please enter a valid club email' : ''} inputProps={{pattern: '\@nyu\.edu$*'}} autoComplete='club-email' required fullWidth id="club_email" name="club_email" label="Club Email" type='email' variant='outlined' InputProps={{startAdornment: (<InputAdornment position="start">📧</InputAdornment>),}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete="club-website" fullWidth id="club_website" name="club_website" label="Club Website" type='url' variant='outlined' InputProps={{startAdornment: (<InputAdornment position="start">🌐</InputAdornment>),}} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete="club-contact" required fullWidth id="club_contact" name="club_contact" label="Club Contact" type='tel' variant='outlined' InputProps={{startAdornment: (<InputAdornment position="start">📞</InputAdornment>),}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete="club-members"  
                                    fullWidth 
                                    id="club_members" 
                                    name="club_members" 
                                    label="Club Members" 
                                    select SelectProps={{multiple: true, renderValue: (selected) => (
                                        <div>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </div>
                                    ),}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete="club-events" 
                                fullWidth 
                                id="club_events" 
                                name="club_events" 
                                label="Club Events"
                                select SelectProps={{multiple: true, renderValue: (selected) => (
                                    <div>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </div>
                                    
                                ),}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <Button component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                Upload Image
                                >
                                Upload file
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