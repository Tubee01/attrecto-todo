import { Avatar, Grid } from "@mui/material";
import { stringAvatar } from "../../helpers";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ListAlt } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ConfirmContext, ConfirmContextProps } from "../../../context/ConfirmContext";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    admin: boolean;
}
interface UsersListProps {
    users: User[];
}
const UsersList = ({ users }: UsersListProps) => {
    const conFirmDialog = useContext(ConfirmContext);
    const value = useContext(AuthContext);
    const auth = value?.auth;
    // delete user 
    const deleteUser = (id: string) => {
        console.log(id)
    }
    // open confirm dialog
    const openConfirmDeleteDialog = (user: User) => {
        conFirmDialog?.setTitle("Delete User");
        conFirmDialog?.setMessage("Are you sure you want to delete this user?");
        conFirmDialog?.setOnConfirm(
           () => deleteUser(user.id)
        );
        conFirmDialog?.setOpen(true);
    }
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Grid container sx={{ gap: '1rem', }}  >
                {users.map((user) => (
                    <ListItem
                        key={user.id}
                        sx={{
                            display: 'flex',
                            padding: '0.5rem',
                            borderBottom: '1px solid',
                            justifyContent: 'space-between',
                        }}>
                        <Grid item xs={12} md={3} >
                            <ListItemAvatar>
                                <Avatar {...stringAvatar(user.name)} />
                            </ListItemAvatar>
                            <ListItemText primary={user.name} secondary={user.email} />
                        </Grid>
                        <Grid container item xs={12} md={6} spacing={1} direction="row"
                            justifyContent="flex-end"
                            alignItems="center">
                            {user.id === auth?.user?.id || auth?.user?.admin ? (
                                <>
                                    <Grid item xs={12} md={12} lg={3}>
                                        <Button fullWidth variant="outlined" startIcon={<ListAlt />}>
                                            Todos
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Button fullWidth variant="outlined" startIcon={<EditIcon />}>
                                            Edit
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Button onClick={() => openConfirmDeleteDialog(user)} fullWidth variant="outlined" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </Grid>
                                </>

                            ) : null}
                        </Grid>
                    </ListItem>
                ))}
            </Grid>
        </List >
    );
}
export default UsersList;