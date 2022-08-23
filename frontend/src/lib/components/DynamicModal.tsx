import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";

interface IDynamicModal {
    title: string;
    confirmText?: string;
    content: string | JSX.Element;
    open: boolean;
    onCancel?: () => void;
    onConfirm?: () => void;
}

const DynamicModal = ({ title, content, open, onCancel, onConfirm, confirmText = "Confirm" }: IDynamicModal) => {
    const [isOpen, setOpen] = useState<boolean>(open);
    const onModalClose = () => {
        setOpen(false);
        onCancel && onCancel?.()
    }
    const onModalSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLElement>) => {
        e.preventDefault();
        setOpen(false);
        onConfirm && onConfirm?.()
    }
    return (
        <Dialog open={isOpen} onClose={onModalClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
                <Button onClick={onModalClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onModalSubmit} color="primary">
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DynamicModal;