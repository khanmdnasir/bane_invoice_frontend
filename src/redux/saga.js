import { all } from "redux-saga/effects";


import authSaga from "./auth/saga";
import userSaga from "./user/saga";
import roleSaga from "./roles/saga";
import watchMessages from "./error/saga";

export default function* rootSaga() {
    yield all([authSaga(), userSaga(),roleSaga(), watchMessages()]);
}