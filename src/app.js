import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';

import AppRouter from './routers/AppRouter';
import 'normalize.css';
import './style/styles.scss';

const store = configureStore();

const state = store.getState();
const visibleExpeses = (getVisibleExpenses(state.expenses,state.filters));
console.log(visibleExpeses);


const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx,document.getElementById('app'));

