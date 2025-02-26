import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Load
  loadconnectedUsersRequest,
  loadconnectedUsersSuccess,
  loadconnectedUsersFailure,

  loadconnectedTimeGroupedByHourByIdRequest,
  loadconnectedTimeGroupedByHourByIdSuccess,
  loadconnectedTimeGroupedByHourByIdFailure,
  
  loadconnectedTimeGroupedByHourRequest,
  loadconnectedTimeGroupedByHourSuccess,
  loadconnectedTimeGroupedByHourFailure,
  loadconnectedTimeGroupedByWeekDayRequest,
  loadconnectedTimeGroupedByWeekDaySuccess,
  loadconnectedTimeGroupedByWeekDayFailure,
  loadconnectedTimeGroupedByWeekDayByIdRequest,
  loadconnectedTimeGroupedByWeekDayByIdSuccess,
  loadconnectedTimeGroupedByWeekDayByIdFailure,
} from './actions'

import {OnlineUser} from './types'

//Load
export function* loadconnectedUsers(payload: ReturnType<typeof loadconnectedUsersRequest>) {
  try {
    put(loadconnectedUsersRequest())
    const response: OnlineUser[] = yield call(api.get, 'onlineusers/connectedUsers')
    yield put(loadconnectedUsersSuccess(response))
  } catch (error: any) {
    yield put(loadconnectedUsersFailure(error.response.data))
  }
}

export function* loadconnectedTimeGroupedByHour(payload: ReturnType<typeof loadconnectedTimeGroupedByHourRequest>) {
  try {
    put(loadconnectedTimeGroupedByHourRequest())
    const response: OnlineUser[] = yield call(api.get, 'onlineusers/connectedTimeGroupedByHour')
    yield put(loadconnectedTimeGroupedByHourSuccess(response))
  } catch (error: any) {
    yield put(loadconnectedTimeGroupedByHourFailure(error.response.data))
  }
}

export function* loadconnectedTimeGroupedByHourById(payload: ReturnType<typeof loadconnectedTimeGroupedByHourByIdRequest>) {
  try {
    put(loadconnectedTimeGroupedByHourByIdRequest(payload.payload))
    const response: OnlineUser[] = yield call(api.get, 'onlineusers/connectedTimeGroupedByHour/' + payload.payload)
    yield put(loadconnectedTimeGroupedByHourByIdSuccess(response))
  } catch (error: any) {
    yield put(loadconnectedTimeGroupedByHourByIdFailure(error.response.data))
  }
}

export function* loadconnectedTimeGroupedByWeekDay(payload: ReturnType<typeof loadconnectedTimeGroupedByWeekDayRequest>) {
  try {
    put(loadconnectedTimeGroupedByWeekDayRequest())
    const response: OnlineUser[] = yield call(api.get, 'onlineusers/connectedTimeGroupedByWeekDay')
    console.log("RESSSSS", response)	
    yield put(loadconnectedTimeGroupedByWeekDaySuccess(response))
  } catch (error: any) {
    yield put(loadconnectedTimeGroupedByWeekDayFailure(error.response.data))
  }
}

export function* loadconnectedTimeGroupedByWeekDayById(payload: ReturnType<typeof loadconnectedTimeGroupedByWeekDayByIdRequest>) {
  try { 
    put(loadconnectedTimeGroupedByWeekDayByIdRequest(payload.payload))
    const response: OnlineUser[] = yield call(api.get, 'onlineusers/connectedTimeGroupedByWeekDay/' + payload.payload)
    yield put(loadconnectedTimeGroupedByWeekDayByIdSuccess(response))
  } catch (error: any) {
    yield put(loadconnectedTimeGroupedByWeekDayByIdFailure(error.response.data))
  }
}
