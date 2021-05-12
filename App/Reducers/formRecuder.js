const initalState = {
    listFormUpdated: false,
    listGuest: [],
    room: '',
}

const createFormReducer = (state = initalState, action) => {
    const newFormState = state
    switch (action.type) {
        case 'updateListForm':
            // newBillState.listBillUpdated = !state.roomState.listBillUpdated
            newFormState.listFormUpdated = !state.listFormUpdated
            return newFormState
        case 'setRoom':
            newFormState.room = action.room
            return newFormState
        case 'deleteGuest':
            delete (newFormState.listGuest, action.guestID)
            return newFormState
        case 'addGuest':
            newFormState.listGuest.push(action.newGuest)
            return newFormState
        case 'reset':
            return initalState
    }
    return state;
}

export default createFormReducer;