import {call, put, fork} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadMyLPFeaturesRequest,
  loadMyLPFeaturesSuccess,
  loadMyLPFeaturesFailure,

  loadLPFeatureRequest,
  loadLPFeatureSuccess,
  loadLPFeatureFailure,

  createLPFeatureRequest,
  createLPFeatureSuccess,
  createLPFeatureFailure,

  updateLPFeatureRequest,
  updateLPFeatureSuccess,
  updateLPFeatureFailure,

  deleteLPFeatureRequest,
  deleteLPFeatureSuccess,
  deleteLPFeatureFailure
} from './actions'

import {LPFeature} from './types'


export function* loadMyLPFeatures(payload: ReturnType<typeof loadMyLPFeaturesRequest>) {
  try {
    put(loadMyLPFeaturesRequest(payload.payload))
    console.log("payload", payload);
    const response: LPFeature[] = yield call(api.get, 'lpfeatures/lpsession/' + payload.payload)
    console.log("response", response);
    yield put(loadMyLPFeaturesSuccess(response))
  } catch (error: any) {
    yield put(loadMyLPFeaturesFailure(error.response.data))
  }
}


export function* loadLPFeature(payload: ReturnType<typeof loadLPFeatureRequest>) {
  try {
    put(loadLPFeatureRequest(payload.payload))
    const response: LPFeature = yield call(api.get, 'lpfeatures/' + payload.payload)
    yield put(loadLPFeatureSuccess(response))
  } catch (error: any) {
    yield put(loadLPFeatureFailure(error.response.data))
  }
}

//Create
export function* createLPFeature(payload: ReturnType<typeof createLPFeatureRequest>) {
  try {
    put(createLPFeatureRequest(payload.payload))
    const response: LPFeature = yield call(api.post, 'lpfeatures', payload.payload)
    yield put(createLPFeatureSuccess(response))
  } catch (error: any) {
    yield put(createLPFeatureFailure(error.response.data))
  }
}

//Update
export function* updateLPFeature(payload: ReturnType<typeof updateLPFeatureRequest>) {
  try {
    put(updateLPFeatureRequest(payload.payload))
    const response: LPFeature = yield call(api.patch, 'lpfeatures/' + payload.payload.id, payload.payload)
    yield put(updateLPFeatureSuccess(response))
  } catch (error: any) {
    yield put(updateLPFeatureFailure(error.response.data))
  }
}

//Delete
export function* deleteLPFeature(payload: ReturnType<typeof deleteLPFeatureRequest>) {
  try {
    put(deleteLPFeatureRequest(payload.payload))
    const response: LPFeature = yield call(api.delete, 'lpfeatures/' + payload.payload)
    yield put(deleteLPFeatureSuccess(response))
  } catch (error: any) {
    yield put(deleteLPFeatureFailure(error.response.data))
  }
}
