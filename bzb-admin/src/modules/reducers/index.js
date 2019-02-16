import { combineReducers } from 'redux';
import postsReducer from '../post/store/reducer';
import authReducer from '../auth/store/AuthReducer';

export default combineReducers({
  posts: postsReducer,
  auth: authReducer
});