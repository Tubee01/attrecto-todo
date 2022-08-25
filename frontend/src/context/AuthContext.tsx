import React, { createContext, useState, useContext, useEffect } from "react";
import { get } from "../lib/api";
import { API_COOKIE } from "../lib/env";
import { deleteCookies, getCookies } from "../lib/helpers";
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
    onLogout: Function;
}
interface Props {
    children: React.ReactNode
}
export const AuthContext = createContext<IAuthContext | null>(null);

export const useAuthContext = () => {
    return useContext(AuthContext);
};
//logout
export const onLogout = async () => {
    try {
        await get('/api/auth/logout');
    } catch (e) {
        console.log(e);
    }
    deleteCookies(API_COOKIE as string);
    window.location.href = '/' as string;
}
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
            <AuthContext.Provider value={{ auth, setAuth, isLoading, onLogout }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

