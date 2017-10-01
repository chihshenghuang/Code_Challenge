import React, { Component } from 'react'
import { logOut, fetchTopics, updateVote } from '../actions'
import { connect } from 'react-redux'
import Article from './Article'
import axios from 'axios'
import ReactModal from 'react-modal'
import refreshLogo from '../images/refresh.png'
import postLogo from '../images/post.png'
import logoutLogo from '../images/logout.png'
import userLogo from '../images/user.png'

const TEXTAREA_MAXLENGTH = 255
const article = (id, content, votes) => {
    return <Article index = { id }
    topic = { content }
    votes = { votes }
    />
}

class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            postState: false,
            topic: '',
            submitPost: false,
            postedArticles: [],
			indexArr: []
        }
        this.logout = this.logout.bind(this)
        this.refresh = this.refresh.bind(this)
        this.postArticle = this.postArticle.bind(this)
        this.submitPost = this.submitPost.bind(this)
        this.cancelPost = this.cancelPost.bind(this)
        this.textareaChange = this.textareaChange.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props
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
        const { updateVote, topics } = nextProps
		console.log('topics', topics)
		let indexArr = []
		for(let i = 0; i < topics.length; i++) {
			indexArr[i] = topics[i].id	
			updateVote(i, topics[i].votes)
		}
		console.log('index', indexArr)
        this.setState({ postedArticles: topics, indexArr: indexArr }) 
    }

    refresh() {
        const { dispatch } = this.props
		axios.put('/api/topics', {
            topic: this.state.topic,
			indexArr: this.state.indexArr,	
            articleVotesArray: this.props.articles
        }).then((response) => {
            dispatch(fetchTopics(response.data))
        }).catch((error) => {
            console.log(error)
        })
    }

    logout() {
        axios.put('/api/topics', {
            topic: this.state.topic,
			indexArr: this.state.indexArr,	
            articleVotesArray: this.props.articles
        }).then((response) => {
            localStorage.setItem('SCP-auth', '')
            this.props.logout()
        }).catch((error) => {
            console.log(error)
        })
    }

    cancelPost() {
        this.setState({ postState: false, showModal: false })
    }

    submitPost() {
        this.setState({ postState: false }) //this.props.updateVote(this.state.postedArticles.length + 1, 0))
        const { dispatch } = this.props
        axios.post('/api/topics', {
                topic: this.state.topic,
				indexArr: this.state.indexArr,	
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
        this.setState({ topic: evt.target.value })
    }

    postArticle() {
        this.setState({ postState: true, showModal: true })
    }

    render() {
        const getTopics = () => {
            var topicsArr = [];
            for (let i = 0; i < this.state.postedArticles.length; i++) {
                topicsArr.push(article(i,
                    this.state.postedArticles[i].content,
                    this.state.postedArticles[i].votes))
            }

            return (
                topicsArr.map((item, index) => < div key = { index } > { item } < /div>))
            }

            const postTextarea = () => {
                if (this.state.postState) {
                    return ( <
                        div >
                        <
                        ReactModal isOpen = { this.state.showModal }
                        contentLabel = "Post Article" >
                        <
                        div className = 'container-textarea' >
                        <
                        textarea className = 'textarea'
                        onChange = { this.textareaChange }
                        maxLength = { TEXTAREA_MAXLENGTH }> < /textarea> <
                        button className = 'btn btn-cancel'
                        onClick = { this.cancelPost } > Cancel < /button> <
                        button className = 'btn btn-post'
                        onClick = { this.submitPost } > Post < /button> <
                        /div> <
                        /ReactModal> <
                        /div>
                    )
                }
            }
            return ( <
                div className = 'container' >
                <
                button className = 'btn btn-login'
                onClick = { this.logout } >
                <
                div className = 'btn-content' >
                <
                img className = 'img-btn-content'
                src = { logoutLogo }
                /> <
                span className = 'label-btn-content' > Log Out < /span> <
                /div> <
                /button> <
                button className = 'btn btn-login'
                onClick = { this.postArticle } >
                <
                div className = 'btn-content' >
                <
                img className = 'img-btn-content'
                src = { postLogo }
                /> <
                span className = 'label-btn-content' > Post Article < /span> <
                /div> <
                /button> <
                button className = 'btn btn-login'
                onClick = { this.refresh } >
                <
                div className = 'btn-content' >
                <
                img className = 'img-btn-content'
                src = { refreshLogo }
                /> <
                span > Refresh Article < /span> <
                /div> <
                /button> <
                div className = 'container-userInfo' >
                <
                img src = { userLogo }
                / > <
                span className = 'label-user' > Hi, { this.props.user } < /span> <
                /div> { postTextarea() } { getTopics() } <
                /div>
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
