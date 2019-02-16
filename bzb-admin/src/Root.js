import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./modules/reducers";

import { all, fork } from 'redux-saga/effects';
import { put, takeEvery } from 'redux-saga/effects';
import {watchAuth} from './modules/auth/store/AuthSagas'

// const req = (require).context('.', true, /\.\/.+\/sagas\.js$/);
// const sagas = req.keys().map((key) => req(key).default);

// function* loadSagas(services = {}) {
//   const validSagas = sagas.filter((x) => x !== undefined);
//   yield all(validSagas.map((saga) => fork(saga, services)));
// }



const delay = (ms) => new Promise(res => setTimeout(res, ms))

// ...

// Our worker Saga: will perform the async increment task


export default ({ children, initialState = {} }) => {
  const sagaMiddleware = createSagaMiddleware();

  const enhancers = [
    applyMiddleware(
      sagaMiddleware
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ];

  const store = createStore(
    reducers,
    initialState,
    compose(...enhancers)
  );

  sagaMiddleware.run(watchAuth);

  return <Provider store={store}>{children}</Provider>;
};
