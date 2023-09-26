// sagas/authSaga.js

import { put, call, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginFailure } from './actions';
import { loginApi } from './loginApi'; 

function* handleLogin(action) {
  try {
    const user = yield call(loginApi, action.payload);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}
