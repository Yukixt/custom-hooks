import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';
import { formatDate } from '../08-userReducer/dateUtils';


const init = () => {
    const storedTodos = localStorage.getItem('todos');
    try {
        return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
        console.error("Error parsing stored todos:", error);
        return [];
    }
};

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init);

    
    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            dispatch({
                type: '[TODO] Set Todos',
                payload: JSON.parse(storedTodos),
            });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        const currentDate = new Date();
        const todosToRemove = todos.filter(todo => todo.dueDate && new Date(formatDate(todo.dueDate)) < currentDate);

        todosToRemove.forEach(todo => {
            handleDeleteTodo(todo.id);
        });
    }, [todos]);

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        };

        dispatch(action);
    };

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        });
    };

    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        });
    };

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    };
};
