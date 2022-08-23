import { Box, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react";

export interface IUser {
    id?: string;
    name: string;
    email: string;
    password?: string;
    password1?: string;
    createdAt?: Date;
    updatedAt?: Date;
    admin?: boolean;
    profile_image_file_id: string | null;
}

interface IUserEditProps {
    user: IUser;
    handleChange: Function;
}

const UserEdit = ({ user, handleChange }: IUserEditProps) => {
    const [formData, updateFormData] = useState<IUser>(user);

    const handleFormChange = (e: any) => {
        const data = { ...formData, [e.target.name]: e.target.value };
        updateFormData(data);
        handleChange && handleChange(data);
    };

    return (
        <Box component="div" sx={{ mt: 3 }}>
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
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
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
                        value={formData.password || ''}
                        onChange={handleFormChange}
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
                        value={formData.password1 || ''}
                        onChange={handleFormChange}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
export default UserEdit;