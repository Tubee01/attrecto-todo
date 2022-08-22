import { PlusOne } from "@mui/icons-material";
import { Button, Grid, Skeleton } from "@mui/material";
import { useEffect } from "react";
import UserFindAll from "../../lib/api/user/findAll";
import UsersList from "../../lib/components/Users/UsersList";
import './Home.css';
const Home = () => {
    const [{ users, isLoading }, setFormData, setIsLoading, setError] = UserFindAll();
    useEffect(() => {
        setError(null);
        setIsLoading(true);
    }, []);
    return (
        <div className="container">
            <Grid container spacing={3} >
                <Grid item xs={12} className="btn-container" >
                    <Button href="/create-user" variant="outlined" color="primary" startIcon={<PlusOne />}>
                        Add User
                    </Button>
                    <Button href="/todo" variant="outlined" color="primary" startIcon={<PlusOne />}>
                        Add Todo
                    </Button>
                </Grid>
                <Grid item xs={12} className="list-container">
                    {isLoading ? (<Skeleton variant="rounded" width={"100%"} height={380} />) : (
                        <UsersList users={users} />
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
export default Home;
