export const logIn = () => {
	return {
		type: 'LOG_IN'
	}	
}

export const logOut = () => {
	return {
		type: 'LOG_OUT'
	}
}

export const loginStatus = (data) => {
	console.log('status,,', data)
	return {
		type: data
	}	
}

export const updateVote = (index, data) => {
	return {
		type: 'UPDATE_VOTE',
		index: index,
		votes: data
	}
}

export const fetchTopics = (data) => {
	return {
		type: 'FETCH_TOPICS',
		topics: data
	}	
}

export const setUser = (data) => {
	return {
		type: 'SET_USER',
		data
	}	
}
