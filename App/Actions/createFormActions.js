export const addGuest = (newGuest, success, fail) => {
    return {
        type: 'addGuest',
        newGuest: newGuest,
        success: success,
        fail: fail
    }
}

export const deleteGuest = (IC) => {
    return {
        type: 'deleteGuest',
        IC: IC
    }
}

export const updateGuest = (oldGuest, newGuest, success, fail) => {
    return {
        type: 'updateGuest',
        oldGuest: oldGuest,
        newGuest: newGuest,
        success: success,
        fail: fail
    }
}

export const setListGuest = (listGuest) => {
    return {
        type: 'setListGuest',
        listGuest: listGuest
    }
}

export const setRoom = (roomName, roomID) => {
    return {
        type: 'setRoom',
        roomName: roomName,
        roomID: roomID
    }
}


export const resetState = () => {
    return {
        type: 'resetForm'
    }
}

export const updateListForm = () => {
    return {
        type: 'updateListForm',
    }
}