const initalState = {
    roomTypeUpdated: false,
    ruleUpdated: false,
    listRoomUpdated: false,
    listRoomSttUpdated: false
}

const roomReducer = (state = initalState, action) => {
    const newRoomState = state
    // console.log(state)
    switch (action.type) {
        case 'updateListRoom':
            newRoomState.listRoomUpdated = !state.listRoomUpdated
            newRoomState.listRoomSttUpdated = !state.listRoomSttUpdated
            console.log(newRoomState)
            return newRoomState
        case 'updateListSttRoom':
            newRoomState.listRoomSttUpdated = !state.listRoomSttUpdated
            return newRoomState
        case 'updateRoomType':
            newRoomState.roomTypeUpdated = !state.roomTypeUpdated
            newRoomState.listRoomUpdated = !state.listRoomUpdated
            newRoomState.listRoomSttUpdated = !state.listRoomSttUpdated
            return newRoomState
        case 'updateRule':
            newRoomState.ruleUpdated = !state.ruleUpdated
            return newRoomState
    }
    return state;
}

export default roomReducer;