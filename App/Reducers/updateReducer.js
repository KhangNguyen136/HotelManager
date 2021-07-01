const initState = {
    roomID: -1,
    formID: -1,
    // roomUpdated: false,
    isUpdated: false
}

const updateReducer = (state = initState, action) => {
    const newState = state
    switch (action.type) {
        case 'updateState':
            newState.isUpdated = true
            return newState
        // case 'updateFormState':
        //     newState.formUpdated = true
        //     return newState
        case 'setFormID':
            newState.formID = action.formID
            return newState
        case 'setRoomID':
            newState.roomID = action.roomID
            return newState
        case 'resetUpdateState':
            newState.roomID = -1
            newState.formID = -1
            newState.isUpdated = false
            return newState
    }
    return state;
}
export default updateReducer