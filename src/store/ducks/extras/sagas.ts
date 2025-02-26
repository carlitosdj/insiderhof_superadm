import {call, put, fork} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadExtrasRequest,
  loadExtrasSuccess,
  loadExtrasFailure,
  createExtraRequest,
  createExtraSuccess,
  createExtraFailure,
  updateExtraRequest,
  updateExtraSuccess,
  updateExtraFailure,
  deleteExtraRequest,
  deleteExtraSuccess,
  deleteExtraFailure,
} from './actions'

import {Extras} from './types'

//Load
export function* loadExtras(payload: ReturnType<typeof loadExtrasRequest>) {
  try {
    put(loadExtrasRequest(payload.payload))
    const response: Extras[] = yield call(api.get, 'compextra/extras/' + payload.payload)
    yield put(loadExtrasSuccess(response))
  } catch (error: any) {
    yield put(loadExtrasFailure(error.response.data))
  }
}

//Create
export function* createExtra(payload: ReturnType<typeof createExtraRequest>) {
  try {
    put(createExtraRequest())
    const response: Extras = yield call(api.post, 'xxxx', payload)
    yield put(createExtraSuccess(response))
  } catch (error: any) {
    yield put(createExtraFailure(error.response.data))
  }
}

//Update
export function* updateExtra(payload: ReturnType<typeof updateExtraRequest>) {
  try {
    put(updateExtraRequest())
    const response: Extras = yield call(api.put, 'xxxx' + payload, payload)
    yield put(updateExtraSuccess(response))
  } catch (error: any) {
    yield put(updateExtraFailure(error.response.data))
  }
}

//Delete
export function* deleteExtra(payload: ReturnType<typeof deleteExtraRequest>) {
  try {
    put(deleteExtraRequest())
    const response: Extras = yield call(api.delete, 'xxxx' + payload)
    yield put(deleteExtraSuccess(response))
  } catch (error: any) {
    yield put(deleteExtraFailure(error.response.data))
  }
}
