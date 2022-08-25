import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { post, put } from "../../api";

interface ITodo {
    id?: string
    title: string;
    description?: string | null;
    done: boolean;
    date_till?: Date | null;
    user_id?: string | null;
}
interface ICreateTodoProps {
    userId?: string | null;
    todo?: ITodo | null;
}
const CreateOrEditTodo = ({ userId = null, todo = null }: ICreateTodoProps) => {
    const [formData, setFormData] = useState<ITodo>((todo as ITodo) || {
        title: '',
        description: '',
        done: false,
        date_till: null,
        user_id: userId
    });
    const { title, description, done, date_till } = formData;
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const onChangeDone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setFormData({ ...formData, done: checked });
    }
    const onChangeDateTill = (date: Date | null) => {
        setFormData({ ...formData, date_till: date });
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (todo) {
            const response = await put(`/todo/${todo.id as string}`, formData);
            if (response.status === 1) {
                return alert("Todo updated successfully");
            }
            return alert("Todo not updated");

        }
        const response = await post('/todo', formData);
        if (response.status === 1) {
            return alert("Todo created successfully");
        }
        return alert("Todo not created");


    }
    useEffect(() => {
        if (userId) {
            setFormData({ ...formData, user_id: userId as string });
        }

    }, [userId]);
    return (
        <Box component="form" onSubmit={onSubmit}>
            <Box display="flex" flexDirection="column">
                <Box marginBottom={2}>
                    <TextField fullWidth name="title" required label="Title" value={title} onChange={onChange} />
                </Box>
                <Box marginBottom={2}>
                    <TextField fullWidth multiline rows={5} name="description" label="Description" value={description} onChange={onChange} />
                </Box>
                <Box marginBottom={2}>
                    <DateTimePicker
                        label="Due date"
                        value={date_till}
                        onChange={onChangeDateTill}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Box>
                <Box marginBottom={2}>
                    <FormControlLabel control={<Checkbox name="done" checked={done} onChange={onChangeDone} />} label="Done" />
                </Box>
                <Box marginBottom={2}>
                    <Button type="submit" variant="contained" color="primary">{todo ? 'Save' : 'Create'}</Button>
                </Box>
            </Box>
        </Box>
    );
}
export default CreateOrEditTodo;