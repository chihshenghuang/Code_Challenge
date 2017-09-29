import {combineReducers} from 'redux' 
import auth from './auth'
import counter from './counter'
import getTopics from './getTopics'
import loginStatus from './loginStatus'
import user from './user'

export default combineReducers({auth, counter, getTopics, loginStatus, user})
