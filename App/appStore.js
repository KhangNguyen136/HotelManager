import { createStore, combineReducers } from 'redux';
import roomReducer from './Reducers/roomReducer';
import formReducer from './Reducers/formRecuder';
import billReducer from './Reducers/billReducer';
const store = createStore(
    combineReducers({
        roomState: roomReducer,
        formState: formReducer,
        billState: billReducer
    })
);

export default store;