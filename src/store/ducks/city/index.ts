import {Reducer} from 'redux'
import {CityState, CityTypes} from './types'

const INITIAL_STATE: CityState = {
  data: [],
  error: false,
  loading: false,
}

const reducer: Reducer<CityState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Load
    case CityTypes.LOAD_CITIES_REQUEST:
      return {...state, loading: true, data: []}
    case CityTypes.LOAD_CITIES_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case CityTypes.LOAD_CITIES_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    default:
      return state
  }
}

export default reducer
