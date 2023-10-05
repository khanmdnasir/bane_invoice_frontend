import { createStore, applyMiddleware , combineReducers} from 'redux';

import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers';
import authSaga from './saga';



const rootReducer = combineReducers({
    auth: authReducer,
  });
  
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(authSaga);

export default store;