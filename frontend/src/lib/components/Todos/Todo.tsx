import { MouseEventHandler } from "react";

interface TodoProps {
    done: boolean;
    title: string;
    description?: string;
    onClick: MouseEventHandler
}

const Todo = ({ done, title, description, onClick }: TodoProps) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: done ? 'line-through' : 'none',
            cursor: 'pointer',
        }}
    >
        {title}
        {description}
    </li>
);
export default Todo;
