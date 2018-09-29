
import { createStore , combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE actiongenerator
const addExpense = ({ description='',note='',amount=0,createdAt=0 }={}) =>({
    type:'ADD_EXPENSE',
    expense:{
        id:uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE actiongenerator
const removeExpense = ({id}={}) =>({
    type:'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE actiongenerator
const editExpense = (id,updates) =>({
    type:'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER

const setTextFilter = (text = '') =>({
    type:'SET_TEXT_FILTER',
    text
});
// SORT_BY_AMOUNT

const sortByAmount = () =>({
    type:'SORT_BY_AMOUNT'
})
// SORT_BY_DATE

const sortByDate = () =>({
    type:'SORT_BY_DATE'
})
// SET_START_DATE

const setStartDate = (startDate) =>({
    type:'SET_START_DATE',
    startDate
})
// SET_END_DATE

const setEndDate = (endDate) =>({
    type:'SET_END_DATE',
    endDate
})

// expensesReducer default
const expensesReducerDefault = [];

const expensesReducer = (state=expensesReducerDefault,action) =>{
    switch(action.type)
    {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id );
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if(expense.id === action.id)
                {
                    return{
                        ...expense,
                        ...action.updates
                    }
                }else{
                    return expense;
                }
            })
        default:
            return state;
    }
}

//FiltersReducer

const filtersReducerDefaultState = {
    text:'',
    sortBy:'date',
    startDate:undefined,
    endDate:undefined
}

const filtersReducer = (state=filtersReducerDefaultState,action) =>{
    switch(action.type)
    {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text:action.text
            };
        case 'SORT_BY_AMOUNT':
            return{
                ...state,
                sortBy:'amount'
            };
        case 'SORT_BY_DATE':
            return{
                ...state,
                sortBy:'date'
            };
        case 'SET_START_DATE':
            return{
                ...state,
                startDate:action.startDate
            };
        case 'SET_END_DATE':
            return{
                ...state,
                endDate:action.endDate
            };
        default:
            return state;
    }
}

// get Visible expenses

const getVisibleExpenses = (expenses,{ text,sortBy,startDate,endDate}) =>{
    
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt<=endDate;
        const textMatch= expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b)=>{
        if(sortBy === 'date')
        {
            return  a.createdAt < b.createdAt ? 1 : -1 ;
        }
        if(sortBy === 'amount')
        {
            return a.amount < b.amount ? 1: -1 ;
        }
    })
}


// store creation

const store = createStore(
    combineReducers({
        expenses:expensesReducer,
        filters:filtersReducer
    })
);

store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses = (getVisibleExpenses(state.expenses,state.filters))
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description:'Rent',amount:100,createdAt:126}));
const expenseTwo = store.dispatch(addExpense({ description:'coffee',amount:50,createdAt:100 }));

// // console.log(expenseOne);

// store.dispatch(removeExpense({id:expenseOne.expense.id}));

// store.dispatch(editExpense(expenseTwo.expense.id,{ amount:600 }));

store.dispatch(setTextFilter('e'));
// store.dispatch(setTextFilter(''));

// store.dispatch(sortByDate());
store.dispatch(sortByAmount());


// store.dispatch(setStartDate(125));
// store.dispatch(setEndDate(250));







const demoState = {
    expenses:[
        {
            id:'sdghakdsf',
            description:'January Rent',
            note:'This is the last rent',
            createdAt:undefined
        }
    ],
    filters:{
        text:'Rent',
        sortBy:'amount',
        startDate:undefined,
        endDate:undefined  
    }
}