/**
 * Action types
 */
export enum EventSessionsTypes {
  // Sessions
  LOAD_SESSIONS_REQUEST = '@eventsessions/LOAD_SESSIONS_REQUEST',
  LOAD_SESSIONS_SUCCESS = '@eventsessions/LOAD_SESSIONS_SUCCESS',
  LOAD_SESSIONS_FAILURE = '@eventsessions/LOAD_SESSIONS_FAILURE',

  LOAD_SESSION_REQUEST = '@eventsessions/LOAD_SESSION_REQUEST',
  LOAD_SESSION_SUCCESS = '@eventsessions/LOAD_SESSION_SUCCESS',
  LOAD_SESSION_FAILURE = '@eventsessions/LOAD_SESSION_FAILURE',

  CREATE_SESSION_REQUEST = '@eventsessions/CREATE_SESSION_REQUEST',
  CREATE_SESSION_SUCCESS = '@eventsessions/CREATE_SESSION_SUCCESS',
  CREATE_SESSION_FAILURE = '@eventsessions/CREATE_SESSION_FAILURE',

  UPDATE_SESSION_REQUEST = '@eventsessions/UPDATE_SESSION_REQUEST',
  UPDATE_SESSION_SUCCESS = '@eventsessions/UPDATE_SESSION_SUCCESS',
  UPDATE_SESSION_FAILURE = '@eventsessions/UPDATE_SESSION_FAILURE',

  DELETE_SESSION_REQUEST = '@eventsessions/DELETE_SESSION_REQUEST',
  DELETE_SESSION_SUCCESS = '@eventsessions/DELETE_SESSION_SUCCESS',
  DELETE_SESSION_FAILURE = '@eventsessions/DELETE_SESSION_FAILURE',

  // Speakers
  LOAD_SPEAKERS_REQUEST = '@eventsessions/LOAD_SPEAKERS_REQUEST',
  LOAD_SPEAKERS_SUCCESS = '@eventsessions/LOAD_SPEAKERS_SUCCESS',
  LOAD_SPEAKERS_FAILURE = '@eventsessions/LOAD_SPEAKERS_FAILURE',

  LOAD_SPEAKER_REQUEST = '@eventsessions/LOAD_SPEAKER_REQUEST',
  LOAD_SPEAKER_SUCCESS = '@eventsessions/LOAD_SPEAKER_SUCCESS',
  LOAD_SPEAKER_FAILURE = '@eventsessions/LOAD_SPEAKER_FAILURE',

  CREATE_SPEAKER_REQUEST = '@eventsessions/CREATE_SPEAKER_REQUEST',
  CREATE_SPEAKER_SUCCESS = '@eventsessions/CREATE_SPEAKER_SUCCESS',
  CREATE_SPEAKER_FAILURE = '@eventsessions/CREATE_SPEAKER_FAILURE',

  UPDATE_SPEAKER_REQUEST = '@eventsessions/UPDATE_SPEAKER_REQUEST',
  UPDATE_SPEAKER_SUCCESS = '@eventsessions/UPDATE_SPEAKER_SUCCESS',
  UPDATE_SPEAKER_FAILURE = '@eventsessions/UPDATE_SPEAKER_FAILURE',

  DELETE_SPEAKER_REQUEST = '@eventsessions/DELETE_SPEAKER_REQUEST',
  DELETE_SPEAKER_SUCCESS = '@eventsessions/DELETE_SPEAKER_SUCCESS',
  DELETE_SPEAKER_FAILURE = '@eventsessions/DELETE_SPEAKER_FAILURE',

  // Add speaker to session
  ADD_SPEAKER_TO_SESSION_REQUEST = '@eventsessions/ADD_SPEAKER_TO_SESSION_REQUEST',
  ADD_SPEAKER_TO_SESSION_SUCCESS = '@eventsessions/ADD_SPEAKER_TO_SESSION_SUCCESS',
  ADD_SPEAKER_TO_SESSION_FAILURE = '@eventsessions/ADD_SPEAKER_TO_SESSION_FAILURE',

  REMOVE_SPEAKER_FROM_SESSION_REQUEST = '@eventsessions/REMOVE_SPEAKER_FROM_SESSION_REQUEST',
  REMOVE_SPEAKER_FROM_SESSION_SUCCESS = '@eventsessions/REMOVE_SPEAKER_FROM_SESSION_SUCCESS',
  REMOVE_SPEAKER_FROM_SESSION_FAILURE = '@eventsessions/REMOVE_SPEAKER_FROM_SESSION_FAILURE',

