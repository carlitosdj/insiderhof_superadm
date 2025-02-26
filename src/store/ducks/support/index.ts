import {Reducer} from 'redux'
import {SupportState, SupportsTypes} from './types'
const INITIAL_STATE: SupportState = {
  all: [],
  data: [],
  error: false,
  loading: false,
}

const reducer: Reducer<SupportState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Load
    case SupportsTypes.LOAD_ALLSUPPORT_REQUEST:
      return {...state, loading: true}
    case SupportsTypes.LOAD_ALLSUPPORT_SUCCESS:
      return {...state, loading: false, error: false, all: action.payload.data}
    case SupportsTypes.LOAD_ALLSUPPORT_FAILURE:
      return {...state, loading: false, error: action.payload, all: []}

    //Load single
    case SupportsTypes.LOAD_SUPPORT_REQUEST:
      return {...state, loading: true}
    case SupportsTypes.LOAD_SUPPORT_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case SupportsTypes.LOAD_SUPPORT_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Create
    case SupportsTypes.CREATE_SUPPORT_REQUEST:
      return {...state}
    case SupportsTypes.CREATE_SUPPORT_SUCCESS:
      return {...state, loading: false, error: false, data: [...state.data, action.payload.data]}
    case SupportsTypes.CREATE_SUPPORT_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Update
    case SupportsTypes.UPDATE_SUPPORT_REQUEST:
      return {...state}
    case SupportsTypes.UPDATE_SUPPORT_SUCCESS:
      console.log('ACTION PAYLOAD VER', action.payload)
      return {
        ...state,
        loading: false,
        error: false,
        all: state.all?.map((child) =>
          child.id === action.payload.data.id ? action.payload.data : child
        ),
      } //update data?
    case SupportsTypes.UPDATE_SUPPORT_FAILURE:
      return {...state, loading: false, error: action.payload}

    default:
      return state
  }
}

export default reducer
