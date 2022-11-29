import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer} from './startupStore';
import createSagaMiddleware from '@redux-saga/core';
import {watcherSaga} from '../Sagas/rootSaga';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  reducer: reducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];
middleware.push(logger);

const configureStore = createStore(
  rootReducer,
  {},
  applyMiddleware(...middleware),
);

sagaMiddleware.run(watcherSaga);
export default configureStore;
