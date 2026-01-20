import {action} from 'typesafe-actions'
import {EventRsvpsTypes, EventRsvp, RsvpPayload} from './types'

// Confirm RSVP
export const confirmRsvpRequest = (payload: RsvpPayload) =>
  action(EventRsvpsTypes.CONFIRM_RSVP_REQUEST, payload)
export const confirmRsvpSuccess = (data: EventRsvp) =>
  action(EventRsvpsTypes.CONFIRM_RSVP_SUCCESS, data)
export const confirmRsvpFailure = (err: any[]) =>
  action(EventRsvpsTypes.CONFIRM_RSVP_FAILURE, err)

// Load RSVPs by event
export const loadRsvpsByEventRequest = (eventId: number) =>
  action(EventRsvpsTypes.LOAD_RSVPS_BY_EVENT_REQUEST, eventId)
export const loadRsvpsByEventSuccess = (data: EventRsvp[]) =>
  action(EventRsvpsTypes.LOAD_RSVPS_BY_EVENT_SUCCESS, data)
export const loadRsvpsByEventFailure = (err: any[]) =>
  action(EventRsvpsTypes.LOAD_RSVPS_BY_EVENT_FAILURE, err)

// Load RSVP by ticket
export const loadRsvpByTicketRequest = (ticketId: number) =>
  action(EventRsvpsTypes.LOAD_RSVP_BY_TICKET_REQUEST, ticketId)
export const loadRsvpByTicketSuccess = (data: EventRsvp) =>
  action(EventRsvpsTypes.LOAD_RSVP_BY_TICKET_SUCCESS, data)
export const loadRsvpByTicketFailure = (err: any[]) =>
  action(EventRsvpsTypes.LOAD_RSVP_BY_TICKET_FAILURE, err)
