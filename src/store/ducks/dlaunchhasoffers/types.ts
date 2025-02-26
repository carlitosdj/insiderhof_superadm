import { Launch } from "../component/types";
import { Offer } from "../doffer/types";


/**
 * Action types
 */
export enum LaunchHasOfferTypes {

  REORDER_LAUNCHHASOFFERS = '@extras/REORDER_LAUNCHHASOFFERS',

  //Load
  LOAD_LAUNCHHASOFFERS_REQUEST = "@extras/LOAD_LAUNCHHASOFFERS_REQUEST",
  LOAD_LAUNCHHASOFFERS_SUCCESS = "@extras/LOAD_LAUNCHHASOFFERS_SUCCESS",
  LOAD_LAUNCHHASOFFERS_FAILURE = "@extras/LOAD_LAUNCHHASOFFERS_FAILURE",

  //Create
  CREATE_LAUNCHHASOFFERS_REQUEST = "@extras/CREATE_LAUNCHHASOFFERS_REQUEST",
  CREATE_LAUNCHHASOFFERS_SUCCESS = "@extras/CREATE_LAUNCHHASOFFERS_SUCCESS",
  CREATE_LAUNCHHASOFFERS_FAILURE = "@extras/CREATE_LAUNCHHASOFFERS_FAILURE",

  //Update
  UPDATE_LAUNCHHASOFFERS_REQUEST = "@extras/UPDATE_LAUNCHHASOFFERS_REQUEST",
  UPDATE_LAUNCHHASOFFERS_SUCCESS = "@extras/UPDATE_LAUNCHHASOFFERS_SUCCESS",
  UPDATE_LAUNCHHASOFFERS_FAILURE = "@extras/UPDATE_LAUNCHHASOFFERS_FAILURE",

  //Delete
  DELETE_LAUNCHHASOFFERS_REQUEST = "@extras/DELETE_LAUNCHHASOFFERS_REQUEST",
  DELETE_LAUNCHHASOFFERS_SUCCESS = "@extras/DELETE_LAUNCHHASOFFERS_SUCCESS",
  DELETE_LAUNCHHASOFFERS_FAILURE = "@extras/DELETE_LAUNCHHASOFFERS_FAILURE",
}

/**
 * Data types
 */
// User Imported from Me
export interface LaunchHasOffers {
  id?: number | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  status?: string | undefined;
  launchId?: number | undefined;
  offerId?: number | undefined;
  offer?: Offer | undefined;
  order?: number | undefined;
  launch?: Launch[] | undefined;
}
/**
 * State type
 */
export interface LaunchHasOffersState {
  readonly data: LaunchHasOffers[];
  readonly loading: boolean;
  readonly error: boolean;
}
