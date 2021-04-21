import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer'

//Produz os states
export default combineReducers({
  posts: postsReducer,
  users: usersReducer
});