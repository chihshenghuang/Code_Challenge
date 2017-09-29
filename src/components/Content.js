import React, {Component} from 'react'
import {logOut, fetchTopics, updateVote} from '../actions'
import {connect} from 'react-redux'
import Article from './Article'
import axios from 'axios'
import ReactModal from 'react-modal'

const TEXTAREA_MAXLENGTH = 255

const article = (id, content, votes) => {
	return <Article index={id} topic={content} votes={votes}/>
}

class Content extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false,
			postState: false,
			topic: '',
			submitPost: false,
			postedArticles: []
		}
		this.logout = this.logout.bind(this)
		this.postArticle = this.postArticle.bind(this)
		this.submitPost = this.submitPost.bind(this)
		this.cancelPost = this.cancelPost.bind(this)
		this.textareaChange= this.textareaChange.bind(this)
	}

	componentDidMount() {
		const {dispatch} = this.props
		axios.get('/api/topics')
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
		this.setState({postedArticles: topics}, this.props.updateVote(0, 0))	
	}

	logout() {
		axios.put('/api/topics', {
			topic: this.state.topic,
			articleVotesArray: this.props.articles
		}).then((response) => {
			this.props.logout()	
		}).catch((error) => {
			console.log(error)	
		})
	}

	cancelPost() {
		this.setState({postState: false, showModal: false})
	}

	submitPost() {
		this.setState({postState: false})
		const {dispatch} = this.props
		axios.post('/api/topics', {
			topic: this.state.topic,
			articleVotesArray: this.props.articles
		})
		.then((response) => {
			dispatch(fetchTopics(response.data))
		})
		.catch((error) => {
			console.log(error)
			dispatch(fetchTopics([]))
		})
	}

	textareaChange(evt) {
		this.setState({topic: evt.target.value})
	}

	postArticle() {
		this.setState({postState: true, showModal: true})
	}

	render() {
		const getTopics = () => {
			var topicsArr = [];
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
						<ReactModal
							isOpen={this.state.showModal}
							contentLabel="Post Article"
						>
							<div className='container-textarea'>
								<textarea className='textarea' onChange={this.textareaChange} maxLength={TEXTAREA_MAXLENGTH}></textarea>
								<button className='btn btn-cancel' onClick={this.cancelPost}>Cancel</button>
								<button className='btn btn-post' onClick={this.submitPost}>Post</button>
							</div>
						</ReactModal>
					</div>
				)
			}
		}
		return (
			<div className='container'>
				<button className='btn btn-login' onClick={this.logout}>Log Out</button>
				<button className='btn btn-login' onClick={this.postArticle}>Post Article</button>
				<div className='label-user'>Hi, {this.props.user}</div>
				{postTextarea()}	
				{getTopics()}	
			</div>
		)	
	}
}

const mapStateToProps = (state) => ({
	articles: state.counter,
	topics: state.getTopics,
	user: state.user
})

const mapDispatchToProps = (dispatch) => ({
	logout() {
		dispatch(logOut())
	},
	updateVote(index, votes) {
		dispatch(updateVote(index, votes))
	},
	dispatch
})


export default connect(mapStateToProps, mapDispatchToProps)(Content)


