import {createStore} from 'redux';

// const incrementCount = (payload = {}) => ({
//     type: 'INCREMENT',
//     value: typeof payload.value === 'number' ? payload.value : 1
// });

/*
* 'payload = {}' is set as default to prevent having errors when we don't enter an object into 'incrementCount' function
* above function can be simplified with the help of object destructuring
* */

const incrementCount = ({value = 1} = {}) => ({
    type: 'INCREMENT',
    value
});

const decrementCount = ({value = 1} = {}) => ({
    type: 'DECREMENT',
    value
});

const set = ({value = 0} = {}) => ({
    type: 'SET',
    value
});

const countReducer = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {count: state.count + action.value};
        case 'DECREMENT':
            return {count: state.count - action.value};
        case 'SET':
            return {count: action.value};
        default:
            return state;
    }
};

// "createStore((initial state, action) => {})" is used to create a new redux store
const store = createStore(countReducer);

/*
* "subscribe()" watches for changes as state in 'store' changes and runs a single function defined inside it
* "getState()" is used to get latest state of store
*       -> its return value is a function which can be called to stop watching for changes
* */
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// increment value
store.dispatch(incrementCount({value: 5}));

store.dispatch(incrementCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({value: 10}));

store.dispatch(set({value: 100}));

store.dispatch(set());

unsubscribe();