import React, {Component} from 'react'
import {logOut} from '../actions'
import {connect} from 'react-redux'
import Article from './Article'

const TEXTAREA_MAXLENGTH = 255

const article = (topic, articleCount) => {
	return <Article topic={topic} index={articleCount}/>
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
		const {articleCount} = this.props
		this.logout = this.logout.bind(this)
		this.postArticle = this.postArticle.bind(this)
		this.submitPost = this.submitPost.bind(this)
		this.cancelPost = this.cancelPost.bind(this)
		this.textareaChange= this.textareaChange.bind(this)
	}

	logout() {
		this.props.logout()
	}

	cancelPost() {
		this.setState({postState: false})
	}

	submitPost() {
		this.setState({postState: false})
		this.setState({postedArticles: this.state.postedArticles.concat(article(this.state.topic, (this.state.postedArticles.length)+1))})
	}

	textareaChange(evt) {
		this.setState({topic: evt.target.value})
	}

	postArticle() {
		this.setState({postState: true})
	}

	render() {
		console.log('articles', this.props.articles)
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
		return (
			<div>
				<button onClick={this.logout}>Log Out</button>
				<button onClick={this.postArticle}>Post Article</button>
				{postTextarea()}	
			    {(this.state.postedArticles).map((item, index) => <div key={index}>{item}</div>)}
			</div>
		)	
	}
}


const mapStateToProps = (state) => ({
	articles: state.counter
})

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logOut()),
})


export default connect(mapStateToProps, mapDispatchToProps)(Content)


