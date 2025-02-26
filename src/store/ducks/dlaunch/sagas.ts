import {call, put, fork} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadMyLaunchsRequest,
  loadMyLaunchsSuccess,
  loadMyLaunchsFailure,
  
  loadLaunchRequest,
  loadLaunchSuccess,
  loadLaunchFailure,
  
  createLaunchRequest,
  createLaunchSuccess,
  createLaunchFailure, 
  
  updateLaunchRequest,
  updateLaunchSuccess,
  updateLaunchFailure,

  deleteLaunchRequest,
  deleteLaunchSuccess,
  deleteLaunchFailure,

} from './actions'

import {Launch} from './types'

//Load
export function* loadLaunch(payload: ReturnType<typeof loadLaunchRequest>) {
  console.log("chamei", payload)
  try {
    console.log("chamei", payload)
    put(loadLaunchRequest(payload.payload))
    const response: Launch = yield call(api.get, 'launch/' + payload.payload)
    console.log("RESPONSE????", response)
    yield put(loadLaunchSuccess(response))
  } catch (error: any) {
    yield put(loadLaunchFailure(error.response.data))
  }
}

export function* loadMyLaunchs(payload: ReturnType<typeof loadMyLaunchsRequest>) {
  try {
    put(loadMyLaunchsRequest(payload.payload))
    const response: Launch[] = yield call(api.get, 'launch/owner/' + payload.payload)
    yield put(loadMyLaunchsSuccess(response))
  } catch (error: any) {
    yield put(loadMyLaunchsFailure(error.response.data))
  }
}



//Create
export function* createLaunch(payload: ReturnType<typeof createLaunchRequest>) {
  try {
    put(createLaunchRequest(payload.payload))
    console.log("CHAMOOUUU?????????", payload.payload)	
    const response: Launch = yield call(api.post, 'launch', payload.payload)
    console.log("***********RESPONSE????", response)

    yield put(createLaunchSuccess(response))
  } catch (error: any) {
    yield put(createLaunchFailure(error.response.data))
  }
}

//Update
export function* updateLaunch(payload: ReturnType<typeof updateLaunchRequest>) {
  try {
    put(updateLaunchRequest(payload.payload))
    const response: Launch = yield call(api.patch, 'launch/' + payload.payload.id, payload.payload)
    yield put(updateLaunchSuccess(response))
  } catch (error: any) {
    yield put(updateLaunchFailure(error.response.data))
  }
}

//Delete
export function* deleteLaunch(payload: ReturnType<typeof deleteLaunchRequest>) {
  try {
    put(deleteLaunchRequest(payload.payload))
    const response: Launch = yield call(api.delete, 'launch/' + payload.payload)
    yield put(deleteLaunchSuccess(response))
  } catch (error: any) {
    yield put(deleteLaunchFailure(error.response.data))
  }
}
