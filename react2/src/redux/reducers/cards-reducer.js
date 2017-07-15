/**
 * Created by diman on 05.06.17.
 */


import * as types from '../action-types';

const initialState = {
    data: []
};

const operationsReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.POST_CARDS_SUCCESS:
            return Object.assign({}, state, { data: action.data });

    }

    return state;

}

export default operationsReducer;