  // Artifacts
  LOAD_ARTIFACTS_REQUEST = '@eventsessions/LOAD_ARTIFACTS_REQUEST',
  LOAD_ARTIFACTS_SUCCESS = '@eventsessions/LOAD_ARTIFACTS_SUCCESS',
  LOAD_ARTIFACTS_FAILURE = '@eventsessions/LOAD_ARTIFACTS_FAILURE',

  LOAD_ARTIFACT_REQUEST = '@eventsessions/LOAD_ARTIFACT_REQUEST',
  LOAD_ARTIFACT_SUCCESS = '@eventsessions/LOAD_ARTIFACT_SUCCESS',
  LOAD_ARTIFACT_FAILURE = '@eventsessions/LOAD_ARTIFACT_FAILURE',

  CREATE_ARTIFACT_REQUEST = '@eventsessions/CREATE_ARTIFACT_REQUEST',
  CREATE_ARTIFACT_SUCCESS = '@eventsessions/CREATE_ARTIFACT_SUCCESS',
  CREATE_ARTIFACT_FAILURE = '@eventsessions/CREATE_ARTIFACT_FAILURE',

  UPDATE_ARTIFACT_REQUEST = '@eventsessions/UPDATE_ARTIFACT_REQUEST',
  UPDATE_ARTIFACT_SUCCESS = '@eventsessions/UPDATE_ARTIFACT_SUCCESS',
  UPDATE_ARTIFACT_FAILURE = '@eventsessions/UPDATE_ARTIFACT_FAILURE',

  DELETE_ARTIFACT_REQUEST = '@eventsessions/DELETE_ARTIFACT_REQUEST',
  DELETE_ARTIFACT_SUCCESS = '@eventsessions/DELETE_ARTIFACT_SUCCESS',
  DELETE_ARTIFACT_FAILURE = '@eventsessions/DELETE_ARTIFACT_FAILURE',
}

/**
 * Data types
 */
export interface EventSession {
  id?: number
  eventId?: number
  title?: string
  description?: string
  sessionType?: 'talk' | 'workshop' | 'panel' | 'networking' | 'break'

  // Horário
  startTime?: string
  endTime?: string
  duration?: number

  // Local
  location?: string
  floor?: string

  // Capacidade
  hasCapacityLimit?: number
  capacity?: number

  // Restrição
  restrictedToTypes?: string[] | null

  // Mídia
  coverImage?: string
  materials?: any

  order?: number
  status?: string

  createdAt?: string
  updatedAt?: string

  // Relations
  speakers?: EventSpeaker[]
}

export interface EventSpeaker {
  id?: number
  eventId?: number
  name?: string
  bio?: string
  image?: string

  // Função
  role?: 'speaker' | 'moderator' | 'panelist' | 'special_guest'
  title?: string
  company?: string

  // Contato
  email?: string
  phone?: string
  socialMedia?: {
    instagram?: string
    linkedin?: string
    twitter?: string
    website?: string
  }

  order?: number
  status?: string

  createdAt?: string
  updatedAt?: string

  // Relations
  sessions?: EventSession[]
}

export interface EventArtifact {
  id?: number
  eventId?: number
  name?: string
  description?: string
  type?: 'hotel' | 'food' | 'transport' | 'leisure' | 'sponsor' | 'partner' | 'other'

  // Mídia
  image?: string
  logo?: string
  gallery?: string[]

  // Contato
  address?: string
  phone?: string
  email?: string
  website?: string

  // Informações
  priceInfo?: string
  discount?: string
  observations?: string

  order?: number
  status?: string

  createdAt?: string
  updatedAt?: string
}

/**
 * State type
 */
export interface EventSessionsState {
  // Sessions
  readonly sessions: EventSession[]
  readonly selectedSession: EventSession | null
  readonly loadingSessions: boolean

  // Speakers
  readonly speakers: EventSpeaker[]
  readonly selectedSpeaker: EventSpeaker | null
  readonly loadingSpeakers: boolean

  // Artifacts
  readonly artifacts: EventArtifact[]
  readonly selectedArtifact: EventArtifact | null
  readonly loadingArtifacts: boolean

  // Global
  readonly error: any
}
