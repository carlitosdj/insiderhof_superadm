import api from './api'

// Get sessions by event
export const getSessions = (eventId: number) => {
  return api.get(`/event-sessions/event/${eventId}`)
}

// Get single session
export const getSession = (id: number) => {
  return api.get(`/event-sessions/${id}`)
}

// Create session
export const createSession = (data: any) => {
  return api.post('/event-sessions', data)
}

// Update session
export const updateSession = (id: number, data: any) => {
  return api.patch(`/event-sessions/${id}`, data)
}

// Delete session
export const deleteSession = (id: number) => {
  return api.delete(`/event-sessions/${id}`)
}

// Add speaker to session
export const addSpeaker = (sessionId: number, data: {speakerId: number; role?: string; order?: number}) => {
  return api.post(`/event-sessions/${sessionId}/speakers`, data)
}

// Remove speaker from session
export const removeSpeaker = (sessionId: number, speakerId: number) => {
  return api.delete(`/event-sessions/${sessionId}/speakers/${speakerId}`)
}
