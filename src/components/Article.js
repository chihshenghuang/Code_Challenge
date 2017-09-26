import React, {Component} from 'react'
import {store} from 'redux'
import {onIncrement, onDecrement} from '../actions'
import {connect} from 'react-redux'


const Counter = ({
	value,
	topic,
	onIncrement,
	onDecrement
}) => (
	<div>
		<p>{topic}</p>
		<h1>{value}</h1>
		<button onClick={onIncrement}>+</button>
		<button onClick={onDecrement}>-</button>
	</div>
)

class Article extends Component {
	render() {
		return (
			<Counter
				value={this.props.value}
				topic={this.props.topic}
				onIncrement={this.props.onIncrement}
				onDecrement={this.props.onDecrement} 
			/>
		)
	}
}

const mapStateToProps = (state) => ({
	value: state.counter	
})

const mapDispatchToProps = (dispatch) => ({
	onIncrement: ()	=> dispatch(onIncrement()),
	onDecrement: ()	=> dispatch(onDecrement())
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)
