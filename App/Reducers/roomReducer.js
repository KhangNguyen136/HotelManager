const initalState = {
    roomTypeUpdated: false,
    ruleUpdated: false,
    listRoomUpdated: false,
    listRoomSttUpdated: false
}

const roomReducer = (state = initalState, action) => {
    const newRoomState = state
    switch (action.type) {
        case 'updateListRoom':

            const newListRoomUpdated = !state.listRoomUpdated
            const newListRoomSttUpdated = !state.listRoomSttUpdated
            return { ...state, listRoomUpdated: newListRoomUpdated, listRoomSttUpdated: newListRoomSttUpdated }
        case 'updateListSttRoom':
            const newListRoomSttUpdated1 = !state.listRoomSttUpdated
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