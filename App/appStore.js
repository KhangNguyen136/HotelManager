import { createStore, combineReducers } from 'redux';
import roomReducer from './Reducers/roomReducer';
import formReducer from './Reducers/formRecuder';

const store = createStore(
    combineReducers({
        roomState: roomReducer,
        formState: formReducer
    })
);

export default store;