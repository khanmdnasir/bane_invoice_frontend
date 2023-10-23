import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { setError, setSuccess } from '../alert/actions';

// helpers
import {
    getUser as getUserApi,
    getUserDetails as getUserDetailsApi,
    addUser as addUserApi,

} from '../../helper/UserApi';
import { useDispatch } from 'react-redux';



function* getUser({ payload: { limit, page } }) {

    try {

        const response = yield call(getUserApi, { limit, page });
        const data = response.data;

        yield put({ type: 'GET_USER_SUCCESS', data: data });
    } catch (error) {
        yield put({ type: 'GET_USER_FAILED', error: error });

    }
}

function* getUserDetails(payload) {
    try {
        const response = yield call(getUserDetailsApi, { payload });
        const data = response.data;
        yield put({ type: 'GET_USER_DETAILS_SUCCESS', data: data });
    } catch (error) {
        yield put({ type: 'GET_USER_DETAILS_FAILED', error: error });

    }
}

function* addUser(formData) {

    try {
 
        const response = yield call(addUserApi, formData.payload);
        const result = response.data;
    
        if (result.success) {
            yield put({ type: 'ADD_USER_SUCCESS', user: result });
            yield put(setSuccess({type: "SET_SUCCESS", success: [{'msg':'User created successfully'}]}));

        } 
        else {
      
            yield put({ type: 'ADD_USER_FAILED', error: result.data });
        }

    } catch (error) {
        
        yield put({ type: 'ADD_USER_FAILED', error: error.response.data.data });
        yield put(setError({type: "SET_ERROR", error: error.response.data.data}));
    }
}

function* setUserSuccessAlert(msg) {

    put({ type: 'SET_USER_SUCCESS_ALERT', success: msg });
}

function* setUserErrorAlert(msg) {

    put({ type: 'SET_USER_ERROR_ALERT', error: msg });
}



export function* watchGetUser() {
    yield takeEvery('GET_USER_REQUESTED', getUser);
}

export function* watchGetUserDetails() {
    yield takeEvery('GET_USER_DETAILS_REQUESTED', getUserDetails);
}

export function* watchAddUser() {
    yield takeEvery('ADD_USER_REQUESTED', addUser);
}




function* userSaga() {
    yield all([fork(watchGetUser), fork(watchAddUser), fork(watchGetUserDetails), setUserSuccessAlert, setUserErrorAlert]);
}

export default userSaga;
