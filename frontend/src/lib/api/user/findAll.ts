import { useEffect, useState } from "react";
import { get } from "..";


const UserFindAll = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        searchString: '',
    });
    useEffect(() => {
        const findAll = async () => {
            const urlSrcParams = {
                s: formData.searchString,
            }
            setIsLoading(true);
            const response = await get(`user?${new URLSearchParams(urlSrcParams)}`);
            if (response.status === 1) {
                setUsers(response.data);
            }
            setError(response.message);
            setIsLoading(false);
        }
        if (isLoading) {
            findAll();
        }
        return () => {
            setIsLoading(false);
        }
    }, [isLoading]);
    return [{ error, isLoading, users }, setFormData, setIsLoading, setError] as const;
}
export default UserFindAll;