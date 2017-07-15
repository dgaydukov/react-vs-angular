/**
 * Created by diman on 05.06.17.
 */

import axios from 'axios';
import Cookies from 'universal-cookie';
import config from 'site-config';

import store from '../redux/store';
import * as creators from "../redux/action-creators"
import * as helpers from "../helpers";


const cookies = new Cookies();

export function load() {
    loginUser(()=>{
        getProfile();
        getCatalog();
        helpers.loadYM();
    });
}

export function loginUser(cb) {
    helpers.populateAxios(axios);
    var userId = helpers.getQueryVariable("userId");
    if(userId){
        axios.post("users/login/external", {
            userId: userId,
        }).then(response=>{
            console.log(response);

            cookies.set(config.cookieUserIdName, response.headers.userid, { path: '/' });
            cookies.set(config.cookieAuthTokenName, response.headers.payqrapiauthorization, { path: '/' });
            window.history.replaceState(null, null, window.location.pathname);

            helpers.populateAxios(axios);
            cb();


        }).catch(err=>{
            console.log(err);
        })
    }
    else{
        cb();
    }
}

export function logoutUser() {
    cookies.remove(config.cookieUserIdName, { path: '/' });
    cookies.remove(config.cookieAuthTokenName, { path: '/' });
    helpers.populateAxios(axios);
    getProfile();
    getCatalog();
}




export function getProfile() {
    return axios.get('users/profile')
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
    var url = `partners/mapdata?token=${cookies.get(config.cookieAuthTokenName)}&userId=${cookies.get(config.cookieUserIdName)}&platformId=${config.platformId}&timestamp=${+new Date()}`;

    //todo find why in firefox axios not working
    var xhr = new XMLHttpRequest();
    xhr.open("get", config.baseURL + url);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            store.dispatch(creators.getCatalogSuccess(data));
        }
    };
    xhr.send();

    // return axios.get(url)
    //     .then(response => {
    //         console.log("getCatalog", response);
    //         store.dispatch(creators.getCatalogSuccess(response.data));
    //         return response;
    //     })
    //     .catch(function (error) {
    //         console.log("error", error, error.response);
    //     });

}

export function getOperations() {
    return axios.get("operations")
        .then(response => {
            store.dispatch(creators.getOperationsSuccess(response.data));
            return response;
        });
}

export function getCards() {
    return axios.get("badges")
        .then(response => {
            store.dispatch(creators.getCardsSuccess(response.data));
            return response;
        });
}



