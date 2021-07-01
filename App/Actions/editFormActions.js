export const addGuestEdit = (newGuest, success, fail) => {
    return {
        type: 'editAddGuest',
        newGuest: newGuest,
        success: success,
        fail: fail
    }
}

export const deleteGuestEdit = (IC) => {
    return {
        type: 'editDeleteGuest',
        IC: IC
    }
}

export const updateGuestEdit = (oldGuest, newGuest, success, fail) => {
    return {
        type: 'editUpdateGuest',
        oldGuest: oldGuest,
        newGuest: newGuest,
        success: success,
        fail: fail
    }
}

export const setListGuest = (listGuest) => {
    return {
        type: 'editSetListGuest',
        listGuest: listGuest
    }
}

export const setRoomEdit = (roomName, roomID, roomType, price) => {
    return {
        type: 'editSetRoom',
        roomName: roomName,
        roomID: roomID,
        roomType: roomType,
        price: price
    }
}

export const setFormObserve = (formID) => {
    return {
        type: 'setFormObserve',
        formID: formID
    }
}


export const updateObserve = () => {
    return {
        type: 'updateObserve',
    }
}

export const resetObserveState = () => {
    return {
        type: 'resetObserveState',
    }
}