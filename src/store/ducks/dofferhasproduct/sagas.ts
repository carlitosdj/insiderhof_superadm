import {call, put, fork} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadOfferHasProductsRequest,
  loadOfferHasProductsSuccess,
  loadOfferHasProductsFailure,

  createOfferHasProductsRequest,
  createOfferHasProductsSuccess,
  createOfferHasProductsFailure,

  updateOfferHasProductsRequest,
  updateOfferHasProductsSuccess,
  updateOfferHasProductsFailure,

  deleteOfferHasProductsRequest,
  deleteOfferHasProductsSuccess,
  deleteOfferHasProductsFailure,

} from './actions'

import {OfferHasProducts} from './types'

//Load
export function* loadOfferHasProducts(payload: ReturnType<typeof loadOfferHasProductsRequest>) {
  console.log("chamei", payload)
  try {
    console.log("chamei", payload)
    put(loadOfferHasProductsRequest(payload.payload))
    const response: OfferHasProducts = yield call(api.get, 'offerhasproducts/byoffer/' + payload.payload)
    console.log("RESPONSE????", response)
    yield put(loadOfferHasProductsSuccess(response))
  } catch (error: any) {
    yield put(loadOfferHasProductsFailure(error.response.data))
  }
}

//Create
export function* createOfferHasProducts(payload: ReturnType<typeof createOfferHasProductsRequest>) {
  try {
    put(createOfferHasProductsRequest(payload.payload))
    const response: OfferHasProducts = yield call(api.post, 'offerhasproducts', payload.payload)
    console.log("****************************RESPONSE????", response)
    yield put(createOfferHasProductsSuccess(response))
  } catch (error: any) {
    yield put(createOfferHasProductsFailure(error.response.data))
  }
}

//Update
export function* updateOfferHasProducts(payload: ReturnType<typeof updateOfferHasProductsRequest>) {
  try {
    put(updateOfferHasProductsRequest(payload.payload))
    const response: OfferHasProducts = yield call(api.patch, 'offerhasproducts/' + payload.payload.id, payload.payload)
    yield put(updateOfferHasProductsSuccess(response))
  } catch (error: any) {
    yield put(updateOfferHasProductsFailure(error.response.data))
  }
}

//Delete
export function* deleteOfferHasProducts(payload: ReturnType<typeof deleteOfferHasProductsRequest>) {
  try {
    put(deleteOfferHasProductsRequest(payload.payload))
    const response: OfferHasProducts = yield call(api.delete, 'offerhasproducts/' + payload.payload)
    yield put(deleteOfferHasProductsSuccess(response))
  } catch (error: any) {
    yield put(deleteOfferHasProductsFailure(error.response.data))
  }
}
