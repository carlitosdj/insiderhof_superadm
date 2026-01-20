import api from './api'

// Create checkin
export const createCheckin = (data: {
  ticketId: number
  checkinMethod: string
  checkinLocation?: string
  checkinBy?: number
}) => {
  return api.post('/event-checkins', data)
}

// Get checkins by event
export const getCheckins = (eventId: number) => {
  return api.get(`/event-checkins/event/${eventId}`)
}

// Cancel checkin
export const cancelCheckin = (id: number) => {
  return api.delete(`/event-checkins/${id}`)
}
