import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {logIn, loginStatus, setUser} from '../actions'
import ReactModal from 'react-modal'

const formValidation = (user, pwd) => {
	if (user === '' || pwd === '') {
		return false
	}	
	else {
		return true	
	}
}

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			showModal: false,
			loginStatus: ''
		}
		this.login = this.login.bind(this)
		this.signup = this.signup.bind(this)
		this.userFieldChange = this.userFieldChange.bind(this)
		this.passwordFieldChange = this.passwordFieldChange.bind(this)
		this.handleCloseModal = this.handleCloseModal.bind(this)
	}

	componentDidMount() {
		this.setState({loginStatus: ''})
	}

	userFieldChange(evt) {
		this.setState({username: evt.target.value})
	}

	passwordFieldChange(evt) {
		this.setState({password: evt.target.value})
	}
	
	handleCloseModal(evt) {
		this.setState({showModal: false})
	}

	signup(evt) {
		let user = this.state.username
		let pwd = this.state.password
		if(!formValidation(user, pwd)) {
			this.setState({
				showModal: true, 
				loginStatus: 'User or password format is wrong!! (Do not use space)'
			})
		}
		else{
			axios.post('/api/signup', {
				username: user,
				password: pwd
			})
			.then((res) => {
				this.setState({showModal: true, loginStatus: res.data.response}) 
			})
		}
	}

	login(evt) {
		let user = this.state.username
		let pwd = this.state.password
		
		if(!formValidation(user, pwd)) {
			this.setState({
				showModal: true, 
				loginStatus: 'User or password format is wrong!! (Do not use space)'
			})
		}
		else {
			axios.post('/api/login', {
				username: user,
				password: pwd
			})	
			.then((res) => {
				let token = res.data.token
				if(res.data.response === 'SUCCESS') {
					localStorage.setItem('SCP-auth', 'authenticated')
					localStorage.setItem('SCP-user', user)
					this.props.setUser(this.state.username)
					this.props.login()
				}
				else {
					this.setState({showModal: true, loginStatus: res.data.response}) 
				}
			})
		}
	}

	render() {
		const modal = () => {
			let textColor;
			if(this.state.loginStatus === 'Create successfully, please log in!!') {
				textColor = 'green'
			}
			else {
				textColor = 'red'
			}
			return (
				<div>
					<ReactModal 
						isOpen={this.state.showModal}
						contentLabel='Log in status'
						style={{
							overlay : {
								backgroundColor: 'rgba(255, 255, 255, 0.6)' 
							},
							content : {
								margin: 'auto',
								width: '50%',
								height: '80px',
								border: '10px solid #6171a3',
								borderRadius: '15px',
								fontSize: '18px',
								padding: '10px',
								textAlign: 'center',
								color: textColor
							}
						}}
					>
					<p className='label label-status'>{this.state.loginStatus}</p>
					<button className='btn btn-login-cancel' onClick={this.handleCloseModal}>Close Modal</button>
					</ReactModal>
				</div>
			)	
		}
		
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
				{modal()}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
	login: () => dispatch(logIn()),
	setUser: (data) => dispatch(setUser(data))
})


export default connect(mapStateToProps, mapDispatchToProps)(Login)

