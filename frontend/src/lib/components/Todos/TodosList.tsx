import { List } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export interface ITodo {
    id: string;
    done: boolean;
    title: string;
    description?: string;
    date_till?: Date;
    created_at: Date;
    updated_at: Date;
}

interface TodoListProps {
    todos: ITodo[];
    onTodoClick?: Function | null;
}

const TodosList = ({ todos, onTodoClick = null }: TodoListProps) => {
    return (
        <List sx={{ width: '100%', minWidth: '355px', bgcolor: 'background.paper', border: '1px solid', borderRadius: '5px', paddingBottom: 0 }}>
            {todos.map((todo) => (
                <ListItem
                    key={todo.id}
                    sx={{
                        display: 'flex',
                        borderBottom: '1px solid',
                        gap: '1rem',
                        justifyContent: 'space-between',
                    }}>

                    <ListItemText primary={todo.title} secondary={todo.description} />
                </ListItem>
            ))}
        </List>
    );

}
export default TodosList;