import { useEffect, useState } from "react";
import { get } from "..";


const UserFindAll = () => {
    const [isUserFindAllError, setError] = useState<string | null>(null);
    const [isUserFindAllLoading, setIsLoading] = useState<boolean>(false);
    const [users, setUsers] = useState([]);
    const [userFindAllData, setFormData] = useState({
        searchString: '',
    });
    useEffect(() => {
        const findAll = async () => {
            const urlSrcParams = {
                s: userFindAllData.searchString,
            }
            setIsLoading(true);
            const response = await get(`user?${new URLSearchParams(urlSrcParams)}`);
            if (response.status === 1) {
                setUsers(response.data);
            }
            setError(response.message);
            setIsLoading(false);
        }
        if (isUserFindAllLoading) {
            findAll();
        }
        return () => {
            setIsLoading(false);
        }
    }, [isUserFindAllLoading]);
    return [{ isUserFindAllError, isUserFindAllLoading, users }, setFormData, setIsLoading, setError] as const;
}
export default UserFindAll;