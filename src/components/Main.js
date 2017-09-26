import React from 'react'
import Login from './Login'
import Content from './Content'
import {connect} from 'react-redux'

const LoginRoute = ({auth}) => {
	if (auth) {
		return <Content />
	}
	else {
		return <Login/>
	}
}

const Main = ({auth}) => {
	return (
		<div>
			<LoginRoute auth={auth} />
		</div>
	)	
}

const mapStateToProps = (state) => ({
	auth: state.auth	
})

export default connect(mapStateToProps)(Main)
