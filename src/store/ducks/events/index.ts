import {Reducer} from 'redux'
import {EventsState, EventsTypes} from './types'

const INITIAL_STATE: EventsState = {
  data: [],
  selectedEvent: null,
  metrics: null,
  error: false,
  loading: false,
  loadingEvent: false,
  loadingMetrics: false,
  count: 0,
}

const reducer: Reducer<EventsState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    // Load all
    case EventsTypes.LOAD_EVENTS_REQUEST:
      return {...state, loading: true, data: []}
    case EventsTypes.LOAD_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data || action.payload,
        count: action.payload.count || action.payload.length || 0,
      }
    case EventsTypes.LOAD_EVENTS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    // Load one
    case EventsTypes.LOAD_EVENT_REQUEST:
      return {...state, loadingEvent: true, selectedEvent: null}
    case EventsTypes.LOAD_EVENT_SUCCESS:
      return {
        ...state,
        loadingEvent: false,
        error: false,
        selectedEvent: action.payload.data || action.payload,
      }
    case EventsTypes.LOAD_EVENT_FAILURE:
      return {...state, loadingEvent: false, error: action.payload, selectedEvent: null}

    // Create
    case EventsTypes.CREATE_EVENT_REQUEST:
      return {...state}
    case EventsTypes.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: [action.payload.data || action.payload, ...state.data],
      }
    case EventsTypes.CREATE_EVENT_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Update
    case EventsTypes.UPDATE_EVENT_REQUEST:
      return {...state}
    case EventsTypes.UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.map((child) =>
          child.id === (action.payload.data?.id || action.payload.id)
            ? action.payload.data || action.payload
            : child
        ),
        selectedEvent:
          state.selectedEvent?.id === (action.payload.data?.id || action.payload.id)
            ? action.payload.data || action.payload
            : state.selectedEvent,
      }
    case EventsTypes.UPDATE_EVENT_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Delete
    case EventsTypes.DELETE_EVENT_REQUEST:
      return {...state}
    case EventsTypes.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.filter(
          (item) => item.id !== (action.payload.data?.id || action.payload.id)
        ),
      }
    case EventsTypes.DELETE_EVENT_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Metrics
    case EventsTypes.LOAD_EVENT_METRICS_REQUEST:
      return {...state, loadingMetrics: true, metrics: null}
    case EventsTypes.LOAD_EVENT_METRICS_SUCCESS:
      return {
        ...state,
        loadingMetrics: false,
        error: false,
        metrics: action.payload.data || action.payload,
      }
    case EventsTypes.LOAD_EVENT_METRICS_FAILURE:
      return {...state, loadingMetrics: false, error: action.payload, metrics: null}

    // Retroactive tickets
    case EventsTypes.CREATE_RETROACTIVE_TICKETS_REQUEST:
      return {...state}
    case EventsTypes.CREATE_RETROACTIVE_TICKETS_SUCCESS:
      return {...state, loading: false, error: false}
    case EventsTypes.CREATE_RETROACTIVE_TICKETS_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Auto-create event for product
    case EventsTypes.AUTO_CREATE_EVENT_FOR_PRODUCT_REQUEST:
      return {...state, loading: true}
    case EventsTypes.AUTO_CREATE_EVENT_FOR_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: [action.payload.data || action.payload, ...state.data],
      }
    case EventsTypes.AUTO_CREATE_EVENT_FOR_PRODUCT_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Set selected event
    case EventsTypes.SET_SELECTED_EVENT:
      return {...state, selectedEvent: action.payload}

    default:
      return state
  }
}

export default reducer
