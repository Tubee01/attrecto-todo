import { useEffect } from "react";
import TodoFindAll from "../../lib/api/todos/findAll";
import TodosList from "../../lib/components/Todos/TodosList";
interface TodosProps {
    id?: string | null
}

const Todos = ({ id = null }: TodosProps) => {
    const [{ error, isLoading, todos }, setFormData, setIsLoading, setError] = TodoFindAll();
    useEffect(() => {
        setError(null);
        if (id) {
            setFormData({
                searchString: '',
                userId: (id as string)
            })
        }
        setIsLoading(true);
    }, []);


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'

        }}>
            <TodosList todos={todos} />
        </div>
    );
}
export default Todos;