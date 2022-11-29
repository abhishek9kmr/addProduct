import {call, put} from 'redux-saga/effects';
import {requestGetProduct} from '../requests/product';

export function* handleGetProduct(action) {
  try {
    const response = yield call(requestGetProduct);
    console.log('responseIn??', response);
    yield put({type: 'SET_PRODUCT', products: response});
  } catch (error) {
    console.log('handleErrorInFetchProduct??', error);
  }
}
