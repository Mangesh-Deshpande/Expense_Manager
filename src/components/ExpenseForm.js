import React from "react";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? props.expense.amount / 100 : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      datepickerFocused: false,
      error: ""
    };
  }

  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ datepickerFocused: focused }));
  };

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = e => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: "Please provide description and amount!"
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        note: this.state.note,
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
            type="text"
            placeholder="description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            id="SingleDatePicker"
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.datepickerFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
            hideKeyboardShortcutsPanel={true}
          />
          <textarea
            placeholder="Add a note for your expense(optional)"
            onChange={this.onNoteChange}
          />
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
