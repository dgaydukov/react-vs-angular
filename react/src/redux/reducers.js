'use strict';


import { combineReducers } from 'redux';

// Reducers
import profileReducer from './reducers/profile-reducer';
import catalogReducer from './reducers/catalog-reducer';

// Combine Reducers
var reducers = combineReducers({
    profileState: profileReducer,
    catalogState: catalogReducer,
});

export default reducers;
