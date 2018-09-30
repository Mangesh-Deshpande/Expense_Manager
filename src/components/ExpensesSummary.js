import React from "react";
import { connect } from "react-redux";
import filteredExpenses from "../selectors/expenses";
import expensesTotal from "../selectors/expenses-total";
import numeral from "./NumeralforRupee";

export const ExpensesSummary = props => {
  const expenseWord = props.expense.count === 1 ? "expense" : "expenses";
  return (
    <div>
      <p>
        Viewing {props.expense.count} {expenseWord} totalling
        {numeral(props.expense.sum / 100).format("$0,0.00")}
      </p>
    </div>
  );
};

const mapStatetoProps = state => {
  const visibleExpenses = filteredExpenses(state.expenses, state.filters);
  return {
    expense: {
      sum: expensesTotal(visibleExpenses),
      count: visibleExpenses.length
    }
  };
};

export default connect(mapStatetoProps)(ExpensesSummary);
