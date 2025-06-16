import {Reducer} from 'redux'
import {LPState, LPSTypes} from './types'

const INITIAL_STATE: LPState = {
  myLPs: [],
  lp: {},
  error: false,
  loading: true,
}

const reducer: Reducer<LPState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case LPSTypes.REORDER_LPS:
      return {...state, myLPs: action.payload }

    //Load
    case LPSTypes.LOAD_MYLPS_REQUEST:
      return {...state, loading: true, myLPs: []}
    case LPSTypes.LOAD_MYLPS_SUCCESS:
      return {...state, loading: false, error: false, myLPs: action.payload.data}
    case LPSTypes.LOAD_MYLPS_FAILURE:
      return {...state, loading: false, error: action.payload, myLPs: []}


    case LPSTypes.LOAD_LP_REQUEST:
      return {...state, loading: true,}
    case LPSTypes.LOAD_LP_SUCCESS:
      return {...state, loading: false, error: false, lp: action.payload.data}
    case LPSTypes.LOAD_LP_FAILURE:
      return {...state, loading: false, error: action.payload, lp: {}}

    //Create
    case LPSTypes.CREATE_LP_REQUEST:
      return {...state}
    case LPSTypes.CREATE_LP_SUCCESS:
      return {...state, loading: false, error: false, myLPs: [...state.myLPs, action.payload.data]}
    case LPSTypes.CREATE_LP_FAILURE:
      return {...state, loading: false, error: action.payload, myLPs: []}

    //Update
    case LPSTypes.UPDATE_LP_REQUEST:
      return {...state}
    case LPSTypes.UPDATE_LP_SUCCESS:
      return {...state, loading: false, error: false, myLPs: state.myLPs?.map((child) =>
        child.id === action.payload.data.id ? action.payload.data : child
      ),}
    case LPSTypes.UPDATE_LP_FAILURE:
      return {...state, loading: false, error: action.payload, myLPs: []}

    //Delete
    case LPSTypes.DELETE_LP_REQUEST:
      return {...state}
    case LPSTypes.DELETE_LP_SUCCESS:
      return {...state, loading: false, error: false, myLPs: state.myLPs.filter((item) => item.id !== action.payload.data.id)}
    case LPSTypes.DELETE_LP_FAILURE:
      return {...state, loading: false, error: action.payload, myLPs: []}
    default:
      return state
  }
}

export default reducer
