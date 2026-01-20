import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadEventsRequest,
  loadEventsSuccess,
  loadEventsFailure,
  loadEventRequest,
  loadEventSuccess,
  loadEventFailure,
  createEventRequest,
  createEventSuccess,
  createEventFailure,
  updateEventRequest,
  updateEventSuccess,
  updateEventFailure,
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFailure,
  loadEventMetricsRequest,
  loadEventMetricsSuccess,
  loadEventMetricsFailure,
  createRetroactiveTicketsRequest,
  createRetroactiveTicketsSuccess,
  createRetroactiveTicketsFailure,
  autoCreateEventForProductRequest,
  autoCreateEventForProductSuccess,
  autoCreateEventForProductFailure,
} from './actions'

import {Event, EventMetrics} from './types'

// Load all events
export function* loadEvents(payload: ReturnType<typeof loadEventsRequest>) {
  try {
    put(loadEventsRequest(payload.payload.projectId, payload.payload.filters))

    // Construir query params
    const params = new URLSearchParams()
    params.append('projectId', String(payload.payload.projectId))

    if (payload.payload.filters?.status) {
      params.append('status', payload.payload.filters.status)
    }
    if (payload.payload.filters?.startDate) {
      params.append('startDate', payload.payload.filters.startDate)
    }
    if (payload.payload.filters?.endDate) {
      params.append('endDate', payload.payload.filters.endDate)
    }

    const response: Event[] = yield call(api.get, `events?${params.toString()}`)
    yield put(loadEventsSuccess(response))
  } catch (error: any) {
    yield put(loadEventsFailure(error.response?.data || error))
  }
}

// Load single event
export function* loadEvent(payload: ReturnType<typeof loadEventRequest>) {
  try {
    put(loadEventRequest(payload.payload))
    const response: Event = yield call(api.get, 'events/' + payload.payload)
    yield put(loadEventSuccess(response))
  } catch (error: any) {
    yield put(loadEventFailure(error.response?.data || error))
  }
}

// Create
export function* createEvent(payload: ReturnType<typeof createEventRequest>) {
  try {
    put(createEventRequest(payload.payload))
    const response: Event = yield call(api.post, 'events', payload.payload)
    yield put(createEventSuccess(response))
  } catch (error: any) {
    yield put(createEventFailure(error.response?.data || error))
  }
}

// Update
export function* updateEvent(payload: ReturnType<typeof updateEventRequest>) {
  try {
    put(updateEventRequest(payload.payload))
    const response: Event = yield call(api.patch, 'events/' + payload.payload.id, payload.payload)
    yield put(updateEventSuccess(response))
  } catch (error: any) {
    yield put(updateEventFailure(error.response?.data || error))
  }
}

// Delete
export function* deleteEvent(payload: ReturnType<typeof deleteEventRequest>) {
  try {
    put(deleteEventRequest(payload.payload))
    const response: Event = yield call(api.delete, 'events/' + payload.payload)
    yield put(deleteEventSuccess(response))
  } catch (error: any) {
    yield put(deleteEventFailure(error.response?.data || error))
  }
}

// Load metrics
export function* loadEventMetrics(payload: ReturnType<typeof loadEventMetricsRequest>) {
  try {
    put(loadEventMetricsRequest(payload.payload))
    const response: EventMetrics = yield call(api.get, 'events/' + payload.payload + '/metrics')
    yield put(loadEventMetricsSuccess(response))
  } catch (error: any) {
    yield put(loadEventMetricsFailure(error.response?.data || error))
  }
}

// Create retroactive tickets
export function* createRetroactiveTickets(
  payload: ReturnType<typeof createRetroactiveTicketsRequest>
): any {
  try {
    put(createRetroactiveTicketsRequest(payload.payload))
    const response: any = yield call(
      api.post,
      'events/' + payload.payload + '/retroactive-tickets'
    )
    yield put(createRetroactiveTicketsSuccess(response))
  } catch (error: any) {
    yield put(createRetroactiveTicketsFailure(error.response?.data || error))
  }
}

// Auto-create event for product
export function* autoCreateEventForProduct(
  payload: ReturnType<typeof autoCreateEventForProductRequest>
): any {
  try {
    const {productId, productName, productDescription} = payload.payload

    // 1. Get the product to obtain projectId
    const productResponse: any = yield call(api.get, `product/${productId}`)

    // Handle both wrapped and unwrapped responses
    const product = productResponse.data || productResponse

    if (!product || !product.id) {
      yield put(autoCreateEventForProductFailure(['Produto não encontrado']))
      return
    }

    // 2. Check if event already exists for this product
    const checkResponse: any = yield call(
      api.get,
      `events/by-product/${productId}`
    )

    // Check if event exists (response has id or is not empty)
    if (checkResponse && checkResponse.id) {
      yield put(autoCreateEventForProductFailure(['Evento já existe para este produto']))
      return
    }

    // 3. Generate slug from product name
    const generateSlug = (text: string): string => {
      return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
        .replace(/\s+/g, '-') // Substitui espaços por hífens
        .replace(/-+/g, '-') // Remove hífens duplicados
        .trim()
    }

    const slug = generateSlug(productName)

    // 4. Create event with minimal data
    const now = new Date()
    const startDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // +30 days
    const endDate = new Date(now.getTime() + 31 * 24 * 60 * 60 * 1000) // +31 days

    const newEventData: any = {
      productId,
      name: productName + ' - Evento',
      slug,
      description: productDescription || 'Evento gerado automaticamente',
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      location: 'A definir',
      capacity: 100,
      status: 'draft',
      projectId: product.projectId,
    }

    const response: Event = yield call(api.post, 'events', newEventData)

    yield put(autoCreateEventForProductSuccess(response))

    alert('Evento criado automaticamente com sucesso! Você pode editá-lo na página de Eventos.')
  } catch (error: any) {
    yield put(autoCreateEventForProductFailure(error.response?.data || error))
  }
}
