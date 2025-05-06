import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Load
  loadSingleMailRequest,
  loadSingleMailSuccess,
  loadSingleMailFailure,
  //Create
  createSingleMailRequest,
  createSingleMailSuccess,
  createSingleMailFailure,
} from './actions'

import {SingleMail} from './types'

//Load
export function* loadSingleMail(payload: ReturnType<typeof loadSingleMailRequest>) {
  try {
    put(loadSingleMailRequest())
    const response: SingleMail = yield call(api.get, 'singlemail/all/1/1000')
    yield put(loadSingleMailSuccess(response))
  } catch (error: any) {
    yield put(loadSingleMailFailure(error.response.data))
  }
}

//Create
export function* createSingleMail(payload: ReturnType<typeof createSingleMailRequest>) {
  try {
    put(createSingleMailRequest(payload.payload))
    const response: SingleMail = yield call(api.post, 'singlemail', payload.payload)
    yield put(createSingleMailSuccess(response))
  } catch (error: any) {
    yield put(createSingleMailFailure(error.response.data))
  }
}
