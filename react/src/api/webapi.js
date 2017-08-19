'use strict';

import axios from 'axios';
import Cookies from 'universal-cookie';
import config from 'site-config';
import store from '../redux/store';
import * as creators from "../redux/action-creators"

const cookies = new Cookies();

export function load() {
    getProfile();
    getCatalog();
}

export function login(cb) {
    cookies.set(config.cookieUserIdName, response.headers.userid, { path: '/' });
    cookies.set(config.cookieAuthTokenName, response.headers.payqrapiauthorization, { path: '/' });
    load();
}

export function logout() {
    cookies.remove(config.cookieUserIdName, { path: '/' });
    cookies.remove(config.cookieAuthTokenName, { path: '/' });
    load();
}


export function getProfile() {
    return axios.get('2')
        .then(response => {
            console.log(response.data)
            store.dispatch(creators.getProfileSuccess(response.data));
            return response;
        }).catch(error=>{
            console.log(error);
            store.dispatch(creators.getProfileSuccess({}));
        });
}

export function getCatalog() {
    return axios.get(url)
        .then(response => {
            console.log("getCatalog", response);
            store.dispatch(creators.getCatalogSuccess(response.data));
            return response;
        })
        .catch(function (error) {
            console.log("error", error, error.response);
        });
}


