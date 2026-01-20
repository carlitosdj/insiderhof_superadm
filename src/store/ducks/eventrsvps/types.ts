/**
 * Action types
 */
export enum EventRsvpsTypes {
  // Confirm RSVP
  CONFIRM_RSVP_REQUEST = '@eventrsvps/CONFIRM_RSVP_REQUEST',
  CONFIRM_RSVP_SUCCESS = '@eventrsvps/CONFIRM_RSVP_SUCCESS',
  CONFIRM_RSVP_FAILURE = '@eventrsvps/CONFIRM_RSVP_FAILURE',

  // Load RSVPs by event
  LOAD_RSVPS_BY_EVENT_REQUEST = '@eventrsvps/LOAD_RSVPS_BY_EVENT_REQUEST',
  LOAD_RSVPS_BY_EVENT_SUCCESS = '@eventrsvps/LOAD_RSVPS_BY_EVENT_SUCCESS',
  LOAD_RSVPS_BY_EVENT_FAILURE = '@eventrsvps/LOAD_RSVPS_BY_EVENT_FAILURE',

  // Load RSVP by ticket
  LOAD_RSVP_BY_TICKET_REQUEST = '@eventrsvps/LOAD_RSVP_BY_TICKET_REQUEST',
  LOAD_RSVP_BY_TICKET_SUCCESS = '@eventrsvps/LOAD_RSVP_BY_TICKET_SUCCESS',
  LOAD_RSVP_BY_TICKET_FAILURE = '@eventrsvps/LOAD_RSVP_BY_TICKET_FAILURE',
}

/**
 * Data types
 */
export interface EventRsvp {
  id?: number
  eventId?: number
  ticketId?: number
  userId?: number

  // RSVP info
  status: 'confirmed' | 'declined'
  confirmedAt?: string
  notes?: string
  ipAddress?: string
  deviceInfo?: {
    device?: string
    browser?: string
    os?: string
    userAgent?: string
  }

  createdAt?: string
  updatedAt?: string

  // Relations
  event?: any
  ticket?: any
  user?: any
}

export interface RsvpPayload {
  ticketId: number
  status: 'confirmed' | 'declined'
  notes?: string
  ipAddress?: string
  deviceInfo?: any
}

/**
 * State type
 */
export interface EventRsvpsState {
  readonly data: EventRsvp[]
  readonly loading: boolean
  readonly error: any
  readonly count: number
}
