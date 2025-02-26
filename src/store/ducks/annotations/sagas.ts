import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //All
  loadMyAnnotationsFailure,
  loadMyAnnotationsRequest,
  loadMyAnnotationsSuccess,
} from './actions'

import {Annotation} from '../annotation/types'

//Load
export function* loadMyAnnotations(payload: ReturnType<typeof loadMyAnnotationsRequest>) {
  try {
    put(loadMyAnnotationsRequest())
    const response: Annotation = yield call(api.get, 'annotation')
    yield put(loadMyAnnotationsSuccess(response))
  } catch (error: any) {
    yield put(loadMyAnnotationsFailure(error.response.data))
  }
}
