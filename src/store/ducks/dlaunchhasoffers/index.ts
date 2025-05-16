import {Reducer} from 'redux'
import {LaunchHasOffersState, LaunchHasOfferTypes} from './types'

const INITIAL_STATE: LaunchHasOffersState = {
  data: [],
  error: false,
  loading: true,
}


const reducer: Reducer<LaunchHasOffersState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {


    case LaunchHasOfferTypes.REORDER_LAUNCHHASOFFERS:
      return {...state, data: action.payload }

    //Load
    case LaunchHasOfferTypes.LOAD_LAUNCHHASOFFERS_REQUEST:
      return {...state}
    case LaunchHasOfferTypes.LOAD_LAUNCHHASOFFERS_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data} 
    case LaunchHasOfferTypes.LOAD_LAUNCHHASOFFERS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}


    //Create
    case LaunchHasOfferTypes.CREATE_LAUNCHHASOFFERS_REQUEST:
      return {...state, loading: true}
    case LaunchHasOfferTypes.CREATE_LAUNCHHASOFFERS_SUCCESS:
      return {...state, loading: false, error: false, data: [...state.data, action.payload.data] }
    case LaunchHasOfferTypes.CREATE_LAUNCHHASOFFERS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Update
    case LaunchHasOfferTypes.UPDATE_LAUNCHHASOFFERS_REQUEST:
      return {...state, loading: true}
    case LaunchHasOfferTypes.UPDATE_LAUNCHHASOFFERS_SUCCESS:
      return {...state, loading: false, error: false, data: state.data?.map((child) =>
        child.id === action.payload.data.id ? action.payload.data : child
      ),}
    case LaunchHasOfferTypes.UPDATE_LAUNCHHASOFFERS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Delete
    case LaunchHasOfferTypes.DELETE_LAUNCHHASOFFERS_REQUEST:
      return {...state, loading: true}
    case LaunchHasOfferTypes.DELETE_LAUNCHHASOFFERS_SUCCESS:
      return {...state, loading: false, error: false, data: state.data.filter((item) => item.id !== action.payload.data.id)}
    case LaunchHasOfferTypes.DELETE_LAUNCHHASOFFERS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}
    default:
      return state
  }
}

export default reducer
