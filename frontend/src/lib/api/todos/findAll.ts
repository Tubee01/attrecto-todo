import { useEffect, useState } from "react";
import { get } from "..";
import { ITodo } from "../../components/Todos/TodosList";
import { isUUID } from "../../helpers";

const TodoFindAll = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [formData, setFormData] = useState({
        searchString: '',
        userId: '',
    });
    useEffect(() => {
        const findAll = async () => {
            const urlSrcParams = {
                s: formData.searchString,
            }
            setIsLoading(true);
            let url = `todo`;
            if (isUUID(formData.userId)) {
                url += `/${formData.userId}`;
            }
            const response = await get(`${url}?${new URLSearchParams(urlSrcParams)}`);
            if (response.status === 1) {
                setTodos(response.data);
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
    return [{ error, isLoading, todos }, setFormData, setIsLoading, setError] as const;
}
export default TodoFindAll;