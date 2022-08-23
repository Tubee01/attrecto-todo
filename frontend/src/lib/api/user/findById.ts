import { useEffect, useState } from "react";
import { get } from "..";
import { isUUID } from "../../helpers";


const UserFindById = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState([]);
    const [id, setId] = useState("");
    useEffect(() => {
        const findById = async () => {
            setIsLoading(true);
            const response = await get(`user/${id}`);
            if (response.status === 1) {
                setUser(response.data);
            }
            setError(response.message);
            setIsLoading(false);
        }
        if (isUUID(id)) {
            if (isLoading) {
                findById();
            }
        }
        return () => {
            setIsLoading(false);
        }
    }, [isLoading]);
    return [{ error, isLoading, user }, setId, setIsLoading, setError] as const;
}
export default UserFindById;