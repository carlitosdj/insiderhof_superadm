import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  confirmRsvpRequest,
  confirmRsvpSuccess,
  confirmRsvpFailure,
  loadRsvpsByEventRequest,
  loadRsvpsByEventSuccess,
  loadRsvpsByEventFailure,
  loadRsvpByTicketRequest,
  loadRsvpByTicketSuccess,
  loadRsvpByTicketFailure,
} from './actions'

import {EventRsvp} from './types'

// Confirm RSVP
export function* confirmRsvp(payload: ReturnType<typeof confirmRsvpRequest>) {
  try {
    put(confirmRsvpRequest(payload.payload))
    const response: EventRsvp = yield call(api.post, 'event-rsvps', payload.payload)
    yield put(confirmRsvpSuccess(response))

    // Show success message
    alert('RSVP confirmado com sucesso!')
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erro ao confirmar RSVP'
    alert(errorMessage)
    yield put(confirmRsvpFailure(error.response?.data || error))
  }
}

// Load RSVPs by event
export function* loadRsvpsByEvent(
  payload: ReturnType<typeof loadRsvpsByEventRequest>
) {
  try {
    put(loadRsvpsByEventRequest(payload.payload))
    const response: EventRsvp[] = yield call(
      api.get,
      'event-rsvps/event/' + payload.payload
    )
    yield put(loadRsvpsByEventSuccess(response))
  } catch (error: any) {
    yield put(loadRsvpsByEventFailure(error.response?.data || error))
  }
}

// Load RSVP by ticket
export function* loadRsvpByTicket(
  payload: ReturnType<typeof loadRsvpByTicketRequest>
) {
  try {
    put(loadRsvpByTicketRequest(payload.payload))
    const response: EventRsvp = yield call(
      api.get,
      'event-rsvps/ticket/' + payload.payload
    )
    yield put(loadRsvpByTicketSuccess(response))
  } catch (error: any) {
    yield put(loadRsvpByTicketFailure(error.response?.data || error))
  }
}
