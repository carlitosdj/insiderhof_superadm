/**
 * Action types
 */
export enum EventsTypes {
  // Load all
  LOAD_EVENTS_REQUEST = '@events/LOAD_EVENTS_REQUEST',
  LOAD_EVENTS_SUCCESS = '@events/LOAD_EVENTS_SUCCESS',
  LOAD_EVENTS_FAILURE = '@events/LOAD_EVENTS_FAILURE',

  // Load one
  LOAD_EVENT_REQUEST = '@events/LOAD_EVENT_REQUEST',
  LOAD_EVENT_SUCCESS = '@events/LOAD_EVENT_SUCCESS',
  LOAD_EVENT_FAILURE = '@events/LOAD_EVENT_FAILURE',

  // Create
  CREATE_EVENT_REQUEST = '@events/CREATE_EVENT_REQUEST',
  CREATE_EVENT_SUCCESS = '@events/CREATE_EVENT_SUCCESS',
  CREATE_EVENT_FAILURE = '@events/CREATE_EVENT_FAILURE',

  // Update
  UPDATE_EVENT_REQUEST = '@events/UPDATE_EVENT_REQUEST',
  UPDATE_EVENT_SUCCESS = '@events/UPDATE_EVENT_SUCCESS',
  UPDATE_EVENT_FAILURE = '@events/UPDATE_EVENT_FAILURE',

  // Delete
  DELETE_EVENT_REQUEST = '@events/DELETE_EVENT_REQUEST',
  DELETE_EVENT_SUCCESS = '@events/DELETE_EVENT_SUCCESS',
  DELETE_EVENT_FAILURE = '@events/DELETE_EVENT_FAILURE',

  // Metrics
  LOAD_EVENT_METRICS_REQUEST = '@events/LOAD_EVENT_METRICS_REQUEST',
  LOAD_EVENT_METRICS_SUCCESS = '@events/LOAD_EVENT_METRICS_SUCCESS',
  LOAD_EVENT_METRICS_FAILURE = '@events/LOAD_EVENT_METRICS_FAILURE',

  // Retroactive tickets
  CREATE_RETROACTIVE_TICKETS_REQUEST = '@events/CREATE_RETROACTIVE_TICKETS_REQUEST',
  CREATE_RETROACTIVE_TICKETS_SUCCESS = '@events/CREATE_RETROACTIVE_TICKETS_SUCCESS',
  CREATE_RETROACTIVE_TICKETS_FAILURE = '@events/CREATE_RETROACTIVE_TICKETS_FAILURE',

  // Auto-create event for product
  AUTO_CREATE_EVENT_FOR_PRODUCT_REQUEST = '@events/AUTO_CREATE_EVENT_FOR_PRODUCT_REQUEST',
  AUTO_CREATE_EVENT_FOR_PRODUCT_SUCCESS = '@events/AUTO_CREATE_EVENT_FOR_PRODUCT_SUCCESS',
  AUTO_CREATE_EVENT_FOR_PRODUCT_FAILURE = '@events/AUTO_CREATE_EVENT_FOR_PRODUCT_FAILURE',

  // Set selected event
  SET_SELECTED_EVENT = '@events/SET_SELECTED_EVENT',
}

/**
 * Data types
 */
export interface Event {
  id?: number
  productId?: number
  name?: string
  description?: string
  slug?: string

  // Localização
  location?: string
  address?: string
  addressNumber?: string
  addressDistrict?: string
  addressComplement?: string
  postalCode?: string
  cityId?: number
  stateId?: number
  coordinates?: {lat: number; lng: number} | null

  // Datas
  startDate?: string
  endDate?: string
  registrationDeadline?: string

  // Capacidade
  capacity?: number
  enableWaitingList?: number

  // Check-in Settings
  allowSelfCheckin?: number
  checkinStartsAt?: string
  checkinEndsAt?: string

  // RSVP Settings
  enableRsvp?: number
  rsvpDeadline?: string

  // Transferência
  allowTicketTransfer?: number
  transferDeadline?: string

  // Mídia
  eventImage?: string
  bannerImage?: string

  // Contato
  contactEmail?: string
  contactPhone?: string
  contactWhatsapp?: string

  // Informações
  observations?: string
  instructions?: string

  // Controle
  status?: 'draft' | 'open' | 'full' | 'closed' | 'in_progress' | 'finished' | 'cancelled'

  createdAt?: string
  updatedAt?: string
  projectId?: number
  ownerId?: number

  // Relations (quando fizer include)
  sessions?: any[]
  speakers?: any[]
  artifacts?: any[]
  tickets?: any[]
}

export interface EventMetrics {
  capacity: number
  totalTickets: number
  remainingSpots: number
  occupancyRate: number
  totalCheckins: number
  checkinRate: number
  pendingCheckins: number
  ticketsByType: {
    vip: number
    normal: number
    student: number
    press: number
    staff: number
    sponsor: number
  }
  checkinsByType: {
    vip: number
    normal: number
    student: number
    press: number
    staff: number
    sponsor: number
  }
  totalTransfers: number
  // RSVP metrics
  totalRsvps?: number
  confirmedRsvps?: number
  declinedRsvps?: number
  pendingRsvps?: number
  rsvpRate?: number
  noShows?: number
}

/**
 * State type
 */
export interface EventsState {
  readonly data: Event[]
  readonly selectedEvent: Event | null
  readonly metrics: EventMetrics | null
  readonly loading: boolean
  readonly loadingEvent: boolean
  readonly loadingMetrics: boolean
  readonly error: any
  readonly count: number
}
