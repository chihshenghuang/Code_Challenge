import React, {Component} from 'react'
import Login from './Login'
import Content from './Content'
import {connect} from 'react-redux'
import {setUser, logIn} from '../actions'
import {
	BrowserRouter as Router,
	Route,
	Redirect
} from 'react-router-dom'

const RootRoute = ({auth}) => (
	<Route exact path='/' render={(props) => (
		<Redirect to={{
			pathname: auth ? '/content' : '/login',
			state: {from: props.location}
		}} />
	)} />
)

const LoginRoute = ({auth}) => (
	<Route path='/login' render={(props) => (
		auth ? (
			<Redirect to={{
				pathname: '/content',
				state: {from: props.location}
			}} />
		) : (
			<Login />
		)
	)} />
)

const ContentRoute = ({auth}) => (
	<Route path='/content' render={(props) => {
		return auth ? (
			<Content />
		) : (
			<Redirect to={{
				pathname: '/login',
				state: {from: props.location}
			}} />
		)
	}} />
)

class Main extends Component {
	
	componentDidMount() {
		const {auth, user, setUser, login} = this.props
		if (localStorage.getItem('SCP-auth') === 'authenticated') {
			setUser(localStorage.getItem('SCP-user'))
			login()
		}
	}
	
	render() {
		return (
			
			<Router>
				<div>
					<RootRoute auth={this.props.auth} />
					<LoginRoute auth={this.props.auth} />
					<ContentRoute auth={this.props.auth} />
				</div>
			</Router>
		)
	}
}



const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.user
})

const mapDispatchToProps = (dispatch) => ({
	login: () => dispatch(logIn()),
	setUser: (data) => dispatch(setUser(data))	
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
