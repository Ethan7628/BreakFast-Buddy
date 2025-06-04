import { Typography, Box } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase'
import { Link } from "react-router-dom";

export const Home = () => {
    const [user] = useAuthState(auth);

    return (
        <Box>
            <div className="HeroSection">
                <div className="welcome">
                    <Typography variant="h4" gutterBottom>
                        Welcome to Breakfast Buddy
                    </Typography>
                    <Typography >
                        Submit your breakfast preferences to help us plan better meals for
                        everyone.
                    </Typography>
                    {!user && (
                        <Typography >
                            Please <Link to="/login" className="hmbtn">login</Link> or{" "}
                            <Link to="/signup" className="hmbtn">sign up</Link> to get started.
                        </Typography>
                    )}
                </div>
            </div>
        </Box>
    );
};