'use strict';


import * as types from '../action-types';

const initialState = {
    catalog: []
};

const catalogReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.GET_CATALOG_SUCCESS:
            return Object.assign({}, state, { catalog: action.data });
            break;
    }
    return state;
}

export default catalogReducer;
