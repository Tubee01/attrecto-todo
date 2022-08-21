import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "..";
import { useAuthContext } from "../../../context/AuthContext";

export const AuthRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<object>({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [isRegistratingIn, setIsRegistratingIn] = useState(false);
    const setAuth = useAuthContext()?.setAuth;

    useEffect(() => {
        const registration = async () => {
            const response = await post('/auth/registration', formData);
            if (response.status === 1) {
                const response = await post('/auth/login', formData);
                if (response.status === 1) {
                    setAuth?.({ isAuthenticated: true });
                    navigate('/');
                }
            }
        };
        if (isRegistratingIn) {
            registration();
        }
        return () => {
            setIsRegistratingIn(false);
        };
    }, [isRegistratingIn]);
    return [{ error, isRegistratingIn }, setFormData, setIsRegistratingIn, setError] as const;
};
export default AuthRegistration;