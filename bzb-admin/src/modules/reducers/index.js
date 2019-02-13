import { combineReducers } from 'redux';
import postsReducer from '../post/store/reducer';

export default combineReducers({
  posts: postsReducer
});