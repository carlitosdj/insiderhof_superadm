import {combineReducers} from 'redux'
import me from './me'
import users from './users'
import tenants from './tenants'

export default combineReducers({
  me,
  users,
  tenants,
})
