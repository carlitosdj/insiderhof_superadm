import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  createCheckinRequest,
  createCheckinSuccess,
  createCheckinFailure,
  loadCheckinsByEventRequest,
  loadCheckinsByEventSuccess,
  loadCheckinsByEventFailure,
  cancelCheckinRequest,
  cancelCheckinSuccess,
  cancelCheckinFailure,
} from './actions'

import {EventCheckin} from './types'

// Create checkin
export function* createCheckin(payload: ReturnType<typeof createCheckinRequest>) {
  try {
    put(createCheckinRequest(payload.payload))
    const response: EventCheckin = yield call(api.post, 'event-checkins', payload.payload)
    yield put(createCheckinSuccess(response))

    // Show success message
    alert('Check-in realizado com sucesso!')
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erro ao realizar check-in'
    alert(errorMessage)
    yield put(createCheckinFailure(error.response?.data || error))
  }
}

// Load checkins by event
export function* loadCheckinsByEvent(
  payload: ReturnType<typeof loadCheckinsByEventRequest>
) {
  try {
    put(loadCheckinsByEventRequest(payload.payload))
    const response: EventCheckin[] = yield call(
      api.get,
      'event-checkins/event/' + payload.payload
    )
    yield put(loadCheckinsByEventSuccess(response))
  } catch (error: any) {
    yield put(loadCheckinsByEventFailure(error.response?.data || error))
  }
}

// Cancel checkin
export function* cancelCheckin(payload: ReturnType<typeof cancelCheckinRequest>): Generator<any, void, any> {
  try {
    put(cancelCheckinRequest(payload.payload))
    const response: any = yield call(api.delete, 'event-checkins/' + payload.payload)
    yield put(cancelCheckinSuccess(response))

    alert('Check-in cancelado com sucesso!')
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erro ao cancelar check-in'
    alert(errorMessage)
    yield put(cancelCheckinFailure(error.response?.data || error))
  }
}
