import { createStore, combineReducers } from 'redux';
import roomReducer from './Reducers/roomReducer';
import formReducer from './Reducers/formRecuder';
import billReducer from './Reducers/billReducer';
import updateReducer from './Reducers/updateReducer';
import editFormState from './Reducers/editFormReducer'
const store = createStore(
    combineReducers({
        roomState: roomReducer,
        formState: formReducer,
        billState: billReducer,
        updateState: updateReducer,
        editFormState: editFormState

    })
);

export default store;