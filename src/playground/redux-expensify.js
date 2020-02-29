import {createStore, combineReducers} from "redux";
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
const editExpense = ({id, updates} = {}) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});


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

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE',
});

// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

// default filters state -> an object
const filtersDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
};

const filtersReducer = (state = filtersDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {...state, text: action.text};
        case 'SORT_BY_AMOUNT':
            return {...state, sortBy: 'amount'};
        case 'SORT_BY_DATE':
            return {...state, sortBy: 'date'};
        case 'SET_START_DATE':
            return {...state, startDate: action.startDate};
        case 'SET_END_DATE':
            return {...state, endDate: action.endDate};
        default:
            return state;
    }
};

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

/*
const dummyState = {
    expenses: [{
        id: '10-AC-191',
        title: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 545.00,
        createdAt: 0
    }, {
        id: '10-AK-155',
        title: 'Breakfast',
        amount: 545.00,
        createdAt: 2000
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: 700,
        endDate: 360,
    }
};
*/

// get visible expenses using filters
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter(({title, note, createdAt}) => {
        const startDateMatch = typeof startDate !== 'number' || createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || createdAt <= endDate;

        const searchText = text.trim().toLowerCase();
        const textMatch = typeof text !== 'string' || title.toLowerCase().includes(searchText)
            || note.toLowerCase().includes(searchText);

        return startDateMatch && endDateMatch && textMatch;
    }).sort((expense_a, expense_b) => {
        if (sortBy === 'amount') return expense_a.amount - expense_b.amount;
        else if (sortBy === 'date') return expense_a.createdAt - expense_b.createdAt;
    });
};

// returns back the object
const expenseOne = store.dispatch(addExpense({title: 'Rent', amount: 10000, createdAt: -1000}));
const expenseTwo = store.dispatch(addExpense({title: 'Food', amount: 350, createdAt: 1000}));
// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense({id: expenseTwo.expense.id, updates: {amount: 500}}));
// store.dispatch(setTextFilter('RENT'));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(setStartDate(-500));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1500));

store.subscribe(() => {
    const {expenses, filters} = store.getState();
    const visibleExpenses = getVisibleExpenses(expenses, filters);
    console.log(visibleExpenses);
});

store.dispatch(sortByAmount());
store.dispatch(sortByDate());