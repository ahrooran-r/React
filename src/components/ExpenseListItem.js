import React from 'react';
import {connect} from 'react-redux';
import {removeExpense} from "../actions/expenses";
import {Link} from "react-router-dom";

const ExpenseListItem = ({id, title, note, amount, createdAt, dispatch}) => (
    <tr>
        <td>{title}</td>
        <td>{note}</td>
        <td>{amount}</td>
        <td>{createdAt}</td>
        <td>
            <button onClick={() => (
                dispatch(removeExpense({id}))
            )}>Remove
            </button>
        </td>
        <td><Link to={`/edit/${id}`}>Edit</Link></td>
    </tr>
);

export default connect()(ExpenseListItem);