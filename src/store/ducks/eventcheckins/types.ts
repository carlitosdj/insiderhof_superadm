/**
 * Action types
 */
export enum EventCheckinsTypes {
  // Create checkin
  CREATE_CHECKIN_REQUEST = '@eventcheckins/CREATE_CHECKIN_REQUEST',
  CREATE_CHECKIN_SUCCESS = '@eventcheckins/CREATE_CHECKIN_SUCCESS',
  CREATE_CHECKIN_FAILURE = '@eventcheckins/CREATE_CHECKIN_FAILURE',

  // Load checkins by event
  LOAD_CHECKINS_BY_EVENT_REQUEST = '@eventcheckins/LOAD_CHECKINS_BY_EVENT_REQUEST',
  LOAD_CHECKINS_BY_EVENT_SUCCESS = '@eventcheckins/LOAD_CHECKINS_BY_EVENT_SUCCESS',
  LOAD_CHECKINS_BY_EVENT_FAILURE = '@eventcheckins/LOAD_CHECKINS_BY_EVENT_FAILURE',

  // Cancel checkin
  CANCEL_CHECKIN_REQUEST = '@eventcheckins/CANCEL_CHECKIN_REQUEST',
  CANCEL_CHECKIN_SUCCESS = '@eventcheckins/CANCEL_CHECKIN_SUCCESS',
  CANCEL_CHECKIN_FAILURE = '@eventcheckins/CANCEL_CHECKIN_FAILURE',
}

/**
 * Data types
 */
export interface EventCheckin {
  id?: number
  eventId?: number
  ticketId?: number
  userId?: number

  // Check-in info
  checkinMethod?: 'qrcode' | 'manual' | 'self' | 'app'
  checkinAt?: string
  checkinLocation?: string
  ipAddress?: string
  deviceInfo?: {
    device?: string
    browser?: string
    os?: string
    userAgent?: string
  }

  // Who performed the check-in (for manual check-ins)
  checkinBy?: number

  createdAt?: string
  updatedAt?: string

  // Relations
  event?: any
  ticket?: any
  user?: any
  checkinByUser?: any
}

export interface CheckinPayload {
  ticketId: number
  checkinMethod: string
  checkinLocation?: string
  ipAddress?: string
  deviceInfo?: any
  checkinBy?: number
}

/**
 * State type
 */
export interface EventCheckinsState {
  readonly data: EventCheckin[]
  readonly loading: boolean
  readonly error: any
  readonly count: number
}
