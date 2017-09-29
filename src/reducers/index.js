import {combineReducers} from 'redux' 
import auth from './auth'
import counter from './counter'
import getTopics from './getTopics'
import user from './user'

export default combineReducers({auth, counter, getTopics, user})
