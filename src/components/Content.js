import React, {Component} from 'react'
import {logOut, fetchTopics} from '../actions'
import {connect} from 'react-redux'
import Article from './Article'
import axios from 'axios'

const TEXTAREA_MAXLENGTH = 255

const article = (id, content, votes) => {
	return <Article index={id} topic={content} votes={votes}/>
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

	componentDidMount() {
		const {dispatch} = this.props
		axios.get('http://localhost:8080/api/topics')
		.then((response) => {
			dispatch(fetchTopics(response.data))
		})
		.catch((error) => {
			console.log(error)
			dispatch(fetchTopics([]))
		})
	}

	componentWillReceiveProps(nextProps) {
		const {topics} = nextProps
		this.setState({postedArticles: topics})	
	}

	logout() {
		this.props.logout()
	}

	cancelPost() {
		this.setState({postState: false})
	}

	submitPost() {
		this.setState({postState: false})
		const {dispatch} = this.props
		axios.post('http://localhost:8080/api/topics', {
			topic: this.state.topic
		})
		.then((response) => {
			dispatch(fetchTopics(response.data))
		})
		.catch((error) => {
			console.log(error)
			dispatch(fetchTopics([]))
		})

		//this.setState({postedArticles: this.state.postedArticles.concat(article(this.state.topic, (this.state.postedArticles.length)+1))})
	}

	textareaChange(evt) {
		this.setState({topic: evt.target.value})
	}

	postArticle() {
		this.setState({postState: true})
	}

	render() {
		console.log('articles', this.props.topics)
		const getTopics = () => {
			var topicsArr = [];
			console.log('state.article', this.state.postedArticles)
			for (let i = 0; i < this.state.postedArticles.length; i++) {
				topicsArr.push(article(this.state.postedArticles[i].id, 
									   this.state.postedArticles[i].content, 
									   this.state.postedArticles[i].votes))
			}
			return (
				topicsArr.map((item, index) => <div key={index}>{item}</div>)
			)
		}

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
				{getTopics()}	
			</div>
		)	
	}
}


const mapStateToProps = (state) => ({
	articles: state.counter,
	topics: state.getTopics
})

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logOut()),
	dispatch
})


export default connect(mapStateToProps, mapDispatchToProps)(Content)


