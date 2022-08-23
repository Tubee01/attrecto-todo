import { useEffect, useState } from "react";
import { put } from "..";
import { IUser } from "../../components/Users/UserEdit";


const UserUpdate = () => {
    const [isError, setIsError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [formData, setFormData] = useState<IUser>({
        id: '',
        name: '',
        email: '',
        password: '',
        password1: '',
        admin: false,
        profile_image_file_id: null,
    });
    useEffect(() => {
        const findAll = async () => {
            const user = formData;
            console.log(user);
            // password not match
            if (user.password1?.length && (user.password !== user.password1 || user.password.length < 6)) {
                return alert("Passwords do not match or are too short");
            }
            setIsLoading(true);
            const response = await put(`user/${user.id}`, user);
            if (response.status === 1) {
                setIsSuccess(true);
                return setIsLoading(false);
            }
            setIsError(response.message);
            setIsLoading(false);
        }
        if (isLoading) {
            findAll();
        }
        return () => {
            setIsLoading(false);
        }
    }, [isLoading]);
    return [{ isError, isLoading, formData, isSuccess }, setFormData, setIsLoading, setIsSuccess, setIsError] as const;
}
export default UserUpdate;