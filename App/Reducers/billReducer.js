const initState = {
    listBillUpdated: false,

}

const billReducer = (state = initState, action) => {
    const newState = state
    switch (action.type) {
        case 'updateListBill':
            // newFormState.listFormUpdated = !state.listFormUpdated
            newState.listBillUpdated = !state.listBillUpdated
            return newState
    }
    return state;
}
export default billReducer