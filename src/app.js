import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from "./Routers/AppRouter";

import 'normalize.css/normalize.css';
import './styles/styles.scss';

import {Provider} from 'react-redux';
import store from "./store/configureStore";
// import {addExpense} from "./actions/expenses";
/*------------------------------------------------------------------------------------------*/

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

// const exp_1 = store.dispatch(addExpense({title: 'Water bill', note: 'Normal', amount: 600, createdAt: 654321}));
// const exp_2 = store.dispatch(addExpense({title: 'Gas bill', note: 'Low', amount: 400, createdAt: -20000}));
// const exp_3 = store.dispatch(addExpense({title: 'Rent', note: 'Very high', amount: 34000, createdAt: -10000}));
// const exp_4 = store.dispatch(addExpense({title: 'Current bill', amount: 700, createdAt: 123456}));

// setTimeout(() => store.dispatch(setTextFilter('bill')), 3000);
ReactDOM.render(jsx, document.getElementById('app'));