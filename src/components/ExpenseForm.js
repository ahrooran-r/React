import React from 'react';

import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css'
import {SingleDatePicker} from "react-dates";

export default class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: props.expense ? props.expense.title : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? props.expense.amount.toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    }

    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({title}));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({note}));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        // !amount -> allows the use of delete key
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) this.setState(() => ({amount}));
    };

    onDateChange = (createdAt) => {
        this.setState(() => ({createdAt}));
    };

    onFocusChange = ({focused: calendarFocused}) => {
        this.setState(() => ({calendarFocused}));
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.title || !this.state.amount)
            this.setState(() => ({
                error: 'Please provide title and amount'
            }));
        else {
            this.setState(() => ({error: ''}));
            this.props.onSubmit({
                title: this.state.title,
                note: this.state.note,
                amount: parseFloat(this.state.amount),
                createdAt: this.state.createdAt.valueOf()
            });
        }
    };

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        name='title'
                        type='text'
                        placeholder='title'
                        value={this.state.title}
                        onChange={this.onTitleChange}
                        autoFocus/>

                    <textarea
                        name='note'
                        placeholder='Add a note for your expense'
                        value={this.state.note}
                        onChange={this.onNoteChange}/>

                    <input
                        name='amount'
                        type='text'
                        placeholder='amount'
                        value={this.state.amount}
                        onChange={this.onAmountChange}/>

                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />

                    <input type='submit' value='Add Expense'/>
                </form>
            </div>
        );
    }
}