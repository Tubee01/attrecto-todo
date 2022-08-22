import CreateTodo from "../../lib/components/Todos/CreateTodo"
import { isUUID } from "../../lib/helpers"
import { useParams } from 'react-router-dom';

const EditTodo = () => {
    const { id } = useParams();
    return (
        id && isUUID(id) ? <div>Edit Todo</div> : <CreateTodo />

    )
}
export default EditTodo;