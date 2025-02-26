import { Offer } from "../doffer/types"
import { Product } from "../dproduct/types"


/**
 * Action types
 */
export enum OfferHasProductsTypes {
  REORDER_OFFERHASPRODUCTS = '@extras/REORDER_OFFERHASPRODUCTS',

  //Load
  LOAD_OFFERHASPRODUCTS_REQUEST = '@extras/LOAD_OFFERHASPRODUCTS_REQUEST',
  LOAD_OFFERHASPRODUCTS_SUCCESS = '@extras/LOAD_OFFERHASPRODUCTS_SUCCESS',
  LOAD_OFFERHASPRODUCTS_FAILURE = '@extras/LOAD_OFFERHASPRODUCTS_FAILURE',

  //Create
  CREATE_OFFERHASPRODUCTS_REQUEST = '@extras/CREATE_OFFERHASPRODUCTS_REQUEST',
  CREATE_OFFERHASPRODUCTS_SUCCESS = '@extras/CREATE_OFFERHASPRODUCTS_SUCCESS',
  CREATE_OFFERHASPRODUCTS_FAILURE = '@extras/CREATE_OFFERHASPRODUCTS_FAILURE',

  //Update
  UPDATE_OFFERHASPRODUCTS_REQUEST = '@extras/UPDATE_OFFERHASPRODUCTS_REQUEST',
  UPDATE_OFFERHASPRODUCTS_SUCCESS = '@extras/UPDATE_OFFERHASPRODUCTS_SUCCESS',
  UPDATE_OFFERHASPRODUCTS_FAILURE = '@extras/UPDATE_OFFERHASPRODUCTS_FAILURE',

  //Delete
  DELETE_OFFERHASPRODUCTS_REQUEST = '@extras/DELETE_OFFERHASPRODUCTS_REQUEST',
  DELETE_OFFERHASPRODUCTS_SUCCESS = '@extras/DELETE_OFFERHASPRODUCTS_SUCCESS',
  DELETE_OFFERHASPRODUCTS_FAILURE = '@extras/DELETE_OFFERHASPRODUCTS_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface OfferHasProducts {
  id?: number | undefined
  createdAt?: Date | undefined 
  updatedAt?: Date | undefined
  status?: string | undefined
  order?: number | undefined
  productId?: number | undefined
  offerId?: number | undefined
  product?: Product | undefined
  offer?: Offer | undefined

}
/**
 * State type
 */
export interface OfferHasProductsState {
  readonly data: OfferHasProducts[]
  readonly loading: boolean
  readonly error: boolean
}
