const initalState = {
    listRoomUpdated: false,
    listRoomSttUpdate: false
}

const roomReducer = (state = initalState, action) => {
    const newRoomState = state
    // console.log(state)
    switch (action.type) {
        case 'listRoomUpdated':
            newRoomState.listRoomUpdated = !state.listRoomUpdated
            newRoomState.listRoomSttUpdate = !state.listRoomSttUpdate
            console.log(newRoomState)
            return newRoomState
        case 'listSttRoomUpdated':
            newRoomState.listRoomSttUpdate = !state.listRoomSttUpdate
            return newRoomState
    }
    return state;
}

export default roomReducer;