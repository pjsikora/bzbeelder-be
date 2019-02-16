import {
    SAVE_POST_SUCCESS, 
    FETCH_POSTS_SUCCESS,
    FETCH_POST_SUCCESS,
    REMOVE_POST_SUCCESS,
    UPDATE_POST_SUCCESS
} from './types';

export function savePost (post) {
    return {
        type: SAVE_POST_SUCCESS,
        payload: post
    }
}

export function fetchPosts (posts) {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: posts
    }
}

export function fetchPost (post) {
    return {
        type: FETCH_POST_SUCCESS,
        payload: post
    }
}