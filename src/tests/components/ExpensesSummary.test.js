import React from "react";
import { ExpensesSummary } from "../../components/ExpensesSummary";
import { shallow } from "enzyme";

test("should render Expenses Summary correctly with one expense", () => {
  const expense = {
    count: 1,
    sum: 128900
  };
  const wrapper = shallow(<ExpensesSummary expense={expense} />);

  expect(wrapper).toMatchSnapshot();
});

test("should render Expenses Summary correctly with multiple expenses", () => {
  const expense = {
    count: 4,
    sum: 128343900
  };
  const wrapper = shallow(<ExpensesSummary expense={expense} />);

  expect(wrapper).toMatchSnapshot();
});
