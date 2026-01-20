import api from './api'

export interface TicketFilters {
  type?: string
  status?: string
  userId?: number
}

// Get tickets by event
export const getTickets = (eventId: number, filters?: TicketFilters) => {
  const params = new URLSearchParams()

  if (filters?.type) {
    params.append('type', filters.type)
  }
  if (filters?.status) {
    params.append('status', filters.status)
  }
  if (filters?.userId) {
    params.append('userId', String(filters.userId))
  }

  const queryString = params.toString()
  const url = `/event-tickets/event/${eventId}${queryString ? `?${queryString}` : ''}`

  return api.get(url)
}

// Get single ticket
export const getTicket = (id: number) => {
  return api.get(`/event-tickets/${id}`)
}

// Get tickets by user
export const getTicketsByUser = (userId: number) => {
  return api.get(`/event-tickets/user/${userId}`)
}

// Create ticket
export const createTicket = (data: any) => {
  return api.post('/event-tickets', data)
}

// Update ticket
export const updateTicket = (id: number, data: any) => {
  return api.patch(`/event-tickets/${id}`, data)
}

// Validate ticket
export const validateTicket = (ticketCode: string) => {
  return api.get(`/event-tickets/validate/${ticketCode}`)
}

// Transfer ticket
export const transferTicket = (data: {ticketId: number; toUserEmail: string; reason?: string}) => {
  return api.post('/event-tickets/transfer', data)
}

// Get attendance list
export const getAttendanceList = (eventId: number) => {
  return api.get(`/event-tickets/attendance/${eventId}`)
}
