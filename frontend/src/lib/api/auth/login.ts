import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "..";
import { useAuthContext } from "../../../context/AuthContext";

export const AuthLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<object>({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
    const setAuth = useAuthContext()?.setAuth;

    useEffect(() => {
        const LoginIn = async () => {
            const response = await post('/auth/login', formData);
            if (response.status === 1) {
                setAuth?.({ isAuthenticated: true, ...response.data });
                navigate('/');
            }
            setError(response.message);
        };
        if (isLoggingIn) {
            LoginIn();
        }
        return () => {
            setIsLoggingIn(false);
        };
    }, [isLoggingIn]);
    return [{ error, isLoggingIn }, setFormData, setIsLoggingIn, setError] as const;
};
export default AuthLogin;