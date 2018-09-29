// Higher order component -(HOC) -A component that renders another component
// Reuse code
// Render hijacking
// props manipulation
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from '../../node_modules/redux';

// Regular functional component
const Info = (props) =>(
        <div>
            <h1>Info</h1>
            <p>The info is {props.info}</p>
        </div>
 );


// Higher order component (function returning component)
const withAdminInfo = (WrappedComponent) =>{
    return (props)=>(
        <div>
            {props.isAdmin && <p>This is private info.don't share!</p>}
            <WrappedComponent {...props}/>
        </div>
    )
}

const requireAuthentication = (WrappedComponent) =>{
    return (props)=>(
        <div>
            {props.isAuthenticated ? (<WrappedComponent {...props}/>) : (<p>Require authentication to get the info</p>)}
        </div>
    )
}


const AdminInfo = withAdminInfo(Info);

const AuthInfo = requireAuthentication(Info);
// ReactDOM.render(<AdminInfo isAdmin={true} info='These are the details.'/>,document.getElementById('app'));

ReactDOM.render(<AuthInfo isAuthenticated={true} info='These are the details.'/>,document.getElementById('app'));

// import {BrowserRouter,Route,Link,NavLink,Switch} from 'react-router-dom';
// Router -<BrowserRouter> <Route path="/" component={} /> <BrowserRouter/>
// <Link to="/"></Link>  or <NavLink to="/" exact={true}>Dashboard</NavLink>
// import all components in <AppRouter/> 
//import <AppRouter /> in app.js and ReactDOM.render(<AppRouter/>,document....)

// Redux - import {createStore , combineReducers } from 'redux'
// 1. create store   const store = createStore(()=>{
//     combineReducers({
//         exenses:expensesReducer
//         exenses:expensesReducer
//         exenses:expensesReducer
//         ..
//     })
// })
// 2. Create Reducers functions  arguments- state,action
// 3. create Action generator function arguments - data  , return object { type:'ADD_EXPENSE',amount:200}
// 4. create selector function eg. getVisibleExpenses(expenses,filters) which returns filtered and sorted expenses
// 5. Reorganize the code in separate files store,reducers,actions,selectors etc. with named export
// 6. import all necessary components in app.js
// 7. import {Provider} from 'react-redux'  in app.js file
// 8. wrap <AppRouter/> inside provider
//  const jsx = (<Provider><AppRouter/></Provider>);
// 9. ReactDOM.render(jsx,....)
// 10. import {connect} from 'react-redux' inside component file which needs to dispatch action or access the state inside store
// 12. const mapStateToProps = (state) =>{ 
                // return{
                //         expenses:getVisibleExpenses(state.expenses,state.filters)
                // }
// } This function maps store state to component props
// 13. export default connect(mapStateToProps)(<ExpenseListItem/>);
// 14.  object return by mapStateToProps is passed to the Store and available
//  as the props to <ExpenseListItem/> component
// 15. to dispatch action from compoenent props.dispatch(actionGenerator());