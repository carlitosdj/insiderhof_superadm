import {action} from 'typesafe-actions'
import {EventSessionsTypes, EventSession, EventSpeaker, EventArtifact} from './types'

// ==================== SESSIONS ====================

// Load sessions
export const loadSessionsRequest = (eventId: number) =>
  action(EventSessionsTypes.LOAD_SESSIONS_REQUEST, eventId)
export const loadSessionsSuccess = (data: EventSession[]) =>
  action(EventSessionsTypes.LOAD_SESSIONS_SUCCESS, data)
export const loadSessionsFailure = (err: any[]) =>
  action(EventSessionsTypes.LOAD_SESSIONS_FAILURE, err)

// Load single session
export const loadSessionRequest = (id: number) =>
  action(EventSessionsTypes.LOAD_SESSION_REQUEST, id)
export const loadSessionSuccess = (data: EventSession) =>
  action(EventSessionsTypes.LOAD_SESSION_SUCCESS, data)
export const loadSessionFailure = (err: any[]) =>
  action(EventSessionsTypes.LOAD_SESSION_FAILURE, err)

// Create session
export const createSessionRequest = (newSession: EventSession) =>
  action(EventSessionsTypes.CREATE_SESSION_REQUEST, newSession)
export const createSessionSuccess = (data: EventSession) =>
  action(EventSessionsTypes.CREATE_SESSION_SUCCESS, data)
export const createSessionFailure = (err: any[]) =>
  action(EventSessionsTypes.CREATE_SESSION_FAILURE, err)

// Update session
export const updateSessionRequest = (sessionToUpdate: EventSession) =>
  action(EventSessionsTypes.UPDATE_SESSION_REQUEST, sessionToUpdate)
export const updateSessionSuccess = (data: EventSession) =>
  action(EventSessionsTypes.UPDATE_SESSION_SUCCESS, data)
export const updateSessionFailure = (err: any[]) =>
  action(EventSessionsTypes.UPDATE_SESSION_FAILURE, err)

// Delete session
export const deleteSessionRequest = (sessionId: number) =>
  action(EventSessionsTypes.DELETE_SESSION_REQUEST, sessionId)
export const deleteSessionSuccess = (data: EventSession) =>
  action(EventSessionsTypes.DELETE_SESSION_SUCCESS, data)
export const deleteSessionFailure = (err: any[]) =>
  action(EventSessionsTypes.DELETE_SESSION_FAILURE, err)

// ==================== SPEAKERS ====================

// Load speakers
export const loadSpeakersRequest = (eventId: number) =>
  action(EventSessionsTypes.LOAD_SPEAKERS_REQUEST, eventId)
export const loadSpeakersSuccess = (data: EventSpeaker[]) =>
  action(EventSessionsTypes.LOAD_SPEAKERS_SUCCESS, data)
export const loadSpeakersFailure = (err: any[]) =>
  action(EventSessionsTypes.LOAD_SPEAKERS_FAILURE, err)

// Load single speaker
export const loadSpeakerRequest = (id: number) =>
  action(EventSessionsTypes.LOAD_SPEAKER_REQUEST, id)
export const loadSpeakerSuccess = (data: EventSpeaker) =>
  action(EventSessionsTypes.LOAD_SPEAKER_SUCCESS, data)
export const loadSpeakerFailure = (err: any[]) =>
  action(EventSessionsTypes.LOAD_SPEAKER_FAILURE, err)

// Create speaker
export const createSpeakerRequest = (newSpeaker: EventSpeaker) =>
  action(EventSessionsTypes.CREATE_SPEAKER_REQUEST, newSpeaker)
export const createSpeakerSuccess = (data: EventSpeaker) =>
  action(EventSessionsTypes.CREATE_SPEAKER_SUCCESS, data)
export const createSpeakerFailure = (err: any[]) =>
  action(EventSessionsTypes.CREATE_SPEAKER_FAILURE, err)

// Update speaker
export const updateSpeakerRequest = (speakerToUpdate: EventSpeaker) =>
  action(EventSessionsTypes.UPDATE_SPEAKER_REQUEST, speakerToUpdate)
export const updateSpeakerSuccess = (data: EventSpeaker) =>
  action(EventSessionsTypes.UPDATE_SPEAKER_SUCCESS, data)
export const updateSpeakerFailure = (err: any[]) =>
  action(EventSessionsTypes.UPDATE_SPEAKER_FAILURE, err)

// Delete speaker
export const deleteSpeakerRequest = (speakerId: number) =>
  action(EventSessionsTypes.DELETE_SPEAKER_REQUEST, speakerId)
export const deleteSpeakerSuccess = (data: EventSpeaker) =>
  action(EventSessionsTypes.DELETE_SPEAKER_SUCCESS, data)
export const deleteSpeakerFailure = (err: any[]) =>
  action(EventSessionsTypes.DELETE_SPEAKER_FAILURE, err)

// Add speaker to session
export const addSpeakerToSessionRequest = (data: {
  sessionId: number
  speakerId: number
  role?: string
  order?: number
}) => action(EventSessionsTypes.ADD_SPEAKER_TO_SESSION_REQUEST, data)
export const addSpeakerToSessionSuccess = (data: any) =>
  action(EventSessionsTypes.ADD_SPEAKER_TO_SESSION_SUCCESS, data)
export const addSpeakerToSessionFailure = (err: any[]) =>
  action(EventSessionsTypes.ADD_SPEAKER_TO_SESSION_FAILURE, err)

// Remove speaker from session
export const removeSpeakerFromSessionRequest = (data: {sessionId: number; speakerId: number}) =>
  action(EventSessionsTypes.REMOVE_SPEAKER_FROM_SESSION_REQUEST, data)
export const removeSpeakerFromSessionSuccess = (data: any) =>
  action(EventSessionsTypes.REMOVE_SPEAKER_FROM_SESSION_SUCCESS, data)
export const removeSpeakerFromSessionFailure = (err: any[]) =>
  action(EventSessionsTypes.REMOVE_SPEAKER_FROM_SESSION_FAILURE, err)

// ==================== ARTIFACTS ====================

// Load artifacts
export const loadArtifactsRequest = (eventId: number) =>
  action(EventSessionsTypes.LOAD_ARTIFACTS_REQUEST, eventId)
export const loadArtifactsSuccess = (data: EventArtifact[]) =>
  action(EventSessionsTypes.LOAD_ARTIFACTS_SUCCESS, data)
export const loadArtifactsFailure = (err: any[]) =>
  action(EventSessionsTypes.LOAD_ARTIFACTS_FAILURE, err)

// Load single artifact
export const loadArtifactRequest = (id: number) =>
  action(EventSessionsTypes.LOAD_ARTIFACT_REQUEST, id)
export const loadArtifactSuccess = (data: EventArtifact) =>
  action(EventSessionsTypes.LOAD_ARTIFACT_SUCCESS, data)
export const loadArtifactFailure = (err: any[]) =>
  action(EventSessionsTypes.LOAD_ARTIFACT_FAILURE, err)

// Create artifact
export const createArtifactRequest = (newArtifact: EventArtifact) =>
  action(EventSessionsTypes.CREATE_ARTIFACT_REQUEST, newArtifact)
export const createArtifactSuccess = (data: EventArtifact) =>
  action(EventSessionsTypes.CREATE_ARTIFACT_SUCCESS, data)
export const createArtifactFailure = (err: any[]) =>
  action(EventSessionsTypes.CREATE_ARTIFACT_FAILURE, err)

// Update artifact
export const updateArtifactRequest = (artifactToUpdate: EventArtifact) =>
  action(EventSessionsTypes.UPDATE_ARTIFACT_REQUEST, artifactToUpdate)
export const updateArtifactSuccess = (data: EventArtifact) =>
  action(EventSessionsTypes.UPDATE_ARTIFACT_SUCCESS, data)
export const updateArtifactFailure = (err: any[]) =>
  action(EventSessionsTypes.UPDATE_ARTIFACT_FAILURE, err)

// Delete artifact
export const deleteArtifactRequest = (artifactId: number) =>
  action(EventSessionsTypes.DELETE_ARTIFACT_REQUEST, artifactId)
export const deleteArtifactSuccess = (data: EventArtifact) =>
  action(EventSessionsTypes.DELETE_ARTIFACT_SUCCESS, data)
export const deleteArtifactFailure = (err: any[]) =>
  action(EventSessionsTypes.DELETE_ARTIFACT_FAILURE, err)
