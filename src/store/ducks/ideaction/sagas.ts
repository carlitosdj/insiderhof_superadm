import { call, put, fork } from 'redux-saga/effects';
import api from '../../../services/api';

import {
  
  loadMyIdeactionsRequest,
  loadMyIdeactionsSuccess,
  loadMyIdeactionsFailure,
  
  loadIdeactionRequest,
  loadIdeactionSuccess,
  loadIdeactionFailure,
  
  createIdeactionRequest,
  createIdeactionSuccess,
  createIdeactionFailure,
  
  updateIdeactionRequest,
  updateIdeactionSuccess,
  updateIdeactionFailure,

  deleteIdeactionRequest,
  deleteIdeactionSuccess,
  deleteIdeactionFailure,


} from './actions';

import { Ideaction } from './types';



// Load ideactions by owner
export function* loadMyIdeactions(payload: ReturnType<typeof loadMyIdeactionsRequest>) {
  try {
    console.log("Saga: loadMyIdeactions started with payload:", payload);
    console.log("Saga: Loading ideactions for owner:", payload.payload);
    const response: { data: Ideaction[] } = yield call(api.get, `/ideaction/${payload.payload}`);
    console.log("Saga: API Response:", response);
    console.log("Saga: response.data", response.data);
    yield put(loadMyIdeactionsSuccess(response.data));
    console.log("Saga: loadMyIdeactionsSuccess dispatched");
  } catch (error: any) {
    console.error("Saga: Error loading ideactions:", error);
    console.error("Saga: Error response:", error.response);
    console.error("Saga: Error message:", error.message);
    yield put(loadMyIdeactionsFailure(error.response?.data || error.message));
    console.log("Saga: loadMyIdeactionsFailure dispatched");
  }
}

// Load single ideaction
export function* loadIdeaction(payload: ReturnType<typeof loadIdeactionRequest>) {
  try {
    put(loadIdeactionRequest(payload.payload));
    const response: { data: Ideaction } = yield call(api.get, `/ideaction/${payload.payload}`);
    yield put(loadIdeactionSuccess(response.data));
  } catch (error: any) {
    yield put(loadIdeactionFailure(error.response.data));
  }
}

// Create ideaction
export function* createIdeaction(payload: ReturnType<typeof createIdeactionRequest>) {
  try {
    put(createIdeactionRequest(payload.payload));
    const response: { data: Ideaction } = yield call(api.post, '/ideaction', payload.payload);
    yield put(createIdeactionSuccess(response.data));
  } catch (error: any) {
    yield put(createIdeactionFailure(error.response.data));
  }
}

// Update ideaction
export function* updateIdeaction(payload: ReturnType<typeof updateIdeactionRequest>) {
  try {
    put(updateIdeactionRequest(payload.payload));
    const response: { data: Ideaction } = yield call(api.patch, `/ideaction/${payload.payload.id}`, payload.payload);
    yield put(updateIdeactionSuccess(response.data));
  } catch (error: any) {
    yield put(updateIdeactionFailure(error.response.data));
  }
}

// Delete ideaction
export function* deleteIdeaction(payload: ReturnType<typeof deleteIdeactionRequest>) {
  try {
    put(deleteIdeactionRequest(payload.payload));
    const response: { data: Ideaction } = yield call(api.delete, `/ideaction/${payload.payload}`);
    yield put(deleteIdeactionSuccess(response.data));
  } catch (error: any) {
    yield put(deleteIdeactionFailure(error.response.data));
  }
}

