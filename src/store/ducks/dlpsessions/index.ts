import {Reducer} from 'redux'
import {LPSessionState, LPSessionsTypes} from './types'

const INITIAL_STATE: LPSessionState = {
  myLPSessions: [],
  lpsession: {},
  error: false,
  loading: true,
}

const reducer: Reducer<LPSessionState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case LPSessionsTypes.REORDER_LPSESSIONS:
      return {...state, myLPSessions: action.payload }

    //Load
    case LPSessionsTypes.LOAD_MYLPSESSIONS_REQUEST:
      return {...state, loading: true, myLPSessions: []}
    case LPSessionsTypes.LOAD_MYLPSESSIONS_SUCCESS:
      return {...state, loading: false, error: false, myLPSessions: action.payload.data}
    case LPSessionsTypes.LOAD_MYLPSESSIONS_FAILURE:
      return {...state, loading: false, error: action.payload, myLPSessions: []}


    case LPSessionsTypes.LOAD_LPSESSION_REQUEST:
      return {...state, loading: true,}
    case LPSessionsTypes.LOAD_LPSESSION_SUCCESS:
      return {...state, loading: false, error: false, lpsession: action.payload.data}
    case LPSessionsTypes.LOAD_LPSESSION_FAILURE:
      return {...state, loading: false, error: action.payload, lpsession: {}}

    //Create
    case LPSessionsTypes.CREATE_LPSESSION_REQUEST:
      return {...state}
    case LPSessionsTypes.CREATE_LPSESSION_SUCCESS:
      return {...state, loading: false, error: false, myLPSessions: [action.payload.data, ...state.myLPSessions]}
    case LPSessionsTypes.CREATE_LPSESSION_FAILURE:
      return {...state, loading: false, error: action.payload, myLPSessions: []}

    //Update
    case LPSessionsTypes.UPDATE_LPSESSION_REQUEST:
      return {...state}
    case LPSessionsTypes.UPDATE_LPSESSION_SUCCESS:
      return {...state, loading: false, error: false, myLPSessions: state.myLPSessions?.map((child) =>
        child.id === action.payload.data.id ? action.payload.data : child
      ),}
    case LPSessionsTypes.UPDATE_LPSESSION_FAILURE:
      return {...state, loading: false, error: action.payload, myLPSessions: []}

    //Delete
    case LPSessionsTypes.DELETE_LPSESSION_REQUEST:
      return {...state}
    case LPSessionsTypes.DELETE_LPSESSION_SUCCESS:
      return {...state, loading: false, error: false, myLPSessions: state.myLPSessions.filter((item) => item.id !== action.payload.data.id)}
    case LPSessionsTypes.DELETE_LPSESSION_FAILURE:
      return {...state, loading: false, error: action.payload, myLPSessions: []}
    default:
      return state
  }
}

export default reducer
