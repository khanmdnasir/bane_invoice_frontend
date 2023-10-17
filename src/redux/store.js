import { createStore, applyMiddleware, combineReducers } from 'redux';

import createSagaMiddleware from 'redux-saga';
import authReducer from './auth/reducers';

import rootSaga from './saga';
import User from './user/reducers';
import Role from './roles/reducers';



const rootReducer = combineReducers({
  auth: authReducer,
  user: User,
  role: Role
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;



