import {
    AUTH_LOGIN_SUCCESS, 
    AUTH_LOGIN_ERROR
  } from "./AuthTypes";
  
  export default function(state = {}, action) {
    switch (action.type) {
      case AUTH_LOGIN_SUCCESS:
        return {
            ...state, 
            isLoggedIn: true,
            loginError: false
        };
      case AUTH_LOGIN_ERROR:
        return {
          ...state,
          isLoggedIn: false,
          loginError: true
        };
      default:
        return state;
    }
  }
  