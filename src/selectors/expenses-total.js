import moment from "moment";

const expensesTotal = expenses => {
  return expenses
    .map(expense => {
      return expense.amount;
    })
    .reduce((total, num) => {
      return total + num;
    }, 0);
};

export default expensesTotal;
