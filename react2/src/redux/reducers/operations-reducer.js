/**
 * Created by diman on 05.06.17.
 */


import * as types from '../action-types';
import * as helpers from "../../helpers";

const initialState = {
    data: []
};

const operationsReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.GET_OPERATIONS_SUCCESS:
            const data = Object.assign({}, state, { data: action.data });
            data.data.map(item=>{
                item._name = helpers.getSemanticLatinName(item.shopName);
            })
            return data;

    }

    return state;

}

export default operationsReducer;
