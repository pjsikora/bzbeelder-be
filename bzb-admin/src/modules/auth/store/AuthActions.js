import { AUTH_LOGIN } from "./AuthTypes";

export function changeAuth(loginData) {
  return {
    type: AUTH_LOGIN,
    payload: loginData
  };
}
