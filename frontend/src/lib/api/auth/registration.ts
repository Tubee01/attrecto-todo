import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "..";
import { useAuthContext } from "../../../context/AuthContext";

const AuthRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<object>({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [isRegistratingIn, setIsRegistratingIn] = useState(false);
    const [withLogin, setWithLogin] = useState(false);
    const setAuth = useAuthContext()?.setAuth;

    useEffect(() => {
        const registration = async () => {
            const response = await post('/auth/registration', formData);
            if (response.status === 1) {
                if (withLogin) {
                    const response = await post('/auth/login', formData);
                    if (response.status === 1) {
                        setAuth?.({ isAuthenticated: true, ...response.data });
                        navigate('/');
                    }
                }
                setIsRegistratingIn(false);
                setSuccess(true);
                return;
            }
            setIsRegistratingIn(false);
            setError(response.message);
            setSuccess(false);
        };
        if (isRegistratingIn) {
            registration();
        }
    }, [isRegistratingIn]);
    return [{ error, isRegistratingIn, success }, setFormData, setIsRegistratingIn, setError, setWithLogin] as const;
};
export default AuthRegistration;