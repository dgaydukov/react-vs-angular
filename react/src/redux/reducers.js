
import { combineReducers } from 'redux';

// Reducers
import profileReducer from './reducers/profile-reducer';
import operationsReducer from './reducers/operations-reducer';
import catalogReducer from './reducers/catalog-reducer';
import cardsReducer from './reducers/cards-reducer';

// Combine Reducers
var reducers = combineReducers({
    profileState: profileReducer,
    operationsState: operationsReducer,
    catalogState: catalogReducer,
    cardsState: cardsReducer,
});

export default reducers;
