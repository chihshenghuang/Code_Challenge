import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {logIn} from '../actions'


class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: ''
		}
		this.submit = this.submit.bind(this)
		this.userFieldChange = this.userFieldChange.bind(this)
		this.passwordFieldChange = this.passwordFieldChange.bind(this)
	}

	userFieldChange(evt) {
		this.setState({username: evt.target.value})
	}

	passwordFieldChange(evt) {
		this.setState({password: evt.target.value})
	}

	submit(evt) {
		axios.post('http://localhost:8080/api/login', {
			username: this.state.username,
			password: this.state.password
		})	
		.then((response) => {
			if(response.data.valid) {
				console.log('login')
				this.props.login()
			}
			else {
				console.log('error')
			}
		})
	}

	render() {
		console.log('login render')
		return (
			<div>
				<label>Name</label>
				<input type='text' placeholder='User Name' onChange={this.userFieldChange}/> 
				<label>Password</label>
				<input type='text' placeholder='Password' onChange={this.passwordFieldChange}/> 
				<button onClick={this.submit}>Login</button> 
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	login: () => dispatch(logIn())
})


export default connect(null, mapDispatchToProps)(Login)

