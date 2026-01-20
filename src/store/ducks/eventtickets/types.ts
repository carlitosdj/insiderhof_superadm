/**
 * Action types
 */
export enum EventTicketsTypes {
  // Load tickets by event
  LOAD_TICKETS_BY_EVENT_REQUEST = '@eventtickets/LOAD_TICKETS_BY_EVENT_REQUEST',
  LOAD_TICKETS_BY_EVENT_SUCCESS = '@eventtickets/LOAD_TICKETS_BY_EVENT_SUCCESS',
  LOAD_TICKETS_BY_EVENT_FAILURE = '@eventtickets/LOAD_TICKETS_BY_EVENT_FAILURE',

  // Load tickets by user
  LOAD_TICKETS_BY_USER_REQUEST = '@eventtickets/LOAD_TICKETS_BY_USER_REQUEST',
  LOAD_TICKETS_BY_USER_SUCCESS = '@eventtickets/LOAD_TICKETS_BY_USER_SUCCESS',
  LOAD_TICKETS_BY_USER_FAILURE = '@eventtickets/LOAD_TICKETS_BY_USER_FAILURE',

  // Load single ticket
  LOAD_TICKET_REQUEST = '@eventtickets/LOAD_TICKET_REQUEST',
  LOAD_TICKET_SUCCESS = '@eventtickets/LOAD_TICKET_SUCCESS',
  LOAD_TICKET_FAILURE = '@eventtickets/LOAD_TICKET_FAILURE',

  // Create ticket
  CREATE_TICKET_REQUEST = '@eventtickets/CREATE_TICKET_REQUEST',
  CREATE_TICKET_SUCCESS = '@eventtickets/CREATE_TICKET_SUCCESS',
  CREATE_TICKET_FAILURE = '@eventtickets/CREATE_TICKET_FAILURE',

  // Update ticket
  UPDATE_TICKET_REQUEST = '@eventtickets/UPDATE_TICKET_REQUEST',
  UPDATE_TICKET_SUCCESS = '@eventtickets/UPDATE_TICKET_SUCCESS',
  UPDATE_TICKET_FAILURE = '@eventtickets/UPDATE_TICKET_FAILURE',

  // Validate ticket
  VALIDATE_TICKET_REQUEST = '@eventtickets/VALIDATE_TICKET_REQUEST',
  VALIDATE_TICKET_SUCCESS = '@eventtickets/VALIDATE_TICKET_SUCCESS',
  VALIDATE_TICKET_FAILURE = '@eventtickets/VALIDATE_TICKET_FAILURE',

  // Transfer ticket
  TRANSFER_TICKET_REQUEST = '@eventtickets/TRANSFER_TICKET_REQUEST',
  TRANSFER_TICKET_SUCCESS = '@eventtickets/TRANSFER_TICKET_SUCCESS',
  TRANSFER_TICKET_FAILURE = '@eventtickets/TRANSFER_TICKET_FAILURE',

  // Load attendance list
  LOAD_ATTENDANCE_LIST_REQUEST = '@eventtickets/LOAD_ATTENDANCE_LIST_REQUEST',
  LOAD_ATTENDANCE_LIST_SUCCESS = '@eventtickets/LOAD_ATTENDANCE_LIST_SUCCESS',
  LOAD_ATTENDANCE_LIST_FAILURE = '@eventtickets/LOAD_ATTENDANCE_LIST_FAILURE',

  // Set selected ticket
  SET_SELECTED_TICKET = '@eventtickets/SET_SELECTED_TICKET',
}

/**
 * Data types
 */
export interface EventTicket {
  id?: number
  eventId?: number
  userId?: number
  originalUserId?: number
  cartId?: number

  // Tipo
  type?: 'vip' | 'normal' | 'student' | 'press' | 'staff' | 'sponsor'

  // Identificação
  ticketCode?: string
  ticketNumber?: number

  // QR Code
  qrCodeData?: string
  qrCodeImage?: string

  // Validação
  requiresValidation?: number
  validationStatus?: 'pending' | 'approved' | 'rejected'
  validationDocument?: string
  validationNotes?: string
  validatedBy?: number
  validatedAt?: string

  // Status
  status?: 'active' | 'pending' | 'cancelled' | 'transferred' | 'used'
  cancelledAt?: string
  cancelReason?: string

  createdAt?: string
  updatedAt?: string

  // Relations
  event?: any
  user?: any
  originalUser?: any
  checkin?: any
  rsvp?: any
  transfers?: any[]
}

export interface AttendanceItem {
  id?: number
  userName?: string
  userEmail?: string
  userWhatsapp?: string
  ticketType?: string
  ticketCode?: string
  checkinAt?: string
  checkinMethod?: string
  status?: 'Presente' | 'Ausente'
}

/**
 * State type
 */
export interface EventTicketsState {
  readonly data: EventTicket[]
  readonly selectedTicket: EventTicket | null
  readonly attendanceList: AttendanceItem[]
  readonly loading: boolean
  readonly loadingTicket: boolean
  readonly loadingAttendance: boolean
  readonly error: any
  readonly count: number
}
