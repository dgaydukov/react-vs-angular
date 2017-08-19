/**
 * Created by diman on 25.04.17.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import Router from './router';
import store from "./redux/store"
import * as webAPI from "./api/webapi";


window.onload = () => {
    webAPI.load();
    ReactDOM.render(
        <Provider store={store}>
            <Router />
        </Provider>,
        document.getElementById('main')
    );
};

setInterval(function print() {
    console.log('hello world');
    return print;
}(), 5000);

// import React from 'react'
// import ReactDOM from 'react-dom'
//
// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import { Provider } from 'react-redux'
//
// import createHistory from 'history/createBrowserHistory'
// import { Route } from 'react-router'
//
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
//
// import profileReducer from './redux/reducers/profile-reducer';
// import operationsReducer from './redux/reducers/operations-reducer';
// import catalogReducer from './redux/reducers/catalog-reducer';
// import cardsReducer from './redux/reducers/cards-reducer';
//
//
//
// // Create a history of your choosing (we're using a browser history in this case)
// const history = createHistory()
//
// // Build the middleware for intercepting and dispatching navigation actions
// const middleware = routerMiddleware(history)
//
// // Add the reducer to your store on the `router` key
// // Also apply our middleware for navigating
// const store = createStore(
//     combineReducers({
//         profileState: profileReducer,
//         operationsState: operationsReducer,
//         catalogState: catalogReducer,
//         cardsState: cardsReducer,
//         router: routerReducer
//     }),
//     applyMiddleware(middleware)
// )
//
// // Now you can dispatch navigation actions from anywhere!
// // store.dispatch(push('/foo'))
//
//
//
// import Router from './router';
// import * as webAPI from "./api/webapi";
//
// import MainPage from "./modules/mainpage/module"
//
// webAPI.load();
// ReactDOM.render(
//     <Provider store={store}>
//         { /* ConnectedRouter will use the store from Provider automatically */ }
//         <ConnectedRouter history={history}>
//             <Router/>
//         </ConnectedRouter>
//     </Provider>,
//     document.getElementById('main')
// )







/*
my custom HMR simulation
todo: rewrite to https://github.com/gaearon/react-hot-loader
 */
var sendevent = require('sendevent');
if(process.env.NODE_ENV != "production"){
    sendevent('/eventstream', function(event) {
        if(event.reload){
            window.location.reload();
        }
    });
}