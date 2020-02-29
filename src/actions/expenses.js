import uuid from "uuid";

// ADD_EXPENSE
const addExpense = ({title, note = '', amount, createdAt = ''} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid.v4(),
        title,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export {addExpense, editExpense, removeExpense};