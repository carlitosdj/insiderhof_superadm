import { LaunchHasOffers } from "../dlaunchhasoffers/types"
import { OfferHasProducts } from "../dofferhasproduct/types"



/**
 * Action types
 */
export enum OffersTypes {
  REORDER_OFFERS = '@extras/REORDER_OFFERS',
  //Load
  LOAD_MYOFFERS_REQUEST = '@extras/LOAD_MYOFFERS_REQUEST',
  LOAD_MYOFFERS_SUCCESS = '@extras/LOAD_MYOFFERS_SUCCESS',
  LOAD_MYOFFERS_FAILURE = '@extras/LOAD_MYOFFERS_FAILURE',

  //Load
  LOAD_OFFER_REQUEST = '@extras/LOAD_OFFER_REQUEST',
  LOAD_OFFER_SUCCESS = '@extras/LOAD_OFFER_SUCCESS',
  LOAD_OFFER_FAILURE = '@extras/LOAD_OFFER_FAILURE',

  //Create
  CREATE_OFFER_REQUEST = '@extras/CREATE_OFFER_REQUEST',
  CREATE_OFFER_SUCCESS = '@extras/CREATE_OFFER_SUCCESS',
  CREATE_OFFER_FAILURE = '@extras/CREATE_OFFER_FAILURE',

  //Update
  UPDATE_OFFER_REQUEST = '@extras/UPDATE_OFFER_REQUEST',
  UPDATE_OFFER_SUCCESS = '@extras/UPDATE_OFFER_SUCCESS',
  UPDATE_OFFER_FAILURE = '@extras/UPDATE_OFFER_FAILURE',

  //Delete
  DELETE_OFFER_REQUEST = '@extras/DELETE_OFFER_REQUEST',
  DELETE_OFFER_SUCCESS = '@extras/DELETE_OFFER_SUCCESS',
  DELETE_OFFER_FAILURE = '@extras/DELETE_OFFER_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface Offer {
  id?: number | undefined
  name?: string | undefined
  description?: string | undefined
  oldPrice?: number | undefined
  price?: number | undefined 
  image?: string | undefined
  type?: string | undefined
  order?: number | undefined	
  createdAt?: Date | undefined 
  updatedAt?: Date | undefined
  status?: string | undefined
  ownerId?: number | undefined
  dOfferHasProducts? : OfferHasProducts[] | undefined
  launchhasoffers?: LaunchHasOffers[] | undefined

}
/**
 * State type
 */
export interface OffersState {
  readonly myOffers: Offer[]
  readonly offer: Offer
  readonly loading: boolean
  readonly error: boolean
}
