import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadCommentsRequest,
  //All
  loadCommentsSuccess,
  loadCommentsFailure
} from './actions'
import { Comment } from './types'


//Load
export function* loadComments(payload: ReturnType<typeof loadCommentsRequest>) {
  try {
    put(loadCommentsRequest())
    const response: Comment = yield call(api.get, 'dcomment')
    yield put(loadCommentsSuccess(response))
  } catch (error: any) {
    yield put(loadCommentsFailure(error.response.data))
  }
}
