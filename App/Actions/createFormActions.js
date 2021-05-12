export const addGuest = (newGuest) => {
    return {
        type: 'addGuest',
        newGuest: newGuest
    }
}

export const deleteGuest = (guestID) => {
    return {
        type: 'deleteGuest',
        guestID: guestID
    }
}

export const setRoom = (roomName) => {
    return {
        type: 'setRoom',
        roomName: roomName
    }
}

export const updateListForm = () => {
    return {
        type: 'updateListForm',
    }
}