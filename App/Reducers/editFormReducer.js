const initalState = {
    room: 'Select room',
    roomID: -1,
    roomType: '',
    price: 0,
    listGuest: [],
    formObserve: -1,
    observeUpdated: false
}

const editFormReducer = (state = initalState, action) => {
    const newFormState = state
    switch (action.type) {
        case 'editSetRoom':
            newFormState.room = action.roomName
            newFormState.roomID = action.roomID
            newFormState.roomType = action.roomType
            newFormState.price = action.price
            return newFormState
        case 'editDeleteGuest':
            var newListGuest = state.listGuest.filter(item => item.IC != action.IC)
            return { ...state, listGuest: newListGuest }
        case 'editAddGuest':
            if (!checkNewGuest(action.newGuest, state.listGuest)) {
                action.fail()
                return state
            }
            action.success()
            let listGuest = state.listGuest
            return { ...state, listGuest: [...listGuest, action.newGuest] }
        case 'editUpdateGuest':
            var newListGuest = state.listGuest.filter(item => item.IC != action.oldGuest.IC)
            if (!checkNewGuest(action.newGuest, newListGuest)) {
                action.fail()
                return state
            }
            action.success()
            newListGuest.push(action.newGuest)
            return { ...state, listGuest: newListGuest }
        case 'editSetListGuest':
            newListGuest = action.listGuest
            return { ...state, listGuest: newListGuest }
        case 'setFormObserve':
            newFormState.formObserve = action.formID
            return newFormState
        case 'updateObserve':
            newFormState.observeUpdated = true
            return newFormState
        case 'resetObserveState':
            newFormState.observeUpdated = false
            newFormState.formObserve = -1
            return newFormState
    }
    return state;
}

export default editFormReducer;

function checkNewGuest(newGuest, listGuest) {
    if (listGuest.findIndex(item => item.IC == newGuest.IC) == -1)
        return true
    return false
}