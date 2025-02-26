import {Reducer} from 'redux'
import {CartsState, CartsTypes} from './types'
const INITIAL_STATE: CartsState = {
  data: [],
  error: false,
  loading: false,
}

const reducer: Reducer<CartsState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Load
    case CartsTypes.LOAD_CART_REQUEST:
      return {...state, loading: true}
    case CartsTypes.LOAD_CART_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data} //2x .data oO
    case CartsTypes.LOAD_CART_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Create
    case CartsTypes.CREATE_CART_REQUEST:
      return {...state}
    case CartsTypes.CREATE_CART_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case CartsTypes.CREATE_CART_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    default:
      return state
  }
}

export default reducer
