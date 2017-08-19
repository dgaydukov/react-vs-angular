'use strict';


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