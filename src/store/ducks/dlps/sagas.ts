import {call, put, fork} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadMyLPsRequest,
  loadMyLPsSuccess,
  loadMyLPsFailure,

  loadLPRequest,
  loadLPSuccess,
  loadLPFailure,

  createLPRequest,
  createLPSuccess,
  createLPFailure,

  updateLPRequest,
  updateLPSuccess,
  updateLPFailure,

  deleteLPRequest,
  deleteLPSuccess,
  deleteLPFailure,
  exportLPFailure,
  exportLPSuccess,
  exportLPRequest,
  importLPRequest,
  importLPSuccess,
  importLPFailure,
  duplicateLPFailure,
  duplicateLPSuccess,
  duplicateLPRequest
} from './actions'

import {LP} from './types'


export function* loadMyLPs(payload: ReturnType<typeof loadMyLPsRequest>) {
  try {
    put(loadMyLPsRequest(payload.payload))
    console.log("payload", payload);
    const response: LP[] = yield call(api.get, 'lp/launchphase/' + payload.payload)
    console.log("response", response);
    yield put(loadMyLPsSuccess(response))
  } catch (error: any) {
    yield put(loadMyLPsFailure(error.response.data))
  }
}


export function* loadLP(payload: ReturnType<typeof loadLPRequest>) {
  try {
    put(loadLPRequest(payload.payload))
    const response: LP = yield call(api.get, 'lp/' + payload.payload)
    yield put(loadLPSuccess(response))
  } catch (error: any) {
    yield put(loadLPFailure(error.response.data))
  }
}

//Create
export function* createLP(payload: ReturnType<typeof createLPRequest>) {
  try {
    put(createLPRequest(payload.payload))
    const response: LP = yield call(api.post, 'lp', payload.payload)
    yield put(createLPSuccess(response))
  } catch (error: any) {
    yield put(createLPFailure(error.response.data))
  }
}

//Update
export function* updateLP(payload: ReturnType<typeof updateLPRequest>) {
  try {
    put(updateLPRequest(payload.payload))
    const response: LP = yield call(api.patch, 'lp/' + payload.payload.id, payload.payload)
    yield put(updateLPSuccess(response))
  } catch (error: any) {
    yield put(updateLPFailure(error.response.data))
  }
}

//Delete
export function* deleteLP(payload: ReturnType<typeof deleteLPRequest>) {
  try {
    put(deleteLPRequest(payload.payload))
    const response: LP = yield call(api.delete, 'lp/' + payload.payload)
    yield put(deleteLPSuccess(response))
  } catch (error: any) {
    yield put(deleteLPFailure(error.response.data))
  }
}

//Export
export function* exportLP(payload: ReturnType<typeof exportLPRequest>) {
  try {
    //console.log("🔄 exportLP saga started with payload:", payload);
    const response: LP = yield call(api.get, 'lp/export/' + payload.payload)
    //console.log("📡 API response:", response);
    yield put(exportLPSuccess(response))
    //console.log("✅ exportLP saga completed successfully");
  } catch (error: any) {
    //console.error("❌ exportLP saga error:", error);
    yield put(exportLPFailure(error.response.data))
  }
}

//Import
export function* importLP(payload: ReturnType<typeof importLPRequest>) {
  try {
    put(importLPRequest(payload.payload))
    const response: LP = yield call(api.post, 'lp/import', payload.payload)
    yield put(importLPSuccess(response))
  } catch (error: any) {
    yield put(importLPFailure(error.response.data))
  }
}

//Duplicate
export function* duplicateLP(payload: ReturnType<typeof duplicateLPRequest>) {
  try {
    put(duplicateLPRequest(payload.payload))
    const response: LP = yield call(api.post, 'lp/duplicate/' + payload.payload)
    yield put(duplicateLPSuccess(response))
  } catch (error: any) {
    yield put(duplicateLPFailure(error.response.data))
  }
}