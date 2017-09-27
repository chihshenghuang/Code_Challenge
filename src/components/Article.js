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
	
	increment() {
		this.setState({value:this.state.value+1}, this.props.updateVote(this.props.index, this.state.value+1))
	}
	
	decrement() {
		this.setState({value:this.state.value-1}, this.props.updateVote(this.props.index, this.state.value-1))
	}
	render() {
		return (
			<div>
				<p>{this.props.topic}</p>
				<h1>{this.state.value}</h1>
				<button onClick={this.increment}>+</button>
				<button onClick={this.decrement}>-</button>
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
