import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadCartsRequest,
  loadCartSuccess,
  loadCartFailure,
  createCartRequest,
  createCartSuccess,
  createCartFailure,
  selectCartsAddRequest,
  selectCartsAddSuccess,
  selectCartsRemoveRequest,
  selectCartsRemoveSuccess,
} from './actions'
import {Cart} from './types'

export function* loadCarts(payload: ReturnType<typeof loadCartsRequest>) {
  try {
    put(loadCartsRequest( payload.payload.startDate, payload.payload.endDate, payload.payload.launchId))
    let response: Cart[];
    if(payload.payload.startDate || payload.payload.endDate || payload.payload.launchId)
    {
      console.log("entrou", `cart/all/${payload.payload.startDate}/${payload.payload.endDate}/${payload.payload.launchId}`)
      response = yield call(api.get, `cart/all/${payload.payload.startDate}/${payload.payload.endDate}/${payload.payload.launchId}`)
    }else{
      response = yield call(api.get, 'cart/all')
    }
    
    
    yield put(loadCartSuccess(response))
  } catch (error: any) {
    yield put(loadCartFailure(error.response.message))
  }
}

export function* loadCart(payload: ReturnType<typeof createCartRequest>) {
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


//SelectedUser
export function* selectCartsAdd(payload: ReturnType<typeof selectCartsAddRequest>) {
  try {
    //const response: User = yield call(api.delete, 'users/' + payload.payload)
    console.log('PAYLOAD', payload)
    yield put(selectCartsAddSuccess(payload.payload))
  } catch (error: any) {
    //yield put(deleteUserFailure())
    console.log('ERrro', error.response.data)
  }
}

//SelectedUser
export function* selectCartsRemove(payload: ReturnType<typeof selectCartsRemoveRequest>) {
  try {
    //const response: User = yield call(api.delete, 'users/' + payload.payload)
    yield put(selectCartsRemoveSuccess(payload.payload))
  } catch (error: any) {
    //yield put(deleteUserFailure())
    console.log('ERrro', error.response.data)
  }
}