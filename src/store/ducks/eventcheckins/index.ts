import {Reducer} from 'redux'
import {EventCheckinsState, EventCheckinsTypes} from './types'

const INITIAL_STATE: EventCheckinsState = {
  data: [],
  loading: false,
  error: false,
  count: 0,
}

interface CheckinAction {
  type: string
  payload?: any
}

const reducer: Reducer<EventCheckinsState> = (state = INITIAL_STATE, action: CheckinAction) => {
  switch (action.type) {
    // Create checkin
    case EventCheckinsTypes.CREATE_CHECKIN_REQUEST:
      return {...state, loading: true}
    case EventCheckinsTypes.CREATE_CHECKIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: [action.payload.data || action.payload, ...state.data],
        count: state.count + 1,
      }
    case EventCheckinsTypes.CREATE_CHECKIN_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Load checkins by event
    case EventCheckinsTypes.LOAD_CHECKINS_BY_EVENT_REQUEST:
      return {...state, loading: true}
    case EventCheckinsTypes.LOAD_CHECKINS_BY_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data || action.payload,
        count: (action.payload.data || action.payload).length,
      }
    case EventCheckinsTypes.LOAD_CHECKINS_BY_EVENT_FAILURE:
      return {...state, loading: false, error: action.payload}

    // Cancel checkin
    case EventCheckinsTypes.CANCEL_CHECKIN_REQUEST:
      return {...state, loading: true}
    case EventCheckinsTypes.CANCEL_CHECKIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data.filter((c) => c.id !== action.payload.id),
        count: state.count - 1,
      }
    case EventCheckinsTypes.CANCEL_CHECKIN_FAILURE:
      return {...state, loading: false, error: action.payload}

    default:
      return state
  }
}

export default reducer
