import React from "react";
import {connect} from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import getVisibleExpenses from "../selectors/expensesSelector";

const ExpenseList = (props) => (
    <div>
        <h3>Expense List:</h3>
        <table>

            <thead>
            <tr>
                <th>TITLE</th>
                <th>NOTE</th>
                <th>AMOUNT</th>
                <th>CREATED AT</th>
            </tr>
            </thead>

            <tbody>
            {props.expenses.map((expense) => (
                <ExpenseListItem key={expense.id} {...expense}/>
            ))}
            </tbody>

        </table>
    </div>
);

const mapStateToProps = (state) => ({
    expenses: getVisibleExpenses(state.expenses, {...state.filters}),
});

export default connect(mapStateToProps)(ExpenseList);

/*
* 1. connect()();
* 2. connect()(ExpenseList);
* 3. connect( (state) => ({subset of state object comes here}) )(ExpenseList);
* 3. connect((state)=>({
*       expenses: state.expenses
*       }))(ExpenseList);
* */