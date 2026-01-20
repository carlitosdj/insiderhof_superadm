import {Reducer} from 'redux'
import {EventSessionsState, EventSessionsTypes} from './types'

const INITIAL_STATE: EventSessionsState = {
  // Sessions
  sessions: [],
  selectedSession: null,
  loadingSessions: false,

  // Speakers
  speakers: [],
  selectedSpeaker: null,
  loadingSpeakers: false,

  // Artifacts
  artifacts: [],
  selectedArtifact: null,
  loadingArtifacts: false,

  // Global
  error: false,
}

const reducer: Reducer<EventSessionsState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    // ==================== SESSIONS ====================

    // Load sessions
    case EventSessionsTypes.LOAD_SESSIONS_REQUEST:
      return {...state, loadingSessions: true, sessions: []}
    case EventSessionsTypes.LOAD_SESSIONS_SUCCESS:
      return {
        ...state,
        loadingSessions: false,
        error: false,
        sessions: action.payload.data || action.payload,
      }
    case EventSessionsTypes.LOAD_SESSIONS_FAILURE:
      return {...state, loadingSessions: false, error: action.payload, sessions: []}

    // Load single session
    case EventSessionsTypes.LOAD_SESSION_REQUEST:
      return {...state, loadingSessions: true, selectedSession: null}
    case EventSessionsTypes.LOAD_SESSION_SUCCESS:
      return {
        ...state,
        loadingSessions: false,
        error: false,
        selectedSession: action.payload.data || action.payload,
      }
    case EventSessionsTypes.LOAD_SESSION_FAILURE:
      return {...state, loadingSessions: false, error: action.payload, selectedSession: null}

    // Create session
    case EventSessionsTypes.CREATE_SESSION_REQUEST:
      return {...state}
    case EventSessionsTypes.CREATE_SESSION_SUCCESS:
      return {
        ...state,
        loadingSessions: false,
        error: false,
        sessions: [action.payload.data || action.payload, ...state.sessions],
      }
    case EventSessionsTypes.CREATE_SESSION_FAILURE:
      return {...state, loadingSessions: false, error: action.payload}

    // Update session
    case EventSessionsTypes.UPDATE_SESSION_REQUEST:
      return {...state}
    case EventSessionsTypes.UPDATE_SESSION_SUCCESS:
      return {
        ...state,
        loadingSessions: false,
        error: false,
        sessions: state.sessions?.map((child) =>
          child.id === (action.payload.data?.id || action.payload.id)
            ? action.payload.data || action.payload
            : child
        ),
        selectedSession:
          state.selectedSession?.id === (action.payload.data?.id || action.payload.id)
            ? action.payload.data || action.payload
            : state.selectedSession,
      }
    case EventSessionsTypes.UPDATE_SESSION_FAILURE:
      return {...state, loadingSessions: false, error: action.payload}

    // Delete session
    case EventSessionsTypes.DELETE_SESSION_REQUEST:
      return {...state}
    case EventSessionsTypes.DELETE_SESSION_SUCCESS:
      return {
        ...state,
        loadingSessions: false,
        error: false,
        sessions: state.sessions?.filter(
          (item) => item.id !== (action.payload.data?.id || action.payload.id)
        ),
      }
    case EventSessionsTypes.DELETE_SESSION_FAILURE:
      return {...state, loadingSessions: false, error: action.payload}

    // ==================== SPEAKERS ====================

    // Load speakers
    case EventSessionsTypes.LOAD_SPEAKERS_REQUEST:
      return {...state, loadingSpeakers: true, speakers: []}
    case EventSessionsTypes.LOAD_SPEAKERS_SUCCESS:
      return {
        ...state,
        loadingSpeakers: false,
        error: false,
        speakers: action.payload.data || action.payload,
      }
    case EventSessionsTypes.LOAD_SPEAKERS_FAILURE:
      return {...state, loadingSpeakers: false, error: action.payload, speakers: []}

    // Load single speaker
    case EventSessionsTypes.LOAD_SPEAKER_REQUEST:
      return {...state, loadingSpeakers: true, selectedSpeaker: null}
    case EventSessionsTypes.LOAD_SPEAKER_SUCCESS:
      return {
        ...state,
        loadingSpeakers: false,
        error: false,
        selectedSpeaker: action.payload.data || action.payload,
      }
    case EventSessionsTypes.LOAD_SPEAKER_FAILURE:
      return {...state, loadingSpeakers: false, error: action.payload, selectedSpeaker: null}

    // Create speaker
    case EventSessionsTypes.CREATE_SPEAKER_REQUEST:
      return {...state}
    case EventSessionsTypes.CREATE_SPEAKER_SUCCESS:
      return {
        ...state,
        loadingSpeakers: false,
        error: false,
        speakers: [action.payload.data || action.payload, ...state.speakers],
      }
    case EventSessionsTypes.CREATE_SPEAKER_FAILURE:
      return {...state, loadingSpeakers: false, error: action.payload}

    // Update speaker
    case EventSessionsTypes.UPDATE_SPEAKER_REQUEST:
      return {...state}
    case EventSessionsTypes.UPDATE_SPEAKER_SUCCESS:
      return {
        ...state,
        loadingSpeakers: false,
        error: false,
        speakers: state.speakers?.map((child) =>
          child.id === (action.payload.data?.id || action.payload.id)
            ? action.payload.data || action.payload
            : child
        ),
        selectedSpeaker:
          state.selectedSpeaker?.id === (action.payload.data?.id || action.payload.id)
            ? action.payload.data || action.payload
            : state.selectedSpeaker,
      }
    case EventSessionsTypes.UPDATE_SPEAKER_FAILURE:
      return {...state, loadingSpeakers: false, error: action.payload}

    // Delete speaker
    case EventSessionsTypes.DELETE_SPEAKER_REQUEST:
      return {...state}
    case EventSessionsTypes.DELETE_SPEAKER_SUCCESS:
      return {
        ...state,
        loadingSpeakers: false,
        error: false,
        speakers: state.speakers?.filter(
          (item) => item.id !== (action.payload.data?.id || action.payload.id)
        ),
      }
    case EventSessionsTypes.DELETE_SPEAKER_FAILURE:
      return {...state, loadingSpeakers: false, error: action.payload}

    // Add/Remove speaker to/from session
    case EventSessionsTypes.ADD_SPEAKER_TO_SESSION_REQUEST:
      return {...state}
    case EventSessionsTypes.ADD_SPEAKER_TO_SESSION_SUCCESS:
      return {...state, error: false}
    case EventSessionsTypes.ADD_SPEAKER_TO_SESSION_FAILURE:
      return {...state, error: action.payload}

    case EventSessionsTypes.REMOVE_SPEAKER_FROM_SESSION_REQUEST:
      return {...state}
    case EventSessionsTypes.REMOVE_SPEAKER_FROM_SESSION_SUCCESS:
      return {...state, error: false}
    case EventSessionsTypes.REMOVE_SPEAKER_FROM_SESSION_FAILURE:
      return {...state, error: action.payload}

    // ==================== ARTIFACTS ====================

    // Load artifacts
    case EventSessionsTypes.LOAD_ARTIFACTS_REQUEST:
      return {...state, loadingArtifacts: true, artifacts: []}
    case EventSessionsTypes.LOAD_ARTIFACTS_SUCCESS:
      return {
        ...state,
        loadingArtifacts: false,
        error: false,
        artifacts: action.payload.data || action.payload,
      }
    case EventSessionsTypes.LOAD_ARTIFACTS_FAILURE:
      return {...state, loadingArtifacts: false, error: action.payload, artifacts: []}

    // Load single artifact
    case EventSessionsTypes.LOAD_ARTIFACT_REQUEST:
      return {...state, loadingArtifacts: true, selectedArtifact: null}
    case EventSessionsTypes.LOAD_ARTIFACT_SUCCESS:
      return {
        ...state,
        loadingArtifacts: false,
        error: false,
        selectedArtifact: action.payload.data || action.payload,
      }
    case EventSessionsTypes.LOAD_ARTIFACT_FAILURE:
      return {...state, loadingArtifacts: false, error: action.payload, selectedArtifact: null}

    // Create artifact
    case EventSessionsTypes.CREATE_ARTIFACT_REQUEST:
      return {...state}
    case EventSessionsTypes.CREATE_ARTIFACT_SUCCESS:
      return {
        ...state,
        loadingArtifacts: false,
        error: false,
        artifacts: [action.payload.data || action.payload, ...state.artifacts],
      }
    case EventSessionsTypes.CREATE_ARTIFACT_FAILURE:
      return {...state, loadingArtifacts: false, error: action.payload}

    // Update artifact
    case EventSessionsTypes.UPDATE_ARTIFACT_REQUEST:
      return {...state}
    case EventSessionsTypes.UPDATE_ARTIFACT_SUCCESS:
      return {
        ...state,
        loadingArtifacts: false,
        error: false,
        artifacts: state.artifacts?.map((child) =>
          child.id === (action.payload.data?.id || action.payload.id)
            ? action.payload.data || action.payload
            : child
        ),
        selectedArtifact:
          state.selectedArtifact?.id === (action.payload.data?.id || action.payload.id)
            ? action.payload.data || action.payload
            : state.selectedArtifact,
      }
    case EventSessionsTypes.UPDATE_ARTIFACT_FAILURE:
      return {...state, loadingArtifacts: false, error: action.payload}

    // Delete artifact
    case EventSessionsTypes.DELETE_ARTIFACT_REQUEST:
      return {...state}
    case EventSessionsTypes.DELETE_ARTIFACT_SUCCESS:
      return {
        ...state,
        loadingArtifacts: false,
        error: false,
        artifacts: state.artifacts?.filter(
          (item) => item.id !== (action.payload.data?.id || action.payload.id)
        ),
      }
    case EventSessionsTypes.DELETE_ARTIFACT_FAILURE:
      return {...state, loadingArtifacts: false, error: action.payload}

    default:
      return state
  }
}

export default reducer
