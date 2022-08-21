import { Avatar } from "@mui/material";
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
    onDelete?: (id: string) => void;
}

const UsersList = ({ users, onDelete }: UsersListProps) => {
    const value = useContext(AuthContext);
    const auth = value?.auth;
    return (
        <div>
            <List sx={{ width: '100%', bgcolor: 'background.paper', border: '1px solid', borderRadius: '5px', paddingBottom: 0 }}>
                {users.map((user) => (
                    <ListItem
                        key={user.id}
                        sx={{
                            display: 'flex',
                            borderBottom: '1px solid',
                            gap: '1rem',
                            justifyContent: 'space-between',
                        }}>
                        <ListItemAvatar>
                            <Avatar {...stringAvatar(user.name)} />
                        </ListItemAvatar>
                        <ListItemText primary={user.name} secondary={user.email} />
                        {user.id === auth?.user?.id || auth?.user?.admin ? (
                            <>
                                <Button variant="outlined" startIcon={<ListAlt />}>
                                    Todos
                                </Button>
                                <Button variant="outlined" startIcon={<EditIcon />}>
                                    Edit
                                </Button>
                                <Button variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </>

                        ) : null}
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
export default UsersList;