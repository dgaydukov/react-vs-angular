/**
 * Created by diman on 05.06.17.
 */


import Cookies from 'universal-cookie';
import * as types from '../action-types';

const cookies = new Cookies();

const initialState = {
    data: {
        badges: [{
            name: "standard",
        }]
    },

    rightBlock: {
        extendedAuth: true,
        authProfile: true,
        authWithdraw: false,
        authInfo: false,
        feedback: false,
        category: false,
        banner: true,
    },

    favorites: cookies.get("favorites") ? cookies.get("favorites").split(",") : [],
};

const profileReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.GET_PROFILE_SUCCESS:
            const data = Object.assign({}, state, { data: action.data });
            data.data.badges = data.data.badges.length > 0 ?  data.data.badges : initialState.data.badges;
            return data;
            break;

        case types.GET_RIGHT_BLOCK_SUCCESS:
            const rightBlock = Object.assign({}, state, { rightBlock: action.data });
            return rightBlock;
            break;

        case types.GET_FAVORITES_SUCCESS:
            const favorites = state.favorites.slice(0);
            const id = action.data;
            const index = favorites.indexOf(id);
            if(index == -1){
                favorites.push(id);
            }
            else{
                favorites.splice(index, 1);
            }

            cookies.set("favorites", favorites.join(","), { path: '/' });

            return Object.assign({}, state, {favorites: favorites});
            break;

    }

    return state;

}

export default profileReducer;
