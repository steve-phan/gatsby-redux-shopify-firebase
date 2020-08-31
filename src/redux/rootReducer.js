import { combineReducers } from 'redux'
import userReducer from './User/user.reducer'
import storeReducer from './Store/store.reducer'

export default combineReducers({
  user: userReducer,
  store: storeReducer,
})
