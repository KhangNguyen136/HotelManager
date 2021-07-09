const today = new Date()

const initState = {
    filterRevenue: today,
    filterUsageDensity: today,
    filterBill: today,
}

const filterReducer = (state = initState, action) => {
    const newState = state
    switch (action.type) {
        case 'setFilterRevenue':
            newState.filterRevenue = action.value
            return newState
        case 'resetFilterRevenue':
            newState.filterRevenue = today
            return newState
        case 'setFilterUsageDensity':
            newState.filterUsageDensity = action.value
            return newState
        case 'resetFilterUsageDensity':
            newState.filterUsageDensity = today
            return newState
        case 'setFilterBill':
            newState.filterBill = action.value
            return newState
        case 'resetFilterBill':
            newState.filterBill = today
            return newState
    }
    return state;
}
export default filterReducer