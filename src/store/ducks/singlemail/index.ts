import {Reducer} from 'redux'
import {SingleMailState, SingleMailTypes} from './types'

const INITIAL_STATE: SingleMailState = {
  data: [],
  error: {},
  loading: false,
}

const reducer: Reducer<SingleMailState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Load
    case SingleMailTypes.LOAD_SINGLEMAIL_REQUEST:
      return {...state, loading: true, data: []}
    case SingleMailTypes.LOAD_SINGLEMAIL_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data}
    case SingleMailTypes.LOAD_SINGLEMAIL_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Create
    case SingleMailTypes.CREATE_SINGLEMAIL_REQUEST:
      return {...state, loading: true}
    case SingleMailTypes.CREATE_SINGLEMAIL_SUCCESS:
      return {...state, loading: false, error: {}, data: [action.payload.data, ...state.data]}
    case SingleMailTypes.CREATE_SINGLEMAIL_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    default:
      return state
  }
}

export default reducer
