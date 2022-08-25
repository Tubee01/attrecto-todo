import { useEffect, useState } from "react";
import { get } from "..";
import { ITodo } from "../../components/Todos/TodoList";
import { isUUID } from "../../helpers";

const TodoFindAll = () => {
    const [isTodoFindAllError, setIsError] = useState<string | null>(null);
    const [isTodoFindAllLoading, setIsLoading] = useState<boolean>(false);
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
            let url = `todo`;
            if (isUUID(formData.userId)) {
                url += `/user/${formData.userId}`;
            }
            const response = await get(`${url}?${new URLSearchParams(urlSrcParams)}`);
            if (response.status === 1) {
                setTodos(response.data);
            }
            setIsError(response.message);
            setIsLoading(false);
        }
        if (isTodoFindAllLoading) {
            findAll();
        }
        return () => {
            setIsLoading(false);
        }
    }, [isTodoFindAllLoading]);
    return [{ isTodoFindAllError, isTodoFindAllLoading, todos }, setFormData, setIsLoading, setIsError] as const;
}
export default TodoFindAll;