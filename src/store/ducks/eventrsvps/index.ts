import {Reducer} from 'redux'
import {EventRsvpsState, EventRsvpsTypes} from './types'

const INITIAL_STATE: EventRsvpsState = {
  data: [],
  loading: false,
  error: false,
  count: 0,
}

interface RsvpAction {
  type: string
  payload?: any
}

const reducer: Reducer<EventRsvpsState> = (state = INITIAL_STATE, action: RsvpAction) => {
  switch (action.type) {
    // Confirm RSVP
    case EventRsvpsTypes.CONFIRM_RSVP_REQUEST:
      return {...state, loading: true}
    case EventRsvpsTypes.CONFIRM_RSVP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: [action.payload.data || action.payload, ...state.data],
        count: state.count + 1,
      }
    case EventRsvpsTypes.CONFIRM_RSVP_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Load RSVPs by event
    case EventRsvpsTypes.LOAD_RSVPS_BY_EVENT_REQUEST:
      return {...state, loading: true}
    case EventRsvpsTypes.LOAD_RSVPS_BY_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data || action.payload,
        count: (action.payload.data || action.payload).length,
      }
    case EventRsvpsTypes.LOAD_RSVPS_BY_EVENT_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Load RSVP by ticket
    case EventRsvpsTypes.LOAD_RSVP_BY_TICKET_REQUEST:
      return {...state, loading: true}
    case EventRsvpsTypes.LOAD_RSVP_BY_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      }
    case EventRsvpsTypes.LOAD_RSVP_BY_TICKET_FAILURE:
      return {...state, loading: false, error: action.payload}

    default:
      return state
  }
}

export default reducer
