'use strict';

import * as types from "./action-types";


export function getProfileSuccess(data) {
    return{
        type: types.GET_PROFILE_SUCCESS,
        data
    }
}

export function getCatalogSuccess(data) {
    return{
        type: types.GET_CATALOG_SUCCESS,
        data
    }
}
