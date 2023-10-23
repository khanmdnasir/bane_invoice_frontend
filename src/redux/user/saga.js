import { all, fork, put, takeEvery, call } from 'redux-saga/effects';


// helpers
import {
    getUser as getUserApi,
    getUserDetails as getUserDetailsApi ,
    addUser as addUserApi ,
    
} from '../../helper/UserApi';



function* getUser({ payload: { limit, page}}) {

    try {
     
        const response = yield call(getUserApi,{limit,page});
        const data = response.data;
  
        yield put({type: 'GET_USER_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_USER_FAILED', error: error});
        
    }
}

function* getUserDetails(payload) {
    try {
        const response = yield call(getUserDetailsApi,{payload});
        const data = response.data;
        yield put({type: 'GET_USER_DETAILS_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_USER_DETAILS_FAILED', error: error});
        
    }
}

function* addUser({ first_name,last_name,email,password,phone,groups,is_active}) {
    
    try {
        const response = yield call(addUserApi,{first_name,last_name,email,password,phone,groups,is_active});
        const result = response.data;
        
        if(result.success){
            yield put({type: 'ADD_USER_SUCCESS' , user: result.data});
        }else{
            yield put({type: 'ADD_USER_FAILED', error: result.error});
        }
        
    } catch (error) {
        yield put({type: 'ADD_USER_FAILED', error: error});        
    }
}

function* setUserSuccessAlert( msg) {

    put({type: 'SET_USER_SUCCESS_ALERT',success: msg});
}

function* setUserErrorAlert(msg) {
    console.log("edit msg")

    put({type: 'SET_USER_ERROR_ALERT',error: msg});
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
    yield all([fork(watchGetUser),fork(watchAddUser),fork(watchGetUserDetails),setUserSuccessAlert,setUserErrorAlert]);
}

export default userSaga;
