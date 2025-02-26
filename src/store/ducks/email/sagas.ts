import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Load
  loadEmailToListRequest,
  loadEmailToListSuccess,
  loadEmailToListFailure,
  //Create
  createEmailToListRequest,
  createEmailToListSuccess,
  createEmailToListFailure,
} from './actions'

import {EmailTolist} from './types'

//Load
export function* loadEmailToList(payload: ReturnType<typeof loadEmailToListRequest>) {
  try {
    put(loadEmailToListRequest())
    const response: EmailTolist = yield call(api.get, 'massmail/all/1/1000')
    yield put(loadEmailToListSuccess(response))
  } catch (error: any) {
    yield put(loadEmailToListFailure(error.response.data))
  }
}

//Create
export function* createEmailToList(payload: ReturnType<typeof createEmailToListRequest>) {
  try {
    put(createEmailToListRequest(payload.payload))
    const response: EmailTolist = yield call(api.post, 'massmail', payload.payload)
    yield put(createEmailToListSuccess(response))
  } catch (error: any) {
    yield put(createEmailToListFailure(error.response.data))
  }
}
