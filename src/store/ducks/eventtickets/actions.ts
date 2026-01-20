import {action} from 'typesafe-actions'
import {EventTicketsTypes, EventTicket, AttendanceItem} from './types'

// Load tickets by event
export const loadTicketsByEventRequest = (
  eventId: number,
  filters?: {type?: string; status?: string; userId?: number}
) => action(EventTicketsTypes.LOAD_TICKETS_BY_EVENT_REQUEST, {eventId, filters})
export const loadTicketsByEventSuccess = (data: EventTicket[]) =>
  action(EventTicketsTypes.LOAD_TICKETS_BY_EVENT_SUCCESS, data)
export const loadTicketsByEventFailure = (err: any[]) =>
  action(EventTicketsTypes.LOAD_TICKETS_BY_EVENT_FAILURE, err)

// Load tickets by user
export const loadTicketsByUserRequest = (userId: number) =>
  action(EventTicketsTypes.LOAD_TICKETS_BY_USER_REQUEST, userId)
export const loadTicketsByUserSuccess = (data: EventTicket[]) =>
  action(EventTicketsTypes.LOAD_TICKETS_BY_USER_SUCCESS, data)
export const loadTicketsByUserFailure = (err: any[]) =>
  action(EventTicketsTypes.LOAD_TICKETS_BY_USER_FAILURE, err)

// Load single ticket
export const loadTicketRequest = (id: number) =>
  action(EventTicketsTypes.LOAD_TICKET_REQUEST, id)
export const loadTicketSuccess = (data: EventTicket) =>
  action(EventTicketsTypes.LOAD_TICKET_SUCCESS, data)
export const loadTicketFailure = (err: any[]) =>
  action(EventTicketsTypes.LOAD_TICKET_FAILURE, err)

// Create ticket
export const createTicketRequest = (newTicket: EventTicket) =>
  action(EventTicketsTypes.CREATE_TICKET_REQUEST, newTicket)
export const createTicketSuccess = (data: EventTicket) =>
  action(EventTicketsTypes.CREATE_TICKET_SUCCESS, data)
export const createTicketFailure = (err: any[]) =>
  action(EventTicketsTypes.CREATE_TICKET_FAILURE, err)

// Update ticket
export const updateTicketRequest = (ticketToUpdate: EventTicket) =>
  action(EventTicketsTypes.UPDATE_TICKET_REQUEST, ticketToUpdate)
export const updateTicketSuccess = (data: EventTicket) =>
  action(EventTicketsTypes.UPDATE_TICKET_SUCCESS, data)
export const updateTicketFailure = (err: any[]) =>
  action(EventTicketsTypes.UPDATE_TICKET_FAILURE, err)

// Validate ticket
export const validateTicketRequest = (ticketCode: string) =>
  action(EventTicketsTypes.VALIDATE_TICKET_REQUEST, ticketCode)
export const validateTicketSuccess = (data: EventTicket) =>
  action(EventTicketsTypes.VALIDATE_TICKET_SUCCESS, data)
export const validateTicketFailure = (err: any[]) =>
  action(EventTicketsTypes.VALIDATE_TICKET_FAILURE, err)

// Transfer ticket
export const transferTicketRequest = (data: {ticketId: number; toUserEmail: string; reason?: string}) =>
  action(EventTicketsTypes.TRANSFER_TICKET_REQUEST, data)
export const transferTicketSuccess = (data: any) =>
  action(EventTicketsTypes.TRANSFER_TICKET_SUCCESS, data)
export const transferTicketFailure = (err: any[]) =>
  action(EventTicketsTypes.TRANSFER_TICKET_FAILURE, err)

// Load attendance list
export const loadAttendanceListRequest = (eventId: number) =>
  action(EventTicketsTypes.LOAD_ATTENDANCE_LIST_REQUEST, eventId)
export const loadAttendanceListSuccess = (data: AttendanceItem[]) =>
  action(EventTicketsTypes.LOAD_ATTENDANCE_LIST_SUCCESS, data)
export const loadAttendanceListFailure = (err: any[]) =>
  action(EventTicketsTypes.LOAD_ATTENDANCE_LIST_FAILURE, err)

// Set selected ticket
export const setSelectedTicket = (ticket: EventTicket | null) =>
  action(EventTicketsTypes.SET_SELECTED_TICKET, ticket)
