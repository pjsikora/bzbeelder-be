// import { SAVE_POST, FETCH_POST } from 'actions/types';

import {
  SAVE_POST_SUCCESS,
  FETCH_POST_SUCCESS,
  FETCH_POSTS_SUCCESS,
  REMOVE_POST_SUCCESS,
  UPDATE_POST_SUCCESS
} from "./actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      const posts = action.payload.data.map(post => post.name);
      return [...state, ...posts];
    case FETCH_POST_SUCCESS:
      // const posts = action.payload.data.map(post => post.name);
      return [
        ...state, 
        // ...posts
      ];
    case SAVE_POST_SUCCESS:
      return [
        ...state, 
        // action.payload
      ];
    case REMOVE_POST_SUCCESS:
      // const posts = action.payload.data.map(post => post.name);
      return [
        ...state, 
        // ...posts
      ];
    case UPDATE_POST_SUCCESS:
      // const posts = action.payload.data.map(post => post.name);
      return [
        ...state, 
        // ...posts
      ];
    default:
      return state;
  }
}
