import React, { useContext, useRef, useState } from "react";
import ConfirmDialog from "../lib/components/ConfirmDialog";
import DynamicModal from "../lib/components/DynamicModal";

type UseModalShowReturnType = {
    show: boolean;
    setShow: (value: boolean) => void;
    onHide: () => void;
}

const useModalShow = (): UseModalShowReturnType => {
    const [show, setShow] = useState(false);

    const handleOnHide = () => {
        setShow(false);
    };

    return {
        show,
        setShow,
        onHide: handleOnHide,
    }
};

type ModalContextType = {
    showConfirmation: (title: string, message: string | JSX.Element, confirmText?: string) => Promise<boolean>;
};

type ConfirmationModalContextProviderProps = {
    children: React.ReactNode
}

const ConfirmationModalContext = React.createContext<ModalContextType>({} as ModalContextType);

const ConfirmationModalContextProvider: React.FC<ConfirmationModalContextProviderProps> = (props) => {
    const { setShow, show, onHide } = useModalShow();
    const [content, setContent] = useState<{ title: string, message: string | JSX.Element, confirmText?: string }>(
        {
            title: "",
            message: "",
            confirmText: "",
        }
    );
    const resolver = useRef<Function>();

    const handleShow = (title: string, message: string | JSX.Element, confirmText?: string): Promise<boolean> => {
        setContent({
            title,
            message,
            confirmText,
        });
        setShow(true);
        return new Promise(function (resolve) {
            resolver.current = resolve;
        });
    };

    const modalContext: ModalContextType = {
        showConfirmation: handleShow
    };

    const handleOk = () => {
        resolver.current && resolver.current(true);
        onHide();
    };

    const handleCancel = () => {
        resolver.current && resolver.current(false);
        onHide();
    };

    return (
        <ConfirmationModalContext.Provider value={modalContext}>
            {props.children}
            {show && (
                <DynamicModal title={content.title} content={content.message} open={show} onCancel={handleCancel} onConfirm={handleOk} confirmText={content.confirmText} />
            )}
        </ConfirmationModalContext.Provider>
    )
};

const useConfirmationModalContext = (): ModalContextType => useContext(ConfirmationModalContext);

export {
    useModalShow,
    useConfirmationModalContext,
}

export default ConfirmationModalContextProvider;