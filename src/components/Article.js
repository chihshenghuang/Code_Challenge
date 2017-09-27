import React, {Component} from 'react'
import {store} from 'redux'
import {onIncrement, onDecrement} from '../actions'
import {connect} from 'react-redux'

class Article extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: 0
		}
		this.increment = this.increment.bind(this)
		this.decrement = this.decrement.bind(this)
	}
	
	increment() {
		this.setState({value:this.state.value+1})
	}
	
	decrement() {
		this.setState({value:this.state.value-1})
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

/*
const mapStateToProps = (state) => ({
	value: state.counter	
})

const mapDispatchToProps = (dispatch) => ({
	onIncrement: ()	=> dispatch(onIncrement()),
	onDecrement: ()	=> dispatch(onDecrement())
})
*/

//export default connect(mapStateToProps, mapDispatchToProps)(Article)
export default Article
