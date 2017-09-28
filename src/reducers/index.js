import {combineReducers} from 'redux' 
import auth from './auth'
import counter from './counter'
import getTopics from './getTopics'
import loginStatus from './loginStatus'
export default combineReducers({auth, counter, getTopics, loginStatus})
