import { availableProduct } from "../davailableproduct/types"
import { Module } from "../dmodule/types"
import { User } from "../me/types"

/**
 * Action types
 */
export enum LPSessionsTypes {

  REORDER_LPSESSIONS = '@extras/REORDER_LPSESSIONS',


  //Load
  LOAD_MYLPSESSIONS_REQUEST = '@extras/LOAD_MYLPSESSIONS_REQUEST',
  LOAD_MYLPSESSIONS_SUCCESS = '@extras/LOAD_MYLPSESSIONS_SUCCESS',
  LOAD_MYLPSESSIONS_FAILURE = '@extras/LOAD_MYLPSESSIONS_FAILURE',


  //Load
  LOAD_LPSESSION_REQUEST = '@extras/LOAD_LPSESSION_REQUEST',
  LOAD_LPSESSION_SUCCESS = '@extras/LOAD_LPSESSION_SUCCESS',
  LOAD_LPSESSION_FAILURE = '@extras/LOAD_LPSESSION_FAILURE',

  //Create
  CREATE_LPSESSION_REQUEST = '@extras/CREATE_LPSESSION_REQUEST',
  CREATE_LPSESSION_SUCCESS = '@extras/CREATE_LPSESSION_SUCCESS',
  CREATE_LPSESSION_FAILURE = '@extras/CREATE_LPSESSION_FAILURE',

  //Update
  UPDATE_LPSESSION_REQUEST = '@extras/UPDATE_LPSESSION_REQUEST',
  UPDATE_LPSESSION_SUCCESS = '@extras/UPDATE_LPSESSION_SUCCESS',
  UPDATE_LPSESSION_FAILURE = '@extras/UPDATE_LPSESSION_FAILURE',

  //Delete
  DELETE_LPSESSION_REQUEST = '@extras/DELETE_LPSESSION_REQUEST',
  DELETE_LPSESSION_SUCCESS = '@extras/DELETE_LPSESSION_SUCCESS',
  DELETE_LPSESSION_FAILURE = '@extras/DELETE_LPSESSION_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface LPSession {
  id?: number | undefined
  name?: string | undefined
  type?: string | undefined
  lpId?: number | undefined
  title?: string | undefined
  subtitle?: string | undefined
  delay?: string | undefined
  order?: number | undefined
  createdAt?: Date | undefined 
  updatedAt?: Date | undefined
  status?: string | undefined
}
/**
 * State type
 */
export interface LPSessionState {
  readonly myLPSessions: LPSession[]
  readonly lpsession: LPSession
  readonly loading: boolean
  readonly error: boolean
}
