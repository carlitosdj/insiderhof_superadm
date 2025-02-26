import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Single
  loadAnnotationSingleFailure,
  loadAnnotationSingleRequest,
  loadAnnotationSingleSuccess,
  //Create
  createAnnotationFailure,
  createAnnotationRequest,
  createAnnotationSuccess,
} from './actions'

import {Annotation} from './types'

//Single
export function* loadAnnotationsSingle(payload: ReturnType<typeof loadAnnotationSingleRequest>) {
  try {
    put(loadAnnotationSingleRequest(payload.payload.user_id, payload.payload.componentId))
    const response: Annotation = yield call(
      api.get, 
      `annotationOnComponent/${payload.payload.user_id}/${payload.payload.componentId}`
    )
    yield put(loadAnnotationSingleSuccess(response))
  } catch (error: any) {
    yield put(loadAnnotationSingleFailure(error.response.data))
  }
}

//Create
export function* createAnnotation(payload: ReturnType<typeof createAnnotationRequest>) {
  try {
    put(createAnnotationRequest(payload.payload))
    const response: Annotation = yield call(api.post, 'annotation', payload.payload)
    yield put(createAnnotationSuccess(response))
  } catch (error: any) {
    yield put(createAnnotationFailure(error.response.data))
  }
}
