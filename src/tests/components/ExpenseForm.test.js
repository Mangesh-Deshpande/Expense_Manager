import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

test("should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm with values", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error on invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });

  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should change description on input change", () => {
  const value = "Cable bill";

  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(0)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("description")).toBe(value);
});

test("should set note on textarea change", () => {
  const value = "This is a note";

  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("textarea").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("note")).toBe(value);
});

test("should set amount if it is valid", () => {
  const value = "12.22";

  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });

  expect(wrapper.state("amount")).toBe(value);
});

test("should not set amount if it is invalid", () => {
  const value = "12.223";

  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });

  expect(wrapper.state("amount")).toBe("");
});

test("should call onSubmit props on form submission", () => {
  const onSubmitSpy = jest.fn();

  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    note: expenses[0].note,
    amount: expenses[0].amount,
    createdAt: expenses[0].createdAt
  });
});

test("should set date onDateChange", () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("#SingleDatePicker").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});

test("should set datepickerfocused on focus change", () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("#SingleDatePicker").prop("onFocusChange")({ focused });
  expect(wrapper.state("datepickerFocused")).toBe(focused);
});
