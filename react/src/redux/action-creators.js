/**
 * Created by diman on 05.06.17.
 */

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

export function getCatalogShopSuccess(data) {
    return{
        type: types.GET_CATALOG_SHOP_SUCCESS,
        data
    }
}

export function getOperationsSuccess(data) {
    return{
        type: types.GET_OPERATIONS_SUCCESS,
        data
    }
}

export function postFeedbackSuccess(data) {
    return{
        type: types.POST_FEEDBACK_SUCCESS,
        data
    }
}

export function getCardsSuccess(data) {
    return{
        type: types.POST_CARDS_SUCCESS,
        data
    }
}

export function getRightBlockSuccess(data) {
    return{
        type: types.GET_RIGHT_BLOCK_SUCCESS,
        data
    }
}

export function getFavoritesSuccess(data) {
    return{
        type: types.GET_FAVORITES_SUCCESS,
        data
    }
}