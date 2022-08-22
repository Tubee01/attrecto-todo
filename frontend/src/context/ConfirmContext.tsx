import { createContext, useContext, useEffect, useState } from "react";
import ConfirmDialog from "../lib/components/ConfirmDialog";

interface ConfirmProviderProps {
    children: React.ReactNode;
}
export interface ConfirmContextProps {
    open: boolean;
    setOpen: Function;
    title: string;
    message: string;
    setTitle: Function;
    setMessage: Function;
    setOnConfirm: any;
    setOnCancel: any;
    onConfirm: any;
    onCancel: any;
}
export const ConfirmContext = createContext<ConfirmContextProps | null>(null);

export const useConfirmContext = () => {
    return useContext(ConfirmContext);
}

export const ConfirmProvider = ({ children }: ConfirmProviderProps): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [onConfirm, setOnConfirm] = useState<any>(null);
    const [onCancel, setOnCancel] = useState<any>(null);
    useEffect(() => {
        if(title !== "" && message !== "" && onConfirm !== null && onCancel !== null) {
            setOpen(true);
        }
    }, [onConfirm, onCancel]);
    return (
        <ConfirmContext.Provider value={{ open, setOpen, title, setTitle, message, setMessage, setOnConfirm, setOnCancel, onConfirm, onCancel }}>
            {children}
            {open && <ConfirmDialog onConfirm={() => {
                setOpen(false);
                onConfirm && onConfirm();
            }} onCancel={() => {
                setOpen(false);
                onCancel && onCancel();
            }} title={title} message={message} />}
        </ConfirmContext.Provider>
    );
}