import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  // Sessions
  loadSessionsRequest,
  loadSessionsSuccess,
  loadSessionsFailure,
  loadSessionRequest,
  loadSessionSuccess,
  loadSessionFailure,
  createSessionRequest,
  createSessionSuccess,
  createSessionFailure,
  updateSessionRequest,
  updateSessionSuccess,
  updateSessionFailure,
  deleteSessionRequest,
  deleteSessionSuccess,
  deleteSessionFailure,
  // Speakers
  loadSpeakersRequest,
  loadSpeakersSuccess,
  loadSpeakersFailure,
  loadSpeakerRequest,
  loadSpeakerSuccess,
  loadSpeakerFailure,
  createSpeakerRequest,
  createSpeakerSuccess,
  createSpeakerFailure,
  updateSpeakerRequest,
  updateSpeakerSuccess,
  updateSpeakerFailure,
  deleteSpeakerRequest,
  deleteSpeakerSuccess,
  deleteSpeakerFailure,
  addSpeakerToSessionRequest,
  addSpeakerToSessionSuccess,
  addSpeakerToSessionFailure,
  removeSpeakerFromSessionRequest,
  removeSpeakerFromSessionSuccess,
  removeSpeakerFromSessionFailure,
  // Artifacts
  loadArtifactsRequest,
  loadArtifactsSuccess,
  loadArtifactsFailure,
  loadArtifactRequest,
  loadArtifactSuccess,
  loadArtifactFailure,
  createArtifactRequest,
  createArtifactSuccess,
  createArtifactFailure,
  updateArtifactRequest,
  updateArtifactSuccess,
  updateArtifactFailure,
  deleteArtifactRequest,
  deleteArtifactSuccess,
  deleteArtifactFailure,
} from './actions'

import {EventSession, EventSpeaker, EventArtifact} from './types'

// ==================== SESSIONS ====================

// Load sessions
export function* loadSessions(payload: ReturnType<typeof loadSessionsRequest>) {
  try {
    put(loadSessionsRequest(payload.payload))
    const response: EventSession[] = yield call(
      api.get,
      'event-sessions/event/' + payload.payload
    )
    yield put(loadSessionsSuccess(response))
  } catch (error: any) {
    yield put(loadSessionsFailure(error.response?.data || error))
  }
}

// Load single session
export function* loadSession(payload: ReturnType<typeof loadSessionRequest>) {
  try {
    put(loadSessionRequest(payload.payload))
    const response: EventSession = yield call(api.get, 'event-sessions/' + payload.payload)
    yield put(loadSessionSuccess(response))
  } catch (error: any) {
    yield put(loadSessionFailure(error.response?.data || error))
  }
}

// Create session
export function* createSession(payload: ReturnType<typeof createSessionRequest>) {
  try {
    put(createSessionRequest(payload.payload))
    const response: EventSession = yield call(api.post, 'event-sessions', payload.payload)
    yield put(createSessionSuccess(response))
  } catch (error: any) {
    yield put(createSessionFailure(error.response?.data || error))
  }
}

// Update session
export function* updateSession(payload: ReturnType<typeof updateSessionRequest>) {
  try {
    put(updateSessionRequest(payload.payload))
    const response: EventSession = yield call(
      api.patch,
      'event-sessions/' + payload.payload.id,
      payload.payload
    )
    yield put(updateSessionSuccess(response))
  } catch (error: any) {
    yield put(updateSessionFailure(error.response?.data || error))
  }
}

// Delete session
export function* deleteSession(payload: ReturnType<typeof deleteSessionRequest>) {
  try {
    put(deleteSessionRequest(payload.payload))
    const response: EventSession = yield call(api.delete, 'event-sessions/' + payload.payload)
    yield put(deleteSessionSuccess(response))
  } catch (error: any) {
    yield put(deleteSessionFailure(error.response?.data || error))
  }
}

// ==================== SPEAKERS ====================

// Load speakers
export function* loadSpeakers(payload: ReturnType<typeof loadSpeakersRequest>) {
  try {
    put(loadSpeakersRequest(payload.payload))
    const response: EventSpeaker[] = yield call(
      api.get,
      'event-speakers/event/' + payload.payload
    )
    yield put(loadSpeakersSuccess(response))
  } catch (error: any) {
    yield put(loadSpeakersFailure(error.response?.data || error))
  }
}

// Load single speaker
export function* loadSpeaker(payload: ReturnType<typeof loadSpeakerRequest>) {
  try {
    put(loadSpeakerRequest(payload.payload))
    const response: EventSpeaker = yield call(api.get, 'event-speakers/' + payload.payload)
    yield put(loadSpeakerSuccess(response))
  } catch (error: any) {
    yield put(loadSpeakerFailure(error.response?.data || error))
  }
}

// Create speaker
export function* createSpeaker(payload: ReturnType<typeof createSpeakerRequest>) {
  try {
    put(createSpeakerRequest(payload.payload))
    const response: EventSpeaker = yield call(api.post, 'event-speakers', payload.payload)
    yield put(createSpeakerSuccess(response))
  } catch (error: any) {
    yield put(createSpeakerFailure(error.response?.data || error))
  }
}

// Update speaker
export function* updateSpeaker(payload: ReturnType<typeof updateSpeakerRequest>) {
  try {
    put(updateSpeakerRequest(payload.payload))
    const response: EventSpeaker = yield call(
      api.patch,
      'event-speakers/' + payload.payload.id,
      payload.payload
    )
    yield put(updateSpeakerSuccess(response))
  } catch (error: any) {
    yield put(updateSpeakerFailure(error.response?.data || error))
  }
}

// Delete speaker
export function* deleteSpeaker(payload: ReturnType<typeof deleteSpeakerRequest>) {
  try {
    put(deleteSpeakerRequest(payload.payload))
    const response: EventSpeaker = yield call(api.delete, 'event-speakers/' + payload.payload)
    yield put(deleteSpeakerSuccess(response))
  } catch (error: any) {
    yield put(deleteSpeakerFailure(error.response?.data || error))
  }
}

// Add speaker to session
export function* addSpeakerToSession(payload: ReturnType<typeof addSpeakerToSessionRequest>): any {
  try {
    put(addSpeakerToSessionRequest(payload.payload))
    const response: any = yield call(
      api.post,
      `event-sessions/${payload.payload.sessionId}/speakers/${payload.payload.speakerId}`,
      { role: payload.payload.role, order: payload.payload.order }
    )
    yield put(addSpeakerToSessionSuccess(response))
  } catch (error: any) {
    yield put(addSpeakerToSessionFailure(error.response?.data || error))
  }
}

// Remove speaker from session
export function* removeSpeakerFromSession(
  payload: ReturnType<typeof removeSpeakerFromSessionRequest>
): any {
  try {
    put(removeSpeakerFromSessionRequest(payload.payload))
    const response: any = yield call(
      api.delete,
      `event-sessions/${payload.payload.sessionId}/speakers/${payload.payload.speakerId}`
    )
    yield put(removeSpeakerFromSessionSuccess(response))
  } catch (error: any) {
    yield put(removeSpeakerFromSessionFailure(error.response?.data || error))
  }
}

// ==================== ARTIFACTS ====================

// Load artifacts
export function* loadArtifacts(payload: ReturnType<typeof loadArtifactsRequest>) {
  try {
    put(loadArtifactsRequest(payload.payload))
    const response: EventArtifact[] = yield call(
      api.get,
      'event-artifacts/event/' + payload.payload
    )
    yield put(loadArtifactsSuccess(response))
  } catch (error: any) {
    yield put(loadArtifactsFailure(error.response?.data || error))
  }
}

// Load single artifact
export function* loadArtifact(payload: ReturnType<typeof loadArtifactRequest>) {
  try {
    put(loadArtifactRequest(payload.payload))
    const response: EventArtifact = yield call(api.get, 'event-artifacts/' + payload.payload)
    yield put(loadArtifactSuccess(response))
  } catch (error: any) {
    yield put(loadArtifactFailure(error.response?.data || error))
  }
}

// Create artifact
export function* createArtifact(payload: ReturnType<typeof createArtifactRequest>) {
  try {
    put(createArtifactRequest(payload.payload))
    const response: EventArtifact = yield call(api.post, 'event-artifacts', payload.payload)
    yield put(createArtifactSuccess(response))
  } catch (error: any) {
    yield put(createArtifactFailure(error.response?.data || error))
  }
}

// Update artifact
export function* updateArtifact(payload: ReturnType<typeof updateArtifactRequest>) {
  try {
    put(updateArtifactRequest(payload.payload))
    const response: EventArtifact = yield call(
      api.patch,
      'event-artifacts/' + payload.payload.id,
      payload.payload
    )
    yield put(updateArtifactSuccess(response))
  } catch (error: any) {
    yield put(updateArtifactFailure(error.response?.data || error))
  }
}

// Delete artifact
export function* deleteArtifact(payload: ReturnType<typeof deleteArtifactRequest>) {
  try {
    put(deleteArtifactRequest(payload.payload))
    const response: EventArtifact = yield call(api.delete, 'event-artifacts/' + payload.payload)
    yield put(deleteArtifactSuccess(response))
  } catch (error: any) {
    yield put(deleteArtifactFailure(error.response?.data || error))
  }
}
