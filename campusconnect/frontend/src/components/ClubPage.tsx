import { Button, Container, Grid } from "@mui/material";

const ClubPage = () => {
    return (
        <div>
            <div style={{ height: '300px', backgroundColor: 'red', top: '30%'}}> 
            <Container maxWidth="xl">
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '300px', backgroundColor: 'red', top: '30%'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center', height: '300px', backgroundColor: 'red', top: '30%'}}>
                <h1>Image here</h1>
                <h1 className="text-3xl">Club Name</h1>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', padding: '10px', justifyContent: 'space-between', alignItems: 'center', height: '300px', backgroundColor: 'red', top: '30%'}}>
                <Button variant="contained">Follow</Button>
                <Button variant="contained">Message</Button>
                </div>
                </div>
            </Container>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Container maxWidth="xl">
                    <p>posts will be present here</p>
                    </Container>
                </Grid>
                <Grid item xs={4}>
                    <Container maxWidth="xl">
                        <p>Club Description</p>
                    </Container>
                </Grid>
            </Grid>

        </div>
    )
}

export default ClubPage;