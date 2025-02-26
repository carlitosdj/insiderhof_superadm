import {Reducer} from 'redux'
import {StateState, StateTypes} from './types'

const INITIAL_STATE: StateState = {
  data: [],
  error: false,
  loading: false,
}

const reducer: Reducer<StateState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Load
    case StateTypes.LOAD_STATES_REQUEST:
      return {...state, loading: true, data: []}
    case StateTypes.LOAD_STATES_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case StateTypes.LOAD_STATES_REQUEST:
      return {...state, loading: false, error: action.payload, data: []}

    default:
      return state
  }
}

export default reducer
