import { all, fork, put, takeEvery, call } from 'redux-saga/effects';


// helpers
import {
    getRole as getRoleApi,
    getUserRole as getUserRoleApi,
        
} from '../../helper/role';



function* getRole({ payload: { limit, page}}) {
    
    try {
        const response = yield call(getRoleApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_ROLE_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_ROLE_FAILED', error: error});
        
    }
}

function* getUserRole() {
    try {
        const response = yield call(getUserRoleApi);
        const roles = response.data;
        yield put({type: 'GET_USERROLE_SUCCESS' , user_role: roles.permissions});
    } catch (error) {
        yield put({type: 'GET_USERROLE_FAILED', error: error});
        
    }
}




export function* watchGetRole() {
    yield takeEvery('GET_ROLE_REQUESTED', getRole);
}

export function* watchGetUserRole() {
    yield takeEvery('GET_USERROLE_REQUESTED', getUserRole);
}



function* roleSaga() {
    yield all([fork(watchGetRole),fork(watchGetUserRole)]);
}

export default roleSaga;
