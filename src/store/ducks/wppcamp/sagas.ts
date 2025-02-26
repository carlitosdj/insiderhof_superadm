import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  // loadAllcampRequest,
  loadAllcampSuccess,
  loadAllcampFailure,

  loadCampRequest,
  loadCampSuccess,
  loadCampFailure,

  createCampRequest,
  createCampSuccess,
  createCampFailure,

  updateCampRequest,
  updateCampSuccess,
  updateCampFailure,

  deleteCampRequest,
  deleteCampSuccess,
  deleteCampFailure,
  
  loadWppgroupavailableRequest,
  loadWppgroupavailableSuccess,
  loadWppgroupavailableFailure,
} from './actions'
import {Wppcamp} from './types'

//Load all
export function* loadAllwppcamps() {
  try {
    const response: Wppcamp[] = yield call(api.get, 'wppcamp/all/1/100')
    yield put(loadAllcampSuccess(response))
  } catch (error: any) {
    yield put(loadAllcampFailure(error.response.message))
  }
}

//Load campaigns
export function* loadWppcamps(payload: ReturnType<typeof loadCampRequest>) {
  try {
    const response: Wppcamp = yield call(api.get, 'wppcamp/' + payload.payload)
    yield put(loadCampSuccess(response))
  } catch (error: any) {
    yield put(loadCampFailure(error.response.message))
  }
}

//Create
export function* createWppcamp(payload: ReturnType<typeof createCampRequest>) {
  try {
    put(createCampRequest(payload.payload))
    const response: Wppcamp = yield call(api.post, 'wppcamp', payload.payload)
    console.log('response', response)
    yield put(createCampSuccess(response))
  } catch (error: any) {
    yield put(createCampFailure(error.response.message))
  }
}

//Update
export function* updateWppcamp(payload: ReturnType<typeof updateCampRequest>) {
  try {
    put(updateCampRequest(payload.payload))
    const response: Wppcamp = yield call(api.patch, 'wppcamp/'+payload.payload.id, payload.payload)
    yield put(updateCampSuccess(response))
  } catch (error: any) {
    yield put(updateCampFailure(error.response.message))
  }
}

//Delete
export function* deleteWppcamp(payload: ReturnType<typeof deleteCampRequest>) {
  try {
    const number: number = yield call(api.delete, 'wppcamp/' + payload.payload)
    yield put(deleteCampSuccess(number))
  } catch (error: any) {
    yield put(deleteCampFailure(error.response.data))
  }
}

//Available
export function* loadWppgroupavailable(payload: ReturnType<typeof loadWppgroupavailableRequest>) {
  try {
    const response: Wppcamp = yield call(api.get, 'groupavailable/' + payload.payload)
    yield put(loadWppgroupavailableSuccess(response))
  } catch (error: any) {
    yield put(loadWppgroupavailableFailure(error.response.message))
  }
}
