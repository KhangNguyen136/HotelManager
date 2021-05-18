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
            return newRoomState
        case 'listRoomSttUpdated':
            newRoomState.listRoomSttUpdated = !state.listRoomSttUpdated
            return { ...state, roomState: newRoomState }
    }
    return state;
}

export default roomReducer;