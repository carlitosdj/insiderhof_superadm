import {call, put, fork} from 'redux-saga/effects'
import api from '../../../services/api'

import {
 
  loadLaunchHasOffersRequest,
  loadLaunchHasOffersSuccess,
  loadLaunchHasOffersFailure,
  
  createLaunchHasOffersRequest,
  createLaunchHasOffersSuccess,
  createLaunchHasOffersFailure, 
  
  updateLaunchHasOffersRequest,
  updateLaunchHasOffersSuccess,
  updateLaunchHasOffersFailure,

  deleteLaunchHasOffersRequest,
  deleteLaunchHasOffersSuccess,
  deleteLaunchHasOffersFailure,

} from './actions'

import {LaunchHasOffers} from './types'

//Load
export function* loadLaunchHasOffers(payload: ReturnType<typeof loadLaunchHasOffersRequest>) {
  console.log("chamei", payload)
  try {
    console.log("chamei", payload)
    put(loadLaunchHasOffersRequest(payload.payload))
    const response: LaunchHasOffers = yield call(api.get, 'launchhasoffers/bylaunch/' + payload.payload)
    console.log("RESPONSE????", response)
    yield put(loadLaunchHasOffersSuccess(response))
  } catch (error: any) {
    yield put(loadLaunchHasOffersFailure(error.response.data))
  }
}



//Create
export function* createLaunchHasOffers(payload: ReturnType<typeof createLaunchHasOffersRequest>) {
  try {
    put(createLaunchHasOffersRequest(payload.payload))
    const response: LaunchHasOffers = yield call(api.post, 'launchhasoffers', payload.payload)

    yield put(createLaunchHasOffersSuccess(response))
  } catch (error: any) {
    yield put(createLaunchHasOffersFailure(error.response.data))
  }
}

//Update
export function* updateLaunchHasOffers(payload: ReturnType<typeof updateLaunchHasOffersRequest>) {
  try {
    put(updateLaunchHasOffersRequest(payload.payload))
    const response: LaunchHasOffers = yield call(api.patch, 'launchhasoffers/' + payload.payload.id, payload.payload)
    yield put(updateLaunchHasOffersSuccess(response))
  } catch (error: any) {
    yield put(updateLaunchHasOffersFailure(error.response.data))
  }
}

//Delete
export function* deleteLaunchHasOffers(payload: ReturnType<typeof deleteLaunchHasOffersRequest>) {
  try {
    put(deleteLaunchHasOffersRequest(payload.payload))
    const response: LaunchHasOffers = yield call(api.delete, 'launchhasoffers/' + payload.payload)
    yield put(deleteLaunchHasOffersSuccess(response))
  } catch (error: any) {
    yield put(deleteLaunchHasOffersFailure(error.response.data))
  }
}
