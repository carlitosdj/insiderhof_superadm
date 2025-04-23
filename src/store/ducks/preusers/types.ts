/**
 * Action types
 */

import { State } from "react-inlinesvg";
import { City } from "../city/types";

export enum PreUsersTypes {
  //All
  LOAD_PREUSERS_REQUEST = "@preusers/LOAD_PREUSERS_REQUEST",
  LOAD_PREUSERS_SUCCESS = "@preusers/LOAD_PREUSERS_SUCCESS",
  LOAD_PREUSERS_FAILURE = "@preusers/LOAD_PREUSERS_FAILURE",

  //Single user: -> "readOne" / "readByEmail"
  LOAD_PREUSER_REQUEST = "@preusers/LOAD_PREUSER_REQUEST",
  LOAD_PREUSER_SUCCESS = "@preusers/LOAD_PREUSER_SUCCESS",
  LOAD_PREUSER_FAILURE = "@preusers/LOAD_PREUSER_FAILURE",

  //Search
  SEARCH_PREUSERS_REQUEST = "@preusers/SEARCH_PREUSERS_REQUEST",
  SEARCH_PREUSERS_SUCCESS = "@preusers/SEARCH_PREUSERS_SUCCESS",
  SEARCH_PREUSERS_FAILURE = "@preusers/SEARCH_PREUSERS_FAILURE",

  //Filter
  FILTER_PREUSERS_REQUEST = "@preusers/FILTER_PREUSERS_REQUEST",
  FILTER_PREUSERS_SUCCESS = "@preusers/FILTER_PREUSERS_SUCCESS",
  FILTER_PREUSERS_FAILURE = "@preusers/FILTER_PREUSERS_FAILURE",

  //Create
  CREATE_PREUSER_REQUEST = "@preusers/CREATE_PREUSER_REQUEST",
  CREATE_PREUSER_SUCCESS = "@preusers/CREATE_PREUSER_SUCCESS",
  CREATE_PREUSER_FAILURE = "@preusers/CREATE_PREUSER_FAILURE",

  //Update
  UPDATE_PREUSER_REQUEST = "@preusers/UPDATE_PREUSER_REQUEST",
  UPDATE_PREUSER_SUCCESS = "@preusers/UPDATE_PREUSER_SUCCESS",
  UPDATE_PREUSER_FAILURE = "@preusers/UPDATE_PREUSER_FAILURE",

  //Delete
  DELETE_PREUSER_REQUEST = "@preusers/DELETE_PREUSER_REQUEST",
  DELETE_PREUSER_SUCCESS = "@preusers/DELETE_PREUSER_SUCCESS",
  DELETE_PREUSER_FAILURE = "@preusers/DELETE_PREUSER_FAILURE",

  //Selected users
  SELECTED_PREUSER_ADD = "@preusers/SELECTED_PREUSER_ADD",
  SELECTED_PREUSER_ADD_SUCCESS = "@preusers/SELECTED_PREUSER_ADD_SUCCESS",
  SELECTED_PREUSER_REMOVE = "@preusers/SELECTED_PREUSER_REMOVE",
  SELECTED_PREUSER_REMOVE_SUCCESS = "@preusers/SELECTED_PREUSER_REMOVE_SUCCESS",
}

/**
 * Data types
 */
// User Imported from Me
export interface PreUser {
  id?: number;
  username?: string;
  email?: string;
  password_hash?: string;
  createdAt?: number;
  updated_at?: number;
  origin?: string;
  //profile:
  //profile?: Profile
  name?: string;
  whatsapp?: string;
  type?: string;
  cpf?: string;
  address?: string;
  addressNumber?: string;
  addressDistrict?: string;
  addressCity?: string;
  addressState?: string;
  addressCountry?: string;
  addressComplement?: string;
  profileUserId?: number;
  postalCode?: string;

  city?: City;
  state?: State;

  cityId?: string;
  stateId?: string;

  /*  */
}

/**
 * State type
 */
export interface PreUsersState {
  readonly data: PreUser[];
  readonly user: PreUser;
  readonly loading: boolean;
  readonly loadingPreUser: boolean;
  readonly error: any;
  readonly count: number;
  readonly selectedPreUsers: PreUser[];
  readonly showPagination: boolean;
  readonly filterStartDate: number;
  readonly filterEndDate: number;
}
