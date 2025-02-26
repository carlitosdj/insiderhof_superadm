import {Reducer} from 'redux'
import {OfferHasProductsState, OfferHasProductsTypes} from './types'

const INITIAL_STATE: OfferHasProductsState = {
  data: [],
  error: false,
  loading: true,
}

const reducer: Reducer<OfferHasProductsState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case OfferHasProductsTypes.REORDER_OFFERHASPRODUCTS:
      return {...state, data: action.payload }

    //Load
    case OfferHasProductsTypes.LOAD_OFFERHASPRODUCTS_REQUEST:
      return {...state, loading: true}
    case OfferHasProductsTypes.LOAD_OFFERHASPRODUCTS_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data} 
    case OfferHasProductsTypes.LOAD_OFFERHASPRODUCTS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}


    //Create
    case OfferHasProductsTypes.CREATE_OFFERHASPRODUCTS_REQUEST:
      return {...state}
    case OfferHasProductsTypes.CREATE_OFFERHASPRODUCTS_SUCCESS:
      console.log("XXXXXXXXXXXaction.payload.data", action.payload.data)
      return {...state, loading: false, error: false, data: [...state.data, action.payload.data] }
    case OfferHasProductsTypes.CREATE_OFFERHASPRODUCTS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Update
    case OfferHasProductsTypes.UPDATE_OFFERHASPRODUCTS_REQUEST:
      return {...state}
    case OfferHasProductsTypes.UPDATE_OFFERHASPRODUCTS_SUCCESS:
      return {...state, loading: false, error: false, data: state.data?.map((child) =>
        child.id === action.payload.data.id ? action.payload.data : child
      ),}
    case OfferHasProductsTypes.UPDATE_OFFERHASPRODUCTS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Delete
    case OfferHasProductsTypes.DELETE_OFFERHASPRODUCTS_REQUEST:
      return {...state}
    case OfferHasProductsTypes.DELETE_OFFERHASPRODUCTS_SUCCESS:
      return {...state, loading: false, error: false, data: state.data.filter((item) => item.id !== action.payload.data.id)}
    case OfferHasProductsTypes.DELETE_OFFERHASPRODUCTS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}
    default:
      return state
  }
}

export default reducer
