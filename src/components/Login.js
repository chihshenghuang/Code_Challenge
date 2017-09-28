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
		axios.post('/api/signup', {
			username: this.state.username,
			password: this.state.password,
		})
		.then((res) => {
			let response = res.data.response
			console.log('response', response)
			if(response === 'CREATE_USER') {
				console.log('create user')
				this.props.loginStatus(response)
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
		axios.post('/api/login', {
			username: this.state.username,
			password: this.state.password
		})	
		.then((res) => {
			let response = res.data.response
			let token = res.data.token
			console.log('response', response)
			
				this.props.login()
			if(response === 'SUCCESS') {
				console.log('login')
				document.cookie = `token=${token}`
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
			<div className='container-login'>
				<label className='label label-login'>User Name</label>
				<input type='text' placeholder='User Name' className='form form-login' onChange={this.userFieldChange}/> 
				<label className='label label-login'>Password</label>
				<input type='password' placeholder='Password' className='form form-login' onChange={this.passwordFieldChange}/> 
				<div>
					<label className='label label-status'>{this.props.loginState}</label>
				</div>
				<button className='btn btn-login' onClick={this.login}>Log In</button> 
				<button className='btn btn-login' onClick={this.signup}>Sign Up</button> 
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

