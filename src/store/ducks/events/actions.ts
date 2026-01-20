import {action} from 'typesafe-actions'
import {EventsTypes, Event, EventMetrics} from './types'

// Load all
export const loadEventsRequest = (projectId: number, filters?: {
  status?: string
  startDate?: string
  endDate?: string
}) => action(EventsTypes.LOAD_EVENTS_REQUEST, {projectId, filters})
export const loadEventsSuccess = (data: Event[]) => action(EventsTypes.LOAD_EVENTS_SUCCESS, data)
export const loadEventsFailure = (err: any[]) => action(EventsTypes.LOAD_EVENTS_FAILURE, err)

// Load one
export const loadEventRequest = (id: number) => action(EventsTypes.LOAD_EVENT_REQUEST, id)
export const loadEventSuccess = (data: Event) => action(EventsTypes.LOAD_EVENT_SUCCESS, data)
export const loadEventFailure = (err: any[]) => action(EventsTypes.LOAD_EVENT_FAILURE, err)

// Create
export const createEventRequest = (newEvent: Event) => action(EventsTypes.CREATE_EVENT_REQUEST, newEvent)
export const createEventSuccess = (data: Event) => action(EventsTypes.CREATE_EVENT_SUCCESS, data)
export const createEventFailure = (err: any[]) => action(EventsTypes.CREATE_EVENT_FAILURE, err)

// Update
export const updateEventRequest = (eventToUpdate: Event) =>
  action(EventsTypes.UPDATE_EVENT_REQUEST, eventToUpdate)
export const updateEventSuccess = (data: Event) => action(EventsTypes.UPDATE_EVENT_SUCCESS, data)
export const updateEventFailure = (err: any[]) => action(EventsTypes.UPDATE_EVENT_FAILURE, err)

// Delete
export const deleteEventRequest = (eventId: number) => action(EventsTypes.DELETE_EVENT_REQUEST, eventId)
export const deleteEventSuccess = (data: Event) => action(EventsTypes.DELETE_EVENT_SUCCESS, data)
export const deleteEventFailure = (err: any[]) => action(EventsTypes.DELETE_EVENT_FAILURE, err)

// Metrics
export const loadEventMetricsRequest = (eventId: number) =>
  action(EventsTypes.LOAD_EVENT_METRICS_REQUEST, eventId)
export const loadEventMetricsSuccess = (data: EventMetrics) =>
  action(EventsTypes.LOAD_EVENT_METRICS_SUCCESS, data)
export const loadEventMetricsFailure = (err: any[]) =>
  action(EventsTypes.LOAD_EVENT_METRICS_FAILURE, err)

// Retroactive tickets
export const createRetroactiveTicketsRequest = (eventId: number) =>
  action(EventsTypes.CREATE_RETROACTIVE_TICKETS_REQUEST, eventId)
export const createRetroactiveTicketsSuccess = (data: any) =>
  action(EventsTypes.CREATE_RETROACTIVE_TICKETS_SUCCESS, data)
export const createRetroactiveTicketsFailure = (err: any[]) =>
  action(EventsTypes.CREATE_RETROACTIVE_TICKETS_FAILURE, err)

// Auto-create event for product
export const autoCreateEventForProductRequest = (productId: number, productName: string, productDescription?: string) =>
  action(EventsTypes.AUTO_CREATE_EVENT_FOR_PRODUCT_REQUEST, {productId, productName, productDescription})
export const autoCreateEventForProductSuccess = (data: Event) =>
  action(EventsTypes.AUTO_CREATE_EVENT_FOR_PRODUCT_SUCCESS, data)
export const autoCreateEventForProductFailure = (err: any[]) =>
  action(EventsTypes.AUTO_CREATE_EVENT_FOR_PRODUCT_FAILURE, err)

// Set selected event
export const setSelectedEvent = (event: Event | null) =>
  action(EventsTypes.SET_SELECTED_EVENT, event)
