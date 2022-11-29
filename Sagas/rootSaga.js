import {takeLatest} from 'redux-saga/effects';
import {GET_PRODUCT} from '../Stores/startupStore';
import {handleGetProduct} from './handlers/product';

export function* watcherSaga() {
  yield takeLatest(GET_PRODUCT, handleGetProduct);
}
