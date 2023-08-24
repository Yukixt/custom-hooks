

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case '[TODO] Add Todo':
            return [...state, action.payload];

        case '[TODO] Remove Todo':
            return state.filter((todo) => todo.id !== action.payload);

        case '[TODO] Toggle Todo':
            return state.map((todo) => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        done: !todo.done,
                    };
                }
                return todo;
            });

        case '[TODO] Set Todos':
            return action.payload;

        default:
            return state;
    }
};
