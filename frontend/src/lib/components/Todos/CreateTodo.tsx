import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface Todo {
    title: string;
    description: string;
    done: boolean;
    date_till?: Date | null;
}
const CreateTodo = () => {
    const [todo, setTodo] = useState<Todo>({
        title: '',
        description: '',
        done: false,
        date_till: null
    });
    const { title, description, done, date_till } = todo;
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTodo({ ...todo, [name]: value });
    }
    const onChangeDone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setTodo({ ...todo, done: checked });
    }
    const onChangeDateTill = (date: Date | null) => {
        setTodo({ ...todo, date_till: date });
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(todo);
    }
    return (
        <Box component="form" onSubmit={onSubmit}>
            <Box display="flex" flexDirection="column">
                <Box marginBottom={2}>
                    <TextField name="title" required label="Title" value={title} onChange={onChange} />
                </Box>
                <Box marginBottom={2}>
                    <TextField name="description" required label="Description" value={description} onChange={onChange} />
                </Box>
                <Box marginBottom={2}>
                    <DateTimePicker
                        label="DateTime picker"
                        value={date_till}
                        onChange={onChangeDateTill}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Box>
                <Box marginBottom={2}>
                    <FormControlLabel control={<Checkbox name="done" checked={done} onChange={onChangeDone} />} label="Done" />
                </Box>
                <Box marginBottom={2}>
                    <Button type="submit" variant="contained" color="primary">Create</Button>
                </Box>
            </Box>
        </Box>
    );
}
export default CreateTodo;