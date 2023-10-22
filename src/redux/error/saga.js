import { takeLatest, put } from 'redux-saga/effects';

function* setErrorSaga(action) {

  yield put({ type: 'SET_ERROR_SUCCESS', payload: action.payload.error.msg });
}

function* clearErrorSaga() {
  yield put({ type: 'CLEAR_ERROR' });
}

function* setSuccessSaga(action) {
  yield put({ type: 'SET_SUCCESS', payload: action.payload });
}

function* clearSuccessSaga() {
  yield put({ type: 'CLEAR_SUCCESS' });
}

function* watchMessages() {
  yield takeLatest('SET_ERROR', setErrorSaga);
  yield takeLatest('CLEAR_ERROR', clearErrorSaga);
  yield takeLatest('SET_SUCCESS', setSuccessSaga);
  yield takeLatest('CLEAR_SUCCESS', clearSuccessSaga);
}

export default watchMessages;