import {addExpense,editExpense,removeExpense} from '../../actions/expenses';
import uuid from 'uuid';

// Test for Remove
test('should setup action object for remove expense',()=>{

    const action = removeExpense({id:'123abc'});

    expect(action).toEqual({
        type:'REMOVE_EXPENSE',
        id:'123abc'
    })
})

// Test for Edit
test('should setup action object for edit expense',()=>{
    
    const action = editExpense('123abc',{note:'This is a note'});

    expect(action).toEqual({
        type:'EDIT_EXPENSE',
        id:'123abc',
        updates:{
            note:'This is a note'
        }
    })
})

// Test for Add with passed values
test('should setup action object for add expense',()=>{
    const expenseData = {
        description:'Rent',
        note:'rent paid',
        amount:1000,
        createdAt:'1-1-2018'
    }
    const action = addExpense(expenseData);

    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            ...expenseData,
            id:expect.any(String)
        }
    })
})

// Test for Add with default values
test('should setup action object for add expense with default values',()=>{
    const action = addExpense();

    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
          id:expect.any(String),
          description:'',
          note:'',
          amount:0,
          createdAt:0
        }
    })
})
