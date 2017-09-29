import React from 'react'
import Login from './Login'
import Content from './Content'
import {connect} from 'react-redux'
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

const Main = ({auth}) => (
		<Router>
			<div>
				<RootRoute auth={auth} />
				<LoginRoute auth={auth} />
				<ContentRoute auth={auth} />
			</div>
		</Router>
)


const mapStateToProps = (state) => ({
	auth: state.auth	
})

export default connect(mapStateToProps)(Main)
