import {Reducer} from 'redux'
import {OffersState, OffersTypes} from './types'
import { OfferHasProductsTypes } from '../dofferhasproduct/types'


const INITIAL_STATE: OffersState = {
  myOffers: [],
  offer: {},
  error: false,
  loading: true,
}


const reducer: Reducer<OffersState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case OffersTypes.REORDER_OFFERS:
      console.log("action.payload", action.payload)
      return {...state, myOffers: action.payload }

    case OfferHasProductsTypes.REORDER_OFFERHASPRODUCTS:
      //console.log("CHAMOU AQUI", action.payload)
      return {...state, myOffers: Object.assign([], state.myOffers, {
        ...state.myOffers?.map((child) => {
          //console.log("ver", child)
          if (child.id === action.payload[0].offer.id) {
            //console.log("ACHEI!", child.id)
            child.dOfferHasProducts = action.payload
          }
          return child;
        }),
      }),
    }

    //Load
    case OffersTypes.LOAD_OFFER_REQUEST:
      return {...state, loading: true}
    case OffersTypes.LOAD_OFFER_SUCCESS:
      return {...state, loading: false, error: false, offer: action.payload.data} 
    case OffersTypes.LOAD_OFFER_FAILURE:
      return {...state, loading: false, error: action.payload, offer: {}}

    //Load
    case OffersTypes.LOAD_MYOFFERS_REQUEST:
      return {...state, loading: true}
    case OffersTypes.LOAD_MYOFFERS_SUCCESS:
      return {...state, loading: false, error: false, myOffers: action.payload.data}
    case OffersTypes.LOAD_MYOFFERS_FAILURE:
      return {...state, loading: false, error: action.payload, myOffers: []}

    case OfferHasProductsTypes.CREATE_OFFERHASPRODUCTS_SUCCESS:
      return {
        ...state,
        myOffers: Object.assign([], state.myOffers, {
          ...state.myOffers?.map((child) => {
            if (child.id === action.payload.data.offerId) {
              child.dOfferHasProducts?.push(action.payload.data)
            }
            return child;
          }),
        }),
      };

    case OfferHasProductsTypes.DELETE_OFFERHASPRODUCTS_SUCCESS:
      return {
        ...state,
        myOffers: Object.assign([], state.myOffers, {
          ...state.myOffers?.map((child) => {
            if (child.id === action.payload.data.offerId) {
              child.dOfferHasProducts = child.dOfferHasProducts?.filter((item) => item.id !== action.payload.data.id)
            }
            return child;
          }),
        }),
    };

    //Create
    case OffersTypes.CREATE_OFFER_REQUEST:
      return {...state}
    case OffersTypes.CREATE_OFFER_SUCCESS:
      return {...state, loading: false, error: false, myOffers: [action.payload.data, ...state.myOffers] }
    case OffersTypes.CREATE_OFFER_FAILURE:
      return {...state, loading: false, error: action.payload, myOffers: [], offer: {}}

    //Update
    case OffersTypes.UPDATE_OFFER_REQUEST:
      return {...state}
    case OffersTypes.UPDATE_OFFER_SUCCESS:
      return {...state, loading: false, error: false, myOffers: state.myOffers?.map((child) =>
        child.id === action.payload.data.id ? action.payload.data : child
      ),}
    case OffersTypes.UPDATE_OFFER_FAILURE:
      return {...state, loading: false, error: action.payload, myOffers: []}

    //Delete
    case OffersTypes.DELETE_OFFER_REQUEST:
      return {...state}
    case OffersTypes.DELETE_OFFER_SUCCESS:
      return {...state, loading: false, error: false, myOffers: state.myOffers.filter((item) => item.id !== action.payload.data.id)}
    case OffersTypes.DELETE_OFFER_FAILURE:
      return {...state, loading: false, error: action.payload, myOffers: []}
    default:
      return state
  }
}

export default reducer
