import {call, put, fork} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadOfferRequest,
  loadOfferSuccess,
  loadOfferFailure,

  loadMyOffersRequest,
  loadMyOffersSuccess,
  loadMyOffersFailure,

  createOfferRequest,
  createOfferSuccess,
  createOfferFailure,

  updateOfferRequest,
  updateOfferSuccess,
  updateOfferFailure,

  deleteOfferRequest,
  deleteOfferSuccess,
  deleteOfferFailure,
} from './actions'

import {Offer} from './types'

//Load
export function* loadOffer(payload: ReturnType<typeof loadOfferRequest>) {
  console.log("chamei", payload)
  try {
    console.log("chamei", payload)
    put(loadOfferRequest(payload.payload))
    const response: Offer = yield call(api.get, 'offer/' + payload.payload)
    console.log("RESPONSE????", response)
    yield put(loadOfferSuccess(response))
  } catch (error: any) {
    yield put(loadOfferFailure(error.response.data))
  }
}

export function* loadMyOffers(payload: ReturnType<typeof loadMyOffersRequest>) {
  try {
    put(loadMyOffersRequest(payload.payload))
    const response: Offer[] = yield call(api.get, 'offer/owner/' + payload.payload)
    yield put(loadMyOffersSuccess(response))
  } catch (error: any) {
    yield put(loadMyOffersFailure(error.response.data))
  }
}



//Create
export function* createOffer(payload: ReturnType<typeof createOfferRequest>) {
  try {
    put(createOfferRequest(payload.payload))
    const response: Offer = yield call(api.post, 'offer', payload.payload)

    yield put(createOfferSuccess(response))
  } catch (error: any) {
    yield put(createOfferFailure(error.response.data))
  }
}

//Update
export function* updateOffer(payload: ReturnType<typeof updateOfferRequest>) {
  try {
    put(updateOfferRequest(payload.payload))
    const response: Offer = yield call(api.patch, 'offer/' + payload.payload.id, payload.payload)
    yield put(updateOfferSuccess(response))
  } catch (error: any) {
    yield put(updateOfferFailure(error.response.data))
  }
}

//Delete
export function* deleteOffer(payload: ReturnType<typeof deleteOfferRequest>) {
  try {
    put(deleteOfferRequest(payload.payload))
    const response: Offer = yield call(api.delete, 'offer/' + payload.payload)
    yield put(deleteOfferSuccess(response))
  } catch (error: any) {
    yield put(deleteOfferFailure(error.response.data))
  }
}
