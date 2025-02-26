import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadCartSuccess,
  loadCartFailure,
  createCartRequest,
  createCartSuccess,
  createCartFailure,
} from './actions'
import {Cart} from './types'

export function* loadCarts(payload: ReturnType<typeof createCartRequest>) {
  try {
    put(createCartRequest(payload.payload))
    const response: Cart[] = yield call(api.get, 'cart/'+ payload.payload)
    yield put(loadCartSuccess(response))
  } catch (error: any) {
    yield put(loadCartFailure(error.response.message))
  }
}

//Create
export function* createCart(payload: ReturnType<typeof createCartRequest>) {
  try {
    put(createCartRequest(payload.payload))
    const response: Cart = yield call(api.post, 'cart', payload.payload)
    yield put(createCartSuccess(response))
  } catch (error: any) {
    yield put(createCartFailure(error.response.message))
  }
}
