import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
} from "../actions/filters";

// const id =moment().startOf('month').unix();
// console.log(id);

class ExpenseListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarFocused: null
    };
  }
  onDatesChange = ({ startDate, endDate }) => {
    // this.setState({ startDate, endDate });
    // console.log(startDate);
    this.props.dispatch(setStartDate({ startDate }));
    this.props.dispatch(setEndDate({ endDate }));
  };

  onFocusChange = calendarFocused => {
    this.setState({ calendarFocused });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={e => {
            this.props.dispatch(setTextFilter(e.target.value));
            // console.log(e.target.value);
          }}
        />
        <select
          value={this.props.filters.sortBy}
          onChange={e => {
            if (e.target.value === "amount") {
              this.props.dispatch(sortByAmount());
            } else if (e.target.value === "date") {
              this.props.dispatch(sortByDate());
            }
            // console.log(e.target.value);
          }}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>

        <DateRangePicker
          startDate={this.props.filters.startDate}
          startDateId={
            !this.props.filters.startDate
              ? ""
              : this.props.filters.startDate.toString()
          }
          endDate={this.props.filters.endDate}
          endDateId={
            !this.props.filters.endDate
              ? ""
              : this.props.filters.endDate.toString()
          }
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          showClearDates={true}
          isOutsideRange={() => false}
          hideKeyboardShortcutsPanel={true}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseListFilters);
