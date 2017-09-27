import React, {Component} from 'react'
import {logOut, post} from '../actions'
import {connect} from 'react-redux'
import Article from './Article'

const TEXTAREA_MAXLENGTH = 255

const article = (topic) => {
	return <Article topic={topic}/>
}

class Content extends Component {
	constructor(props) {
		super(props)
		this.state = {
			postState: false,
			topic: '',
			submitPost: false,
			postedArticles: [] 
		}
		this.submit = this.submit.bind(this)
		this.postArticle = this.postArticle.bind(this)
		this.submitPost = this.submitPost.bind(this)
		this.cancelPost = this.cancelPost.bind(this)
		this.textareaChange= this.textareaChange.bind(this)
	}

	submit(evt) {
		this.props.logout()
	}

	cancelPost(evt) {
		this.setState({postState: false})
	}

	submitPost(evt) {
		this.setState({postState: false})
		this.setState({postedArticles: this.state.postedArticles.concat(article(this.state.topic))})
	}

	textareaChange(evt) {
		this.setState({topic: evt.target.value})
	}

	postArticle(evt) {
		this.setState({postState: true})
	}

	render() {
		const postTextarea = () => {
			if (this.state.postState) {
				return (
					<div>
						<button onClick={this.submitPost}>Post</button>
						<button onClick={this.cancelPost}>Cancel</button>
						<textarea onChange={this.textareaChange} maxLength={TEXTAREA_MAXLENGTH}></textarea>
					</div>
				)
			}
		}
/*
		const article = () => {
			if (this.state.submitPost) {
					<Article topic={this.state.topic}/>
			}
		}
*/		
		console.log(this.state.postedArticles)
		return (
			<div>
				<button onClick={this.submit}>Log Out</button>
				<button onClick={this.postArticle}>Post Article</button>
			    {(this.state.postedArticles).map((item, index) => <div key={index}>{item}</div>)}
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


