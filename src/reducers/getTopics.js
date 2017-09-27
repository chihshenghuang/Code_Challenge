export default (state=0, action) => {
	switch(action.type) {
		case 'FETCH_TOPICS': 
			return action.topics
		default:
			return state
	}	
}
