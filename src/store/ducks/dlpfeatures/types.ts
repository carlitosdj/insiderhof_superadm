import { availableProduct } from "../davailableproduct/types"
import { Module } from "../dmodule/types"
import { User } from "../me/types"

/**
 * Action types
 */
export enum LPFeaturesTypes {

  REORDER_LPFEATURES = '@extras/REORDER_LPFEATURES',


  //Load
  LOAD_MYLPFEATURES_REQUEST = '@extras/LOAD_MYLPFEATURES_REQUEST',
  LOAD_MYLPFEATURES_SUCCESS = '@extras/LOAD_MYLPFEATURES_SUCCESS',
  LOAD_MYLPFEATURES_FAILURE = '@extras/LOAD_MYLPFEATURES_FAILURE',


  //Load
  LOAD_LPFEATURE_REQUEST = '@extras/LOAD_LPFEATURE_REQUEST',
  LOAD_LPFEATURE_SUCCESS = '@extras/LOAD_LPFEATURE_SUCCESS',
  LOAD_LPFEATURE_FAILURE = '@extras/LOAD_LPFEATURE_FAILURE',

  //Create
  CREATE_LPFEATURE_REQUEST = '@extras/CREATE_LPFEATURE_REQUEST',
  CREATE_LPFEATURE_SUCCESS = '@extras/CREATE_LPFEATURE_SUCCESS',
  CREATE_LPFEATURE_FAILURE = '@extras/CREATE_LPFEATURE_FAILURE',

  //Update
  UPDATE_LPFEATURE_REQUEST = '@extras/UPDATE_LPFEATURE_REQUEST',
  UPDATE_LPFEATURE_SUCCESS = '@extras/UPDATE_LPFEATURE_SUCCESS',
  UPDATE_LPFEATURE_FAILURE = '@extras/UPDATE_LPFEATURE_FAILURE',

  //Delete
  DELETE_LPFEATURE_REQUEST = '@extras/DELETE_LPFEATURE_REQUEST',
  DELETE_LPFEATURE_SUCCESS = '@extras/DELETE_LPFEATURE_SUCCESS',
  DELETE_LPFEATURE_FAILURE = '@extras/DELETE_LPFEATURE_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface LPFeature {
  id?: number | undefined
  lpSessionId?: number | undefined
  number?: string | undefined
  title?: string | undefined
  description?: string | undefined
  delay?: string | undefined
  image?: string | undefined
  video?: string | undefined
  order?: number | undefined
  createdAt?: Date | undefined 
  updatedAt?: Date | undefined
  status?: string | undefined
}
/**
 * State type
 */
export interface LPFeatureState {
  readonly myLPFeatures: LPFeature[]
  readonly lpfeature: LPFeature
  readonly loading: boolean
  readonly error: boolean
}
