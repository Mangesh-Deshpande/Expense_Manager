import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default values',()=>{
    const state = expensesReducer(undefined,{type:'@@INIT'});
    expect(state).toEqual([]);
})

test('should remove expense by id',()=>{
    const action ={
        type:'REMOVE_EXPENSE',
        id:expenses[1].id
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([expenses[0],expenses[2]]);
})

test('should not remove if id is not found',()=>{
    const action ={
        type:'REMOVE_EXPENSE',
        id:'-1'
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
})

test('should add an expense',()=>{
    const action ={
        type:'ADD_EXPENSE',
        expense:{
            id:expenses[2],
            description:'Coffee',
            note:'',
            createdAt:20000,
            amount:295000
        }
    }

    const state = expensesReducer(expenses,action);
    expect(state).toEqual([...expenses,action.expense]);
})

test('should edit an expense by id',()=>{
    const action={
        type:'EDIT_EXPENSE',
        id:expenses[0].id,
        updates: {
            description:'coffee'
        }
    }
    const state =expensesReducer(expenses,action);
    expect(state[0].description).toBe(action.updates.description);
})

test('should not edit an expense if id not found',()=>{
    const action={
        type:'EDIT_EXPENSE',
        id:'4',
        updates: {
            description:'Laptop'
        }
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
})