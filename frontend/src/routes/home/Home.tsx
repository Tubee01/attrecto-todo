import { PlusOne } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect } from "react";
import UserFindAll from "../../lib/api/user/findAll";
import UsersList from "../../lib/components/Users/UsersList";

const Home = () => {
    const [{ error, isLoading, users }, setFormData, setIsLoading, setError] = UserFindAll();

    useEffect(() => {
        setError(null);
        setIsLoading(true);
    }, []);
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'

        }}>
            <Button variant="outlined" startIcon={<PlusOne />}>
                Add User
            </Button>
            <UsersList users={users} />
        </div>
    );
}
export default Home;