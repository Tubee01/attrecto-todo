import { useEffect, useState } from "react";
import { put } from "..";
import { IUser } from "../../components/Users/UserEdit";


const UserUpdate = () => {
    const [isUserUpdateError, setIsError] = useState<string | null>(null);
    const [isUserUpdateLoading, setIsLoading] = useState<boolean>(false);
    const [isUserUpdateSuccess, setIsSuccess] = useState<boolean | IUser>(false);
    const [userUpdateFromData, setFormData] = useState<IUser>({
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
            const user = userUpdateFromData;
            // password not match
            if (user.password?.length && (user.password !== user.password1 || user.password1.length < 6)) {
                return alert("Passwords do not match or are too short");
            }
            setIsLoading(true);
            const response = await put(`user/${user.id}`, user);
            if (response.status === 1) {
                setIsSuccess(response.data);
                return setIsLoading(false);
            }
            setIsError(response.message);
            setIsLoading(false);
        }
        if (isUserUpdateLoading) {
            findAll();
        }
        return () => {
            setIsLoading(false);
        }
    }, [isUserUpdateLoading]);
    return [{ isUserUpdateError, isUserUpdateLoading, userUpdateFromData, isUserUpdateSuccess }, setFormData, setIsLoading, setIsSuccess, setIsError] as const;
}
export default UserUpdate;