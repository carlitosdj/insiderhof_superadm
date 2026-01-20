import api from './api'

// Confirm RSVP
export const confirmRsvp = (data: {
  ticketId: number
  status: 'confirmed' | 'declined'
  notes?: string
  ipAddress?: string
  deviceInfo?: any
}) => {
  return api.post('/event-rsvps', data)
}

// Get RSVPs by event
export const getRsvpsByEvent = (eventId: number) => {
  return api.get(`/event-rsvps/event/${eventId}`)
}

// Get RSVP by ticket
export const getRsvpByTicket = (ticketId: number) => {
  return api.get(`/event-rsvps/ticket/${ticketId}`)
}
