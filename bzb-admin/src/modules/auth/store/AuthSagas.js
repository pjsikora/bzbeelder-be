import { put, takeEvery, call } from "redux-saga/effects";
import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR } from "./AuthTypes";
import axios from "axios";

export function* loginSaga(obj) {
  try {
    const authResponse = yield axios.post(
      "http://betaapi.bzbeelder.com/api/auth/login",
      obj.payload
    );

    if (authResponse.data.success) {
      yield localStorage.setItem("token", authResponse.data.token);
      yield put({ type: AUTH_LOGIN_SUCCESS });
    } else {
      yield put({ type: AUTH_LOGIN_ERROR });
    }
  } catch (e) {
    yield put({ type: AUTH_LOGIN_ERROR });
  }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchAuth() {
  yield takeEvery(AUTH_LOGIN, loginSaga);
}
