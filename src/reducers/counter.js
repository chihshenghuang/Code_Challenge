const initialState = {
	array:[0]
}

export default (state=initialState, action) => {
	switch(action.type) {
		case 'UPDATE_VOTE': 
			console.log(state);
			state.array[action.index] = action.votes
			break;
		default:
			return state
	}	
	return state
}
