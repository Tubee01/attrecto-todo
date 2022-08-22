import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../lib/api";
import { getCookies } from "../lib/helpers";
type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    admin: boolean;
};
interface IAuthContext {
    auth: {
        isAuthenticated: boolean;
        user?: User | undefined;
    };
    setAuth: Function;
    isLoading: boolean;
}
interface Props {
    children: React.ReactNode
}
export const AuthContext = createContext<IAuthContext | null>(null);

export const useAuthContext = () => {
    return useContext(AuthContext);
};
export const AuthProvider = ({ children }: Props): JSX.Element => {
    const [isLoading, setLoading] = useState(true);
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            id: "",
            name: "",
            email: "",
            password: "",
            admin: false
        }
    });
    useEffect(() => {
        const getStatus = async () => {
            const cookie = getCookies('connect.sid');
            if (!cookie) {
                return setLoading(false);
            }
            const response = await get("/auth/status");
            const user: User = response.data;
            if (response.status === 1) {
                setAuth({ isAuthenticated: true, user });
            }
            setLoading(false);
        };
        if (isLoading) getStatus();
    });
    return (
        <>
            <AuthContext.Provider value={{ auth, setAuth, isLoading }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

