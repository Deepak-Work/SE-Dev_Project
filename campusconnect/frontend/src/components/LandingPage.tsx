import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
    const navigate = useNavigate();
    const createNewClub = () => {

        event?.preventDefault();

        navigate('/create-club');

        
    }


    return (
        <div>
            <h1>Landing Page</h1>

            <Button variant="contained" onClick={createNewClub}>Add Club</Button>
        </div>
    );
}

export default LandingPage
