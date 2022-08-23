import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import AuthLogin from '../../lib/api/auth/login';

const Login = () => {
    const [formData, updateFormData] = useState({ email: "", password: "" });
    const [{ error, isLoggingIn }, setFormData, setIsLoggingIn, setError] = AuthLogin();
    const signIn = (form: any) => {
        form.preventDefault();
        setFormData?.(formData);
        setIsLoggingIn?.(true);
    };
    const handleChange = (e: any) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError?.(null);
            }, 3600);
        }
    }, [error])


    return (
        <Container component="main" maxWidth="xs">

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
                    Sign in
                </Typography>
                {/* if error show div */}
                <Box sx={{ mt: 1, display: error ? 'block' : 'none' }}>
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                </Box>
                <Box component="form" onSubmit={signIn} sx={{ mt: !error ? 1 : 0 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button
                        disabled={isLoggingIn}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/registration" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box >
        </Container>
    );
}

export default Login;
