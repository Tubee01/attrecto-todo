import { Logout, PlusOne } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";

import UsersList from "../../lib/components/Users/UsersList";
import './Home.css';
const Home = () => {
    const auth = useAuthContext();

    return (
        <div className="container">
            <Grid container spacing={3} >
                <Grid item xs={12} className="btn-container" >
                    <Button href="/create-user" variant="outlined" color="primary" startIcon={<PlusOne />}>
                        Add User
                    </Button>
                    <Button onClick={() => auth?.onLogout()} variant="outlined" color="primary" startIcon={<Logout />}>
                        Logout
                    </Button>
                </Grid>
                <Grid item xs={12} className="list-container">
                    <UsersList />
                </Grid>
            </Grid>
        </div>
    );
}
export default Home;
