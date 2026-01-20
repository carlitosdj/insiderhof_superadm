import api from './api'

// Get artifacts by event
export const getArtifacts = (eventId: number) => {
  return api.get(`/event-artifacts/event/${eventId}`)
}

// Get single artifact
export const getArtifact = (id: number) => {
  return api.get(`/event-artifacts/${id}`)
}

// Create artifact
export const createArtifact = (data: any) => {
  return api.post('/event-artifacts', data)
}

// Update artifact
export const updateArtifact = (id: number, data: any) => {
  return api.patch(`/event-artifacts/${id}`, data)
}

// Delete artifact
export const deleteArtifact = (id: number) => {
  return api.delete(`/event-artifacts/${id}`)
}
