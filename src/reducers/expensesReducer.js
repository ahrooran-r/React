// default expenses state -> an array -> expense object
const expensesReducerDefault = [];

const expensesReducer = (state = expensesReducerDefault, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            // spread operator is used instead of concat
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter((expense) => expense.id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => expense.id === action.id && {...expense, ...action.updates});
        default:
            return state;
    }
};

export default expensesReducer;
