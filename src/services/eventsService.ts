import api from './api'

export interface EventFilters {
  projectId: number
  status?: string
  startDate?: string
  endDate?: string
}

// Get all events
export const getEvents = (filters: EventFilters) => {
  const params = new URLSearchParams()
  params.append('projectId', String(filters.projectId))

  if (filters.status) {
    params.append('status', filters.status)
  }
  if (filters.startDate) {
    params.append('startDate', filters.startDate)
  }
  if (filters.endDate) {
    params.append('endDate', filters.endDate)
  }

  return api.get(`/events?${params.toString()}`)
}

// Get single event
export const getEvent = (id: number) => {
  return api.get(`/events/${id}`)
}

// Create event
export const createEvent = (data: any) => {
  return api.post('/events', data)
}

// Update event
export const updateEvent = (id: number, data: any) => {
  return api.patch(`/events/${id}`, data)
}

// Delete event
export const deleteEvent = (id: number) => {
  return api.delete(`/events/${id}`)
}

// Get event metrics
export const getEventMetrics = (id: number) => {
  return api.get(`/events/${id}/metrics`)
}

// Create retroactive tickets
export const createRetroactiveTickets = (eventId: number) => {
  return api.post(`/events/${eventId}/retroactive-tickets`)
}
