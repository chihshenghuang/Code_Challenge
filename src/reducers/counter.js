const initialState = {
    array: [0]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_VOTE':
			state.array[action.index] = action.votes
            break;
        default:
            return state
    }
    return state
}
