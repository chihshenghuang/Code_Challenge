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

export const updateVote = (index, data) => {
	return {
		type: 'UPDATE_VOTE',
		index: index,
		votes: data
	}
}

