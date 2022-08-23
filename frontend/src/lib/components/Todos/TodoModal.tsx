import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import CreateTodo from "./CreateTodo";

interface ITodoModal {
    open: boolean;
}

const TodoModal = ({ open }: ITodoModal) => {
    const [isOpen, setOpen] = useState<boolean>(open);
    const onClose = () => {
        setOpen(false);
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLElement>) => {
        e.preventDefault();
        setOpen(false);
    }
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Create Todo</DialogTitle>
            <DialogContent>
                <CreateTodo />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onSubmit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default TodoModal;