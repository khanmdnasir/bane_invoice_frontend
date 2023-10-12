// sagas/authSaga.js

import { put, call, all, takeLatest, takeEvery,fork } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginFailure, LOGIN_SUCCESS, LOGIN_FAILURE } from './actions';
import { loginApi } from '../../helper/LoginApi'; 
import { APICore, setAuthorization} from '../../helper/AxiosConfig';



const api = new APICore();


function* handleLogin({ payload: { email, password }}) {
  try {
    const user = yield call(loginApi, { email, password });
    yield put(loginSuccess(user?.data));
    const result = user.data;
 
    if(result.success){
      api.setLoggedInUser(user.data.data);
      setAuthorization(user.data.data.access);
  }
  } catch (error) {
    yield put(loginFailure(error.response.data.data.msg));

  }
}

export function* watchLogin() {
  yield takeEvery(LOGIN_REQUEST, handleLogin);
}

function* authSaga() {
  yield all([fork(watchLogin)]);
}

export default authSaga;
