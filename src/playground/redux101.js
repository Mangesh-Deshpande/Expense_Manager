// 1. create store , const store = createStore(Reducer);

// 2. Reducer function - const Reducer = (state={},action) =>{
        // code to change the state based on the action object
// } 
// 3. Action generators - function returns action object
//    const Actiongenerator = () =>({ type:'ABC',.....})

// 4. store.dispatch( Actiongenerator() )
// 5. store.getState()  - return current state
// 6. store.subscribe() - to watch for state change



// import createStore function from redux library
import { createStore } from 'redux';


// Action generators - method which returns action object

/* (here , destructured argument passed ie "object" and set the default value of object property to 1.
also if no object is passed to the action generator default is empty object).*/

const incrementCount = ({incrementBy=1} = {}) =>({type:'INCREMENT',incrementBy});

const decrementCount = ({decrementBy=1}={})=>({type:'DECREMENT',decrementBy});

const setCount = ({count}={}) => ({type:'SET',count});

const resetCount = () => ({type:'RESET'});

// Reducers
// 1. reducer is a pure function (only takes input and give output and dont access varibles outside its scope.)
// 2. Never change state or action ,instead return an object

const countReducer = (state={ count:0 },action) =>{

    switch (action.type) {
        case 'INCREMENT':
            return{
                count:state.count + action.incrementBy
            };
        case 'DECREMENT':
            return{
                count:state.count - action.decrementBy
            };
        case 'SET':
            return{
                count:action.count
            }
        case 'RESET':
            return{
                count:0 
            };
        default:
            return state;
    }
}

// create a store (state container)
const store = createStore(countReducer);

// subscribe method - do something when the state changes
const unsubscribe = store.subscribe(()=>{
    console.log(store.getState());
});

// Action is an object which is passed to the store
store.dispatch(incrementCount({incrementBy:5}));

store.dispatch(decrementCount({decrementBy:6}));

store.dispatch(setCount({count:101}));

store.dispatch(resetCount());

// unsubscribe stop watching for state changes
// unsubscribe();

// store.getState returns the current state
// console.log(store.getState());