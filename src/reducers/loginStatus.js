export default (state='', action) => {
	switch(action.type) {
		case 'NO_USER': 
			return 'Not found user!!'
		case 'USER_EXIST':
			return 'The user exist!!'
		case 'CREATE_USER':
			return ''
		case 'SUCCESS':
			return ''
		case 'WRONGPASSWORD':
			return 'Password is wrong!!'
		case 'WRONGFORMAT':
			return 'User or password format is wrong!!(Do not use space)'
		case 'CLEAR':
			return ''
		default:
			return state
	}	
}
