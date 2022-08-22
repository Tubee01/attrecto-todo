
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';
import UserCreate from '../../lib/components/Users/UserCreate';

const Registration = ({ withLogin }: { [key: string]: any }) => {


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: "100vh",
                    justifyContent: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <UserCreate withLogin={withLogin} />
                {!withLogin &&
                    <Button
                        fullWidth
                        href="/" variant="contained">
                        Home
                    </Button>
                }
            </Box>
        </Container >
    )
}
export default Registration;