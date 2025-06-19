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

  //Export
  EXPORT_LP_REQUEST = '@lps/EXPORT_LP_REQUEST',
  EXPORT_LP_SUCCESS = '@lps/EXPORT_LP_SUCCESS',
  EXPORT_LP_FAILURE = '@lps/EXPORT_LP_FAILURE',

  //Import
  IMPORT_LP_REQUEST = '@lps/IMPORT_LP_REQUEST',
  IMPORT_LP_SUCCESS = '@lps/IMPORT_LP_SUCCESS',
  IMPORT_LP_FAILURE = '@lps/IMPORT_LP_FAILURE',

  //Duplicate
  DUPLICATE_LP_REQUEST = '@lps/DUPLICATE_LP_REQUEST',
  DUPLICATE_LP_SUCCESS = '@lps/DUPLICATE_LP_SUCCESS',
  DUPLICATE_LP_FAILURE = '@lps/DUPLICATE_LP_FAILURE',
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
  layout?: string | undefined
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
  readonly loadingImport: boolean
  readonly loadingDuplicate: boolean
  readonly error: boolean
  readonly exportLP: LP | null
  readonly importLP: LP | null
  readonly duplicateLP: LP | null
}
