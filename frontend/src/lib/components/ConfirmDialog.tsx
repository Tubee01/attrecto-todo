import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";

interface IConfirmDialogProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog = ({ title, message, onConfirm, onCancel }: IConfirmDialogProps) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const handleConfirm = () => {
        setOpen(false);
        onConfirm && onConfirm?.();
    }
    useEffect(() => {
        setOpen(true);
    }, [onConfirm, onCancel]);
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default ConfirmDialog;