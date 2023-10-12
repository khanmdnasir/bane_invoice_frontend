import { createStore, applyMiddleware, combineReducers } from 'redux';

import createSagaMiddleware from 'redux-saga';
import authReducer from './auth/reducers';

import rootSaga from './saga';
import User from './user/reducers';



const rootReducer = combineReducers({
  auth: authReducer,
  user: User
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;



