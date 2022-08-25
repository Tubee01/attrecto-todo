import { Delete, Edit, NavigateBefore, PlusOne } from "@mui/icons-material";
import { Box, Button, IconButton, List, Skeleton,ListItem, ListItemText} from "@mui/material";

import { useEffect, useState } from "react";
import { del } from "../../api";
import TodoFindAll from "../../api/todos/findAll";
import CreateOrEditTodo from "./TodoCreateOrEdit";

export interface ITodo {
    id: string;
    title: string;
    description?: string;
    done: boolean;
    date_till?: Date;
    created_at: Date;
    updated_at: Date;
    user_id?: string | null;
}

interface TodoListProps {
    userId?: string | undefined
}

const TodoList = ({ userId }: TodoListProps) => {
    const [isAddTodo, setAddTodo] = useState(false);
    const [isEditTodo, setIsEditTodo] = useState(false);
    const [todo, setTodo] = useState<ITodo | null>(null);
    const [todoList, setTodoList] = useState<ITodo[]>([]);
    const [{ isTodoFindAllError, isTodoFindAllLoading, todos }, setTodoFormData, setIsTodoLoading, setIsTodoError] = TodoFindAll();

    //delete todo
    const onDeleteTodo = async (id: string) => {
        const response = await del(`/todo/${id}`);
        if (response.status === 1) {
            setTodoList(todoList.filter(todo => todo.id !== id));
            return alert("Todo deleted successfully");
        }
        return alert("Todo not deleted");
    }
    // fetch todos
    useEffect(() => {
        setIsTodoError(null);
        if (userId) {
            setTodoFormData({
                searchString: '',
                userId: (userId as string)
            })
        }
        setIsTodoLoading(true);
    }, []);
    useEffect(() => {
        if (todos) {
            setTodoList(todos);
        }
    }, [todos]);
    const backToList = () => {
        setAddTodo(false);
        setIsEditTodo(false);
        setIsTodoLoading(true); // todo list will be refreshed
        setTodo(null);

    }
    if (isAddTodo || isEditTodo) {
        return (
            <>
                <Box sx={{
                    marginBottom: '2rem'
                }}>
                    <Button size="small" onClick={() => backToList()} variant="outlined" color="primary" startIcon={<NavigateBefore />}>
                        Back to list
                    </Button>
                </Box>
                <CreateOrEditTodo userId={userId} todo={isEditTodo ? todo as ITodo : null} />
            </>
        )
    }
    return isTodoFindAllLoading ? (<Skeleton variant="rounded" width={"100%"} height={380} />) : (
        isTodoFindAllError ? (<div>Error while fetching todos</div>) : (
            todoList && todoList.length > 0 ? (
                <>
                    <Box sx={{
                        marginTop: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <Button onClick={() => { setTodo(null); setAddTodo(true) }} variant="outlined" color="primary" startIcon={<PlusOne />}>
                            Add Todo
                        </Button>
                    </Box>
                    <List sx={{ width: '100%', minWidth: '355px', bgcolor: 'background.paper', border: '1px solid', borderRadius: '5px', paddingBottom: 0 }}>
                        {(todoList as ITodo[]).map((todo) => (
                            <ListItem
                                key={todo.id}
                                sx={{
                                    display: 'flex',
                                    borderBottom: '1px solid',
                                    gap: '1rem',
                                    justifyContent: 'space-between',
                                    backgroundColor: todo.done ? 'green' : 'white',
                                }}
                                secondaryAction={
                                    <>
                                        <IconButton onClick={() => { setTodo(todo); setIsEditTodo(true); }} >
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => onDeleteTodo(todo.id as string)} >
                                            <Delete />
                                        </IconButton>
                                    </>
                                }
                            >


                                <ListItemText primary={todo.title} secondary={todo.description} />
                            </ListItem>
                        ))}
                    </List>
                </>
            ) : (
                <>
                    <div>No todos found</div>
                    <Box sx={{
                        marginTop: '1rem'
                    }}>
                        <Button onClick={() => { setTodo(null); setAddTodo(true) }} variant="outlined" color="primary" startIcon={<PlusOne />}>
                            Add Todo
                        </Button>
                    </Box>
                </>
            )
        )

    )

}
export default TodoList;