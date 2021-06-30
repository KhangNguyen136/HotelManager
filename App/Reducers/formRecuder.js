const initalState = {
    room: 'Select room',
    roomID: -1,
    roomType: '',
    price: 0,
    // setnote: () => console.log('Nothing'),
    listFormUpdated: false,
    listGuest: [],
}

const createFormReducer = (state = initalState, action) => {
    const newFormState = state
    switch (action.type) {
        case 'updateListForm':
            // newFormState.listFormUpdated = !state.listFormUpdated
            const newListFormUpdated = !state.listFormUpdated
            return { ...state, listFormUpdated: newListFormUpdated }
        case 'setRoom':
            newFormState.room = action.roomName
            newFormState.roomID = action.roomID
            newFormState.roomType = action.roomType
            newFormState.price = action.price
            return newFormState
        case 'deleteGuest':
            var newListGuest = state.listGuest.filter(item => item.IC != action.IC)
            return { ...state, listGuest: newListGuest }
        case 'addGuest':
            if (!checkNewGuest(action.newGuest, state.listGuest)) {
                action.fail()
                return state
            }
            action.success()
            let listGuest = state.listGuest
            return { ...state, listGuest: [...listGuest, action.newGuest] }
        case 'updateGuest':
            var newListGuest = state.listGuest.filter(item => item.IC != action.oldGuest.IC)
            if (!checkNewGuest(action.newGuest, newListGuest)) {
                action.fail()
                return state
            }
            action.success()
            newListGuest.push(action.newGuest)
            return { ...state, listGuest: newListGuest }
        case 'setListGuest':
            newListGuest = action.listGuest
            return { ...state, listGuest: newListGuest }

        case 'resetForm':
            // console.log('reset form')
            newFormState.room = 'Select room'
            newFormState.roomID = -1
            newFormState.roomType = -1
            newFormState.price = 0
            newFormState.listGuest = []
            return newFormState
    }
    return state;
}

export default createFormReducer;

function checkNewGuest(newGuest, listGuest) {
    if (listGuest.findIndex(item => item.IC == newGuest.IC) == -1)
        return true
    return false
}