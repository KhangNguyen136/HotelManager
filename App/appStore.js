import { createStore, combineReducers } from 'redux';
import roomReducer from './Reducers/roomReducer';
import formReducer from './Reducers/formRecuder';
import billReducer from './Reducers/billReducer';
import updateReducer from './Reducers/updateReducer';
import editFormState from './Reducers/editFormReducer';
import filterReducer from './Reducers/filterReducer';
const store = createStore(
    combineReducers({
        roomState: roomReducer,
        formState: formReducer,
        billState: billReducer,
        updateState: updateReducer,
        editFormState: editFormState,
        filterState: filterReducer

    })
);

export default store;