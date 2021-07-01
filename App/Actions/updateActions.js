export const updateState = () => {
    return {
        type: 'updateState',
    }
}

export const setFormID = (formID) => {
    return {
        type: 'setFormID',
        formID: formID
    }
}

export const setRoomID = (roomID) => {
    return {
        type: 'setRoomID',
        roomID: roomID,
    }
}

export const resetState = () => {
    return {
        type: 'resetUpdateState'
    }
}