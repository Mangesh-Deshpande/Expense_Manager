import moment from "moment";
import expensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("should return 0 if no expenses", () => {
  const result = expensesTotal([]);
  expect(result).toBe(0);
});

test("should add single expenses to the sum", () => {
  const result = expensesTotal([expenses[0]]);
  expect(result).toBe(195);
});

test("should add multiple expenses to the sum", () => {
  const result = expensesTotal(expenses);
  expect(result).toBe(114195);
});
