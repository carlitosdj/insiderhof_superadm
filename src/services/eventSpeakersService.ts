import api from './api'

// Get speakers by event
export const getSpeakers = (eventId: number) => {
  return api.get(`/event-speakers/event/${eventId}`)
}

// Get single speaker
export const getSpeaker = (id: number) => {
  return api.get(`/event-speakers/${id}`)
}

// Create speaker
export const createSpeaker = (data: any) => {
  return api.post('/event-speakers', data)
}

// Update speaker
export const updateSpeaker = (id: number, data: any) => {
  return api.patch(`/event-speakers/${id}`, data)
}

// Delete speaker
export const deleteSpeaker = (id: number) => {
  return api.delete(`/event-speakers/${id}`)
}
