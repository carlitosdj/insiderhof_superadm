import {Reducer} from 'redux'
import {ExtrasState, ExtrasTypes} from './types'

const INITIAL_STATE: ExtrasState = {
  data: [],
  error: false,
  loading: false,
}

const reducer: Reducer<ExtrasState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Load
    case ExtrasTypes.LOAD_EXTRAS_REQUEST:
      return {...state, loading: true, data: []}
    case ExtrasTypes.LOAD_EXTRAS_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data.data} //2x .data oO
    case ExtrasTypes.LOAD_EXTRAS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Create
    case ExtrasTypes.CREATE_EXTRA_REQUEST:
      return {...state, loading: true, data: []}
    case ExtrasTypes.CREATE_EXTRA_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data.data}
    case ExtrasTypes.CREATE_EXTRA_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Update
    case ExtrasTypes.UPDATE_EXTRA_REQUEST:
      return {...state, loading: true, data: []}
    case ExtrasTypes.UPDATE_EXTRA_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data.data}
    case ExtrasTypes.UPDATE_EXTRA_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Delete
    case ExtrasTypes.DELETE_EXTRA_REQUEST:
      return {...state, loading: true, data: []}
    case ExtrasTypes.DELETE_EXTRA_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case ExtrasTypes.DELETE_EXTRA_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}
    default:
      return state
  }
}

export default reducer
