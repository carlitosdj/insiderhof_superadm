import { availableProduct } from "../davailableproduct/types"
import { Module } from "../dmodule/types"
import { User } from "../me/types"

/**
 * Action types
 */
export enum LPSTypes {

  REORDER_LPS = '@lps/REORDER_LPS',


  //Load
  LOAD_MYLPS_REQUEST = '@lps/LOAD_MYLPS_REQUEST',
  LOAD_MYLPS_SUCCESS = '@lps/LOAD_MYLPS_SUCCESS',
  LOAD_MYLPS_FAILURE = '@lps/LOAD_MYLPS_FAILURE',


  //Load
  LOAD_LP_REQUEST = '@lps/LOAD_LP_REQUEST',
  LOAD_LP_SUCCESS = '@lps/LOAD_LP_SUCCESS',
  LOAD_LP_FAILURE = '@lps/LOAD_LP_FAILURE',

  //Create
  CREATE_LP_REQUEST = '@lps/CREATE_LP_REQUEST',
  CREATE_LP_SUCCESS = '@lps/CREATE_LP_SUCCESS',
  CREATE_LP_FAILURE = '@lps/CREATE_LP_FAILURE',

  //Update
  UPDATE_LP_REQUEST = '@lps/UPDATE_LP_REQUEST',
  UPDATE_LP_SUCCESS = '@lps/UPDATE_LP_SUCCESS',
  UPDATE_LP_FAILURE = '@lps/UPDATE_LP_FAILURE',

  //Delete
  DELETE_LP_REQUEST = '@lps/DELETE_LP_REQUEST',
  DELETE_LP_SUCCESS = '@lps/DELETE_LP_SUCCESS',
  DELETE_LP_FAILURE = '@lps/DELETE_LP_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface LP {
  id?: number | undefined
  launchPhaseId?: number | undefined
  name?: string | undefined
  slug?: string | undefined
  description?: string | undefined
  order?: number | undefined
  createdAt?: Date | undefined 
  updatedAt?: Date | undefined
  status?: string | undefined
}
/**
 * State type
 */
export interface LPState {
  readonly myLPs: LP[]
  readonly lp: LP
  readonly loading: boolean
  readonly error: boolean
}
