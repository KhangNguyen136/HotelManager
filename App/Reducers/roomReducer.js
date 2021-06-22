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
            // newRoomState.listRoomUpdated = !state.listRoomUpdated
            // newRoomState.listRoomSttUpdated = !state.listRoomSttUpdated
            // return newRoomState
            const newListRoomUpdated = !state.listRoomUpdated
            const newListRoomSttUpdated = !state.listRoomSttUpdated
            console.log("Update list room: " + newRoomState)
            return { ...state, listRoomUpdated: newListRoomUpdated, listRoomSttUpdated: newListRoomSttUpdated }
        case 'updateListSttRoom':
            // newRoomState.listRoomSttUpdated = !state.listRoomSttUpdated
            // return newRoomState
            const newListRoomSttUpdated1 = !state.listRoomSttUpdated
            console.log("Update list stt room: " + newRoomState)

            return { ...state, listRoomSttUpdated: newListRoomSttUpdated1 }
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