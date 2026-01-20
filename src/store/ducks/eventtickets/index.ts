import {Reducer} from 'redux'
import {EventTicketsState, EventTicketsTypes} from './types'

const INITIAL_STATE: EventTicketsState = {
  data: [],
  selectedTicket: null,
  attendanceList: [],
  error: false,
  loading: false,
  loadingTicket: false,
  loadingAttendance: false,
  count: 0,
}

const reducer: Reducer<EventTicketsState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    // Load tickets by event
    case EventTicketsTypes.LOAD_TICKETS_BY_EVENT_REQUEST:
      return {...state, loading: true, data: []}
    case EventTicketsTypes.LOAD_TICKETS_BY_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data || action.payload,
        count: action.payload.count || action.payload.length || 0,
      }
    case EventTicketsTypes.LOAD_TICKETS_BY_EVENT_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    // Load tickets by user
    case EventTicketsTypes.LOAD_TICKETS_BY_USER_REQUEST:
      return {...state, loading: true, data: []}
    case EventTicketsTypes.LOAD_TICKETS_BY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data || action.payload,
        count: action.payload.count || action.payload.length || 0,
      }
    case EventTicketsTypes.LOAD_TICKETS_BY_USER_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    // Load single ticket
    case EventTicketsTypes.LOAD_TICKET_REQUEST:
      return {...state, loadingTicket: true, selectedTicket: null}
    case EventTicketsTypes.LOAD_TICKET_SUCCESS:
      return {
        ...state,
        loadingTicket: false,
        error: false,
        selectedTicket: action.payload.data || action.payload,
      }
    case EventTicketsTypes.LOAD_TICKET_FAILURE:
      return {...state, loadingTicket: false, error: action.payload, selectedTicket: null}

    // Create ticket
    case EventTicketsTypes.CREATE_TICKET_REQUEST:
      return {...state}
    case EventTicketsTypes.CREATE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: [action.payload.data || action.payload, ...state.data],
      }
    case EventTicketsTypes.CREATE_TICKET_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Update ticket
    case EventTicketsTypes.UPDATE_TICKET_REQUEST:
      return {...state}
    case EventTicketsTypes.UPDATE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.map((child) =>
          child.id === (action.payload.data?.id || action.payload.id)
            ? action.payload.data || action.payload
            : child
        ),
        selectedTicket:
          state.selectedTicket?.id === (action.payload.data?.id || action.payload.id)
            ? action.payload.data || action.payload
            : state.selectedTicket,
      }
    case EventTicketsTypes.UPDATE_TICKET_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Validate ticket
    case EventTicketsTypes.VALIDATE_TICKET_REQUEST:
      return {...state, loadingTicket: true}
    case EventTicketsTypes.VALIDATE_TICKET_SUCCESS:
      return {
        ...state,
        loadingTicket: false,
        error: false,
        selectedTicket: action.payload.data || action.payload,
      }
    case EventTicketsTypes.VALIDATE_TICKET_FAILURE:
      return {...state, loadingTicket: false, error: action.payload}

    // Transfer ticket
    case EventTicketsTypes.TRANSFER_TICKET_REQUEST:
      return {...state}
    case EventTicketsTypes.TRANSFER_TICKET_SUCCESS:
      return {...state, loading: false, error: false}
    case EventTicketsTypes.TRANSFER_TICKET_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Load attendance list
    case EventTicketsTypes.LOAD_ATTENDANCE_LIST_REQUEST:
      return {...state, loadingAttendance: true, attendanceList: []}
    case EventTicketsTypes.LOAD_ATTENDANCE_LIST_SUCCESS:
      return {
        ...state,
        loadingAttendance: false,
        error: false,
        attendanceList: action.payload.data || action.payload,
      }
    case EventTicketsTypes.LOAD_ATTENDANCE_LIST_FAILURE:
      return {...state, loadingAttendance: false, error: action.payload, attendanceList: []}

    // Set selected ticket
    case EventTicketsTypes.SET_SELECTED_TICKET:
      return {...state, selectedTicket: action.payload}

    default:
      return state
  }
}

export default reducer
