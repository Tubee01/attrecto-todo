
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthRegistration from '../../lib/api/auth/registration';
import { useEffect, useState } from 'react';

const Registration = () => {
    const [formData, updateFormData] = useState({
        name: "",
        email: "",
        password: "",
        password1: "",
    });
    const [{ error, isRegistratingIn }, setFormData, setIsRegistratingIn, setError] = AuthRegistration();
    const regIn = (form: any) => {
        form.preventDefault();
        if (formData.password !== formData.password1 || formData.password.length < 6) {
            setError?.("Passwords do not match or are too short");
            return;
        }
        const { password1, ...regData } = formData;
        setFormData?.(regData);
        setIsRegistratingIn?.(true);
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
            console.log(error);
            setTimeout(() => {
                setError?.(null);
            }, 3600);
        }
    }, [error])

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
                {/* if error show div */}
                <Box sx={{ mt: 1, display: error ? 'block' : 'none' }}>
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                </Box>
                <Box component="form" onSubmit={regIn} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>

                            <TextField
                                name="name"
                                required
                                fullWidth
                                id="fullName"
                                label="Full name"
                                autoFocus
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                name="password1"
                                label="Password"
                                type="password"
                                id="password1"
                                autoComplete="new-password"
                                value={formData.password1}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={3} sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Checkbox required value="allowExtraEmails" color="primary" />
                            </Grid>
                            <Grid item xs={9}>
                                <Link target="_blank" href="http://retek.hu" variant="body2">
                                    I agree to the terms and conditions of the software,
                                </Link>
                                <small style={{
                                    opacity: 0.5,
                                }}>
                                    &nbsp;and hereby sign away my rights just to use this app.
                                </small>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container >
    )
}
export default Registration;