import {call, put, fork} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadClassesRequest,
  loadClassesSuccess,
  loadClassesFailure,

  loadClassRequest,
  loadClassSuccess,
  loadClassFailure,

  createClassRequest,
  createClassSuccess,
  createClassFailure,

  updateClassRequest,
  updateClassSuccess,
  updateClassFailure,

  deleteClassRequest,
  deleteClassSuccess,
  deleteClassFailure

} from './actions'

import {Class} from './types'


export function* loadClasses(payload: ReturnType<typeof loadClassesRequest>) {
  try {
    put(loadClassesRequest(payload.payload))
    const response: Class[] = yield call(api.get, 'class/module/' + payload.payload)
    yield put(loadClassesSuccess(response))
  } catch (error: any) {
    yield put(loadClassesFailure(error.response.data))
  }
}


export function* loadClass(payload: ReturnType<typeof loadClassRequest>) {
  try {
    put(loadClassRequest(payload.payload))
    const response: Class = yield call(api.get, 'class/' + payload.payload)
    yield put(loadClassSuccess(response))
  } catch (error: any) {
    yield put(loadClassFailure(error.response.data))
  }
}


//Create
export function* createClass(payload: ReturnType<typeof createClassRequest>) {
  try {
    put(createClassRequest(payload.payload))
    const response: Class = yield call(api.post, 'class', payload.payload)
    yield put(createClassSuccess(response))
  } catch (error: any) {
    yield put(createClassFailure(error.response.data))
  }
}

//Update
export function* updateClass(payload: ReturnType<typeof updateClassRequest>) {
  try {
    put(updateClassRequest(payload.payload))
    const response: Class = yield call(api.patch, 'class/' + payload.payload.id, payload.payload)
    yield put(updateClassSuccess(response))
  } catch (error: any) {
    yield put(updateClassFailure(error.response.data))
  }
}

//Delete
export function* deleteClass(payload: ReturnType<typeof deleteClassRequest>) {
  try {
    put(deleteClassRequest(payload.payload))
    const response: Class = yield call(api.delete, 'class/' + payload.payload)
    yield put(deleteClassSuccess(response))
  } catch (error: any) {
    yield put(deleteClassFailure(error.response.data))
  }
}
