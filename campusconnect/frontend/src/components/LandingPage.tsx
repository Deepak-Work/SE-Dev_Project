import { Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
    const navigate = useNavigate();
    const createNewClub = () => {

        event?.preventDefault();

        navigate('/create-club');

        
    }

    // const containerStyle = {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     height: '300px',
    //     backgroundColor: 'red',
    // }


    return (
        <div>
        <Container maxWidth="xl" >
          <h1 className="text-3xl">Home Page</h1>
          <Button variant="contained" onClick={createNewClub}>
                Add Club
            </Button>
        </Container>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Container maxWidth="xl" >
              <h1 className="text-3xl">Posts here</h1>
            </Container>
          </Grid>
          <Grid item xs={3}>
            <Container maxWidth="xl" >
            <h1 className="text-3xl">SideBar here</h1>
            </Container>
          </Grid>
        </Grid>
      </div>
    );
}

export default LandingPage
