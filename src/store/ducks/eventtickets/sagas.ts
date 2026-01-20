import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadTicketsByEventRequest,
  loadTicketsByEventSuccess,
  loadTicketsByEventFailure,
  loadTicketsByUserRequest,
  loadTicketsByUserSuccess,
  loadTicketsByUserFailure,
  loadTicketRequest,
  loadTicketSuccess,
  loadTicketFailure,
  createTicketRequest,
  createTicketSuccess,
  createTicketFailure,
  updateTicketRequest,
  updateTicketSuccess,
  updateTicketFailure,
  validateTicketRequest,
  validateTicketSuccess,
  validateTicketFailure,
  transferTicketRequest,
  transferTicketSuccess,
  transferTicketFailure,
  loadAttendanceListRequest,
  loadAttendanceListSuccess,
  loadAttendanceListFailure,
} from './actions'

import {EventTicket, AttendanceItem} from './types'

// Load tickets by event
export function* loadTicketsByEvent(payload: ReturnType<typeof loadTicketsByEventRequest>) {
  try {
    put(loadTicketsByEventRequest(payload.payload.eventId, payload.payload.filters))

    // Construir query params
    const params = new URLSearchParams()

    if (payload.payload.filters?.type) {
      params.append('type', payload.payload.filters.type)
    }
    if (payload.payload.filters?.status) {
      params.append('status', payload.payload.filters.status)
    }
    if (payload.payload.filters?.userId) {
      params.append('userId', String(payload.payload.filters.userId))
    }

    const queryString = params.toString()
    const url = `event-tickets/event/${payload.payload.eventId}${queryString ? `?${queryString}` : ''}`

    const response: EventTicket[] = yield call(api.get, url)
    yield put(loadTicketsByEventSuccess(response))
  } catch (error: any) {
    yield put(loadTicketsByEventFailure(error.response?.data || error))
  }
}

// Load tickets by user
export function* loadTicketsByUser(payload: ReturnType<typeof loadTicketsByUserRequest>) {
  try {
    put(loadTicketsByUserRequest(payload.payload))
    const response: EventTicket[] = yield call(
      api.get,
      'event-tickets/user/' + payload.payload
    )
    yield put(loadTicketsByUserSuccess(response))
  } catch (error: any) {
    yield put(loadTicketsByUserFailure(error.response?.data || error))
  }
}

// Load single ticket
export function* loadTicket(payload: ReturnType<typeof loadTicketRequest>) {
  try {
    put(loadTicketRequest(payload.payload))
    const response: EventTicket = yield call(api.get, 'event-tickets/' + payload.payload)
    yield put(loadTicketSuccess(response))
  } catch (error: any) {
    yield put(loadTicketFailure(error.response?.data || error))
  }
}

// Create ticket
export function* createTicket(payload: ReturnType<typeof createTicketRequest>) {
  try {
    put(createTicketRequest(payload.payload))
    const response: EventTicket = yield call(api.post, 'event-tickets', payload.payload)
    yield put(createTicketSuccess(response))
  } catch (error: any) {
    yield put(createTicketFailure(error.response?.data || error))
  }
}

// Update ticket
export function* updateTicket(payload: ReturnType<typeof updateTicketRequest>) {
  try {
    const response: EventTicket = yield call(
      api.patch,
      'event-tickets/' + payload.payload.id,
      payload.payload
    )
    yield put(updateTicketSuccess(response))
  } catch (error: any) {
    yield put(updateTicketFailure(error.response?.data || error))
  }
}

// Validate ticket
export function* validateTicket(payload: ReturnType<typeof validateTicketRequest>) {
  try {
    put(validateTicketRequest(payload.payload))
    const response: EventTicket = yield call(
      api.get,
      'event-tickets/validate/' + payload.payload
    )
    yield put(validateTicketSuccess(response))
  } catch (error: any) {
    yield put(validateTicketFailure(error.response?.data || error))
  }
}

// Transfer ticket
export function* transferTicket(payload: ReturnType<typeof transferTicketRequest>): any {
  try {
    put(transferTicketRequest(payload.payload))
    const response: any = yield call(api.post, 'event-tickets/transfer', payload.payload)
    yield put(transferTicketSuccess(response))
  } catch (error: any) {
    yield put(transferTicketFailure(error.response?.data || error))
  }
}

// Load attendance list
export function* loadAttendanceList(payload: ReturnType<typeof loadAttendanceListRequest>) {
  try {
    put(loadAttendanceListRequest(payload.payload))
    const response: AttendanceItem[] = yield call(
      api.get,
      'event-tickets/attendance/' + payload.payload
    )
    yield put(loadAttendanceListSuccess(response))
  } catch (error: any) {
    yield put(loadAttendanceListFailure(error.response?.data || error))
  }
}
