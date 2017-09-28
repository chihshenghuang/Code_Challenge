import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {logIn, loginStatus} from '../actions'


class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: ''
		}
		this.login = this.login.bind(this)
		this.signup = this.signup.bind(this)
		this.userFieldChange = this.userFieldChange.bind(this)
		this.passwordFieldChange = this.passwordFieldChange.bind(this)
	}

	componentDidMount () {
		this.props.loginStatus('CLEAR')	
	}

	userFieldChange(evt) {
		this.setState({username: evt.target.value})
	}

	passwordFieldChange(evt) {
		this.setState({password: evt.target.value})
	}

	signup(evt) {
		axios.post('http://localhost:8080/api/signup', {
			username: this.state.username,
			password: this.state.password
		})	
		.then((res) => {
			let response = res.data.response
			console.log('response', response)
			if(response === 'CREATE_USER') {
				console.log('create user')
				this.props.login()
			}
			else if(response === 'USER_EXIST') {
				console.log('user exist')
				this.props.loginStatus(response)
			}
			else if(response === 'WRONGFORMAT') {
				console.log('wrong format')
				this.props.loginStatus(response)	
			}
			else {
				console.log('error')
			}
		})
	}

	login(evt) {
		axios.post('http://localhost:8080/api/login', {
			username: this.state.username,
			password: this.state.password
		})	
		.then((res) => {
			let response = res.data.response
			console.log('response', response)
			if(response === 'SUCCESS') {
				console.log('login')
				this.props.login()
			}
			else if(response === 'NO_USER') {
				console.log('no user')
				this.props.loginStatus(response)
			}
			else if(response === 'WRONGPASSWORD') {
				console.log('wrong password')
				this.props.loginStatus(response)
			}
			else {
				console.log('error')
			}
		})
	}

	render() {
		console.log(this.props)
		return (
			<div>
				<label>Name</label>
				<input type='text' placeholder='User Name' onChange={this.userFieldChange}/> 
				<label>Password</label>
				<input type='text' placeholder='Password' onChange={this.passwordFieldChange}/> 
				<button onClick={this.login}>Login</button> 
				<button onClick={this.signup}>signup</button> 
				<div>
					<span>{this.props.loginState}</span>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	loginState: state.loginStatus	
})

const mapDispatchToProps = (dispatch) => ({
	login: () => dispatch(logIn()),
	loginStatus: (data) => dispatch(loginStatus(data))
})


export default connect(mapStateToProps, mapDispatchToProps)(Login)

