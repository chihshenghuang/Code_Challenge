import React, {Component} from 'react'
import {logOut, post} from '../actions'
import {connect} from 'react-redux'

class Content extends Component {
	constructor(props) {
		super(props)
		this.state = {
			postState: false
		}
		this.submit = this.submit.bind(this)
		this.postArticle = this.postArticle.bind(this)
		this.cancelPost = this.cancelPost.bind(this)
	}

	submit() {
		this.props.logout()
	}

	cancelPost() {
		this.setState({postState: false})
	}

	postArticle() {
		this.setState({postState: true})
	}

	render() {
		const postTextarea = () => {
			if (this.state.postState) {
				return (
					<div>
						<button onClick={this.cancelPost}>Cancel</button>
						<textarea></textarea>
					</div>
				)
			}
		}
		
		return (
			<div>
				<button onClick={this.submit}>Log Out</button>
				<button onClick={this.postArticle}>Post Article</button>
			    {postTextarea()}	
			</div>
		)	
	}
}


const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logOut()),
	post: () => dispatch(post())
})


export default connect(null, mapDispatchToProps)(Content)


