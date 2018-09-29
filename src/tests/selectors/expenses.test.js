import moment from 'moment';
import  selectExpenses   from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

// Test for select expenses with text filter
test('should filter by text value',()=>{
    const filters ={
        text:'e',
        sortBy:'date',
        startDate:undefined,
        endDate:undefined
    };
        const result = selectExpenses(expenses,filters);
    expect(result).toEqual([expenses[2],expenses[1]]);
})

// Test for select expenses with start date filter

test('should filter by start date',()=>{
    
    const filters = {
        text:'',
        sortBy:'date',
        startDate:moment(0),
        endDate:undefined
    };

    const result = selectExpenses(expenses,filters);

    expect(result).toEqual([expenses[2],expenses[0]])
})

// Test for select expenses with end date filter
test('should filter by end date',()=>{
    const filters ={
        text:'',
        sortBy:'date',
        startDate:undefined,
        endDate:moment(0).add(2,'days')
    };
    const result = selectExpenses(expenses,filters);

    expect(result).toEqual([expenses[0],expenses[1]]);
})

// Test for select expenses with sort by date
test('should sort by date',()=>{
    const filters={
        text:'',
        sortBy:'date',
        startDate:undefined,
        endDate:undefined
    };
    
    const result = selectExpenses(expenses,filters);
    expect(result).toEqual([expenses[2],expenses[0],expenses[1]]);
})

// Test for select expenses with sort by amount

test('should sort by amount',()=>{
    const filters = {
        text:'',
        sortBy:'amount',
        startDate:undefined,
        endDate:undefined
    };
    const result = selectExpenses(expenses,filters);
    expect(result).toEqual([expenses[1],expenses[2],expenses[0]]);
})