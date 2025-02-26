import {call, put, fork} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadMyLaunchPhaseExtrasRequest,
  loadMyLaunchPhaseExtrasSuccess,
  loadMyLaunchPhaseExtrasFailure,

  loadLaunchPhaseExtrasRequest,
  loadLaunchPhaseExtrasSuccess,
  loadLaunchPhaseExtrasFailure,

  createLaunchPhaseExtrasRequest,
  createLaunchPhaseExtrasSuccess,
  createLaunchPhaseExtrasFailure,

  updateLaunchPhaseExtrasRequest,
  updateLaunchPhaseExtrasSuccess,
  updateLaunchPhaseExtrasFailure,

  deleteLaunchPhaseExtrasRequest,
  deleteLaunchPhaseExtrasSuccess,
  deleteLaunchPhaseExtrasFailure,

} from './actions'

import {LaunchPhaseExtras} from './types'

//Load
export function* loadLaunchPhaseExtra(payload: ReturnType<typeof loadLaunchPhaseExtrasRequest>) {
  console.log("chamei", payload)
  try {
    console.log("chamei", payload)
    put(loadLaunchPhaseExtrasRequest(payload.payload))
    const response: LaunchPhaseExtras = yield call(api.get, 'launchphaseextra/' + payload.payload)
    console.log("RESPONSE????", response)
    yield put(loadLaunchPhaseExtrasSuccess(response))
  } catch (error: any) {
    yield put(loadLaunchPhaseExtrasFailure(error.response.data))
  }
}

export function* loadMyLaunchPhaseExtra(payload: ReturnType<typeof loadMyLaunchPhaseExtrasRequest>) {
  try {
    put(loadMyLaunchPhaseExtrasRequest(payload.payload))
    const response: LaunchPhaseExtras[] = yield call(api.get, 'launchphaseextra/launchphase/' + payload.payload)
    yield put(loadMyLaunchPhaseExtrasSuccess(response))
  } catch (error: any) {
    yield put(loadMyLaunchPhaseExtrasFailure(error.response.data))
  }
}



//Create
export function* createLaunchPhaseExtra(payload: ReturnType<typeof createLaunchPhaseExtrasRequest>) {
  try {
    put(createLaunchPhaseExtrasRequest(payload.payload))
    console.log("CHAMOOUUU?????????", payload.payload)	
    const response: LaunchPhaseExtras = yield call(api.post, 'launchphaseextra', payload.payload)
    console.log("***********RESPONSE????", response)

    yield put(createLaunchPhaseExtrasSuccess(response))
  } catch (error: any) {
    yield put(createLaunchPhaseExtrasFailure(error.response.data))
  }
}

//Update
export function* updateLaunchPhaseExtra(payload: ReturnType<typeof updateLaunchPhaseExtrasRequest>) {
  try {
    put(updateLaunchPhaseExtrasRequest(payload.payload))
    const response: LaunchPhaseExtras = yield call(api.patch, 'launchphaseextra/' + payload.payload.id, payload.payload)
    yield put(updateLaunchPhaseExtrasSuccess(response))
  } catch (error: any) {
    yield put(updateLaunchPhaseExtrasFailure(error.response.data))
  }
}

//Delete
export function* deleteLaunchPhaseExtra(payload: ReturnType<typeof deleteLaunchPhaseExtrasRequest>) {
  try {
    put(deleteLaunchPhaseExtrasRequest(payload.payload))
    const response: LaunchPhaseExtras = yield call(api.delete, 'launchphaseextra/' + payload.payload)
    yield put(deleteLaunchPhaseExtrasSuccess(response))
  } catch (error: any) {
    yield put(deleteLaunchPhaseExtrasFailure(error.response.data))
  }
}
