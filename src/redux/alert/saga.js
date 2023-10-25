import { takeLatest, put } from 'redux-saga/effects';

function* setErrorSaga(action) {
  yield put({ type: 'SET_ERROR_SUCCESS', payload: action.payload});
}

function* clearErrorSaga() {
  yield put({ type: 'CLEAR_ERROR_SUCCESS' });
}

function* setSuccessSaga(action) {
  yield put({ type: 'SET_SUCCESS_SUCCESS', payload: action.payload });
}

function* watchMessages() {
  yield takeLatest('SET_ERROR', setErrorSaga);
  yield takeLatest('SET_SUCCESS', setSuccessSaga);
  yield takeLatest('CLEAR_ERROR', clearErrorSaga);
}

export default watchMessages;