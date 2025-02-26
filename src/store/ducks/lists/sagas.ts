import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Load
  loadListsFailure,
  loadListsRequest,
  loadListsSuccess,
} from './actions'

import {Lists} from './types'

//Load
export function* loadLists(payload: ReturnType<typeof loadListsRequest>) {
  try {
    put(loadListsRequest())
    const response: Lists[] = yield call(api.get, 'lead/lists')
    yield put(loadListsSuccess(response))
  } catch (error: any) {
    yield put(loadListsFailure(error.response.data))
  }
}
