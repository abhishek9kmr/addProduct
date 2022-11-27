import {createStore, combineReducers} from 'redux';
import {reducer} from './startupStore';

const rootReducer = combineReducers({
  reducer: reducer,
});

const configureStore = createStore(rootReducer);

export default configureStore;
