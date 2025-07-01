import {call, put, fork} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadMyLPSessionsRequest,
  loadMyLPSessionsSuccess,
  loadMyLPSessionsFailure,

  loadLPSessionRequest,
  loadLPSessionSuccess,
  loadLPSessionFailure,

  createLPSessionRequest,
  createLPSessionSuccess,
  createLPSessionFailure,

  updateLPSessionRequest,
  updateLPSessionSuccess,
  updateLPSessionFailure,

  deleteLPSessionRequest,
  deleteLPSessionSuccess,
  deleteLPSessionFailure
} from './actions'

import {LPSession} from './types'


export function* loadMyLPSessions(payload: ReturnType<typeof loadMyLPSessionsRequest>) {
  try {
    put(loadMyLPSessionsRequest(payload.payload))
    console.log("payload", payload);
    const response: LPSession[] = yield call(api.get, 'lpsession/lp/' + payload.payload)
    console.log("response", response);
    yield put(loadMyLPSessionsSuccess(response))
  } catch (error: any) {
    yield put(loadMyLPSessionsFailure(error.response.data))
  }
}


export function* loadLPSession(payload: ReturnType<typeof loadLPSessionRequest>) {
  try {
    put(loadLPSessionRequest(payload.payload))
    const response: LPSession = yield call(api.get, 'lpsession/' + payload.payload)
    yield put(loadLPSessionSuccess(response))
  } catch (error: any) {
    yield put(loadLPSessionFailure(error.response.data))
  }
}

//Create
export function* createLPSession(payload: ReturnType<typeof createLPSessionRequest>) {
  try {
    console.log("=== createLPSession saga ===");
    console.log("Payload received:", payload);
    console.log("Payload data:", payload.payload);
    console.log("Payload data type:", typeof payload.payload);
    console.log("Payload data keys:", Object.keys(payload.payload));
    console.log("Sending to API endpoint: lpsession");
    
    const response: LPSession = yield call(api.post, 'lpsession', payload.payload)
    console.log("API Response:", response);
    console.log("API Response type:", typeof response);
    yield put(createLPSessionSuccess(response))
  } catch (error: any) {
    console.error("API Error:", error);
    console.error("Error response:", error.response);
    console.error("Error message:", error.message);
    yield put(createLPSessionFailure(error.response?.data || error.message))
  }
}

//Update
export function* updateLPSession(payload: ReturnType<typeof updateLPSessionRequest>) {
  try {
    put(updateLPSessionRequest(payload.payload))
    const response: LPSession = yield call(api.patch, 'lpsession/' + payload.payload.id, payload.payload)
    yield put(updateLPSessionSuccess(response))
  } catch (error: any) {
    yield put(updateLPSessionFailure(error.response.data))
  }
}

//Delete
export function* deleteLPSession(payload: ReturnType<typeof deleteLPSessionRequest>) {
  try {
    put(deleteLPSessionRequest(payload.payload))
    const response: LPSession = yield call(api.delete, 'lpsession/' + payload.payload)
    yield put(deleteLPSessionSuccess(response))
  } catch (error: any) {
    yield put(deleteLPSessionFailure(error.response.data))
  }
}
