import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateVote} from '../actions'


class Article extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: 0 + this.props.votes
		}
		this.increment = this.increment.bind(this)
		this.decrement = this.decrement.bind(this)
	}
	
	componentDidMount () {
		this.props.updateVote(this.props.index, this.state.value)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({value: nextProps.votes})	
	}

	increment() {
		this.setState({value:this.state.value+1}, this.props.updateVote(this.props.index, this.state.value+1))
	}
	
	decrement() {
		this.setState({value:this.state.value-1}, this.props.updateVote(this.props.index, this.state.value-1))
	}
	render() {
		return (
			<div className='container-article'>
				<div className='container-vote'>
					<button className='btn btn-vote' onClick={this.increment}>+</button>
					<span className='label-votes'>{this.state.value}</span>
					<button className='btn btn-vote' onClick={this.decrement}>-</button>
				</div>
				<div className='container-topic'>
					<p className='label-article'>{this.props.topic}</p>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({	
	updateVote(index, votes) { 
		dispatch(updateVote(index, votes))
	}
})	

export default connect(mapStateToProps, mapDispatchToProps)(Article)
