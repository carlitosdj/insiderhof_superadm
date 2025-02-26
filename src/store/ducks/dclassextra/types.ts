import { Module } from "../dmodule/types"

/**
 * Action types
 */
export enum ClassExtrasTypes {

  REORDER_EXTRACLASSES = '@extras/REORDER_EXTRACLASSES',

  //Load
  LOAD_CLASSEXTRAS_REQUEST = '@extras/LOAD_CLASSEXTRAS_REQUEST',
  LOAD_CLASSEXTRAS_SUCCESS = '@extras/LOAD_CLASSEXTRAS_SUCCESS',
  LOAD_CLASSEXTRAS_FAILURE = '@extras/LOAD_CLASSEXTRAS_FAILURE',

  //Load
  LOAD_CLASSEXTRA_REQUEST = '@extras/LOAD_CLASSEXTRA_REQUEST',
  LOAD_CLASSEXTRA_SUCCESS = '@extras/LOAD_CLASSEXTRA_SUCCESS',
  LOAD_CLASSEXTRA_FAILURE = '@extras/LOAD_CLASSEXTRA_FAILURE',

  //Create
  CREATE_CLASSEXTRA_REQUEST = '@extras/CREATE_CLASSEXTRA_REQUEST',
  CREATE_CLASSEXTRA_SUCCESS = '@extras/CREATE_CLASSEXTRA_SUCCESS',
  CREATE_CLASSEXTRA_FAILURE = '@extras/CREATE_CLASSEXTRA_FAILURE',

  //Update
  UPDATE_CLASSEXTRA_REQUEST = '@extras/UPDATE_CLASSEXTRA_REQUEST',
  UPDATE_CLASSEXTRA_SUCCESS = '@extras/UPDATE_CLASSEXTRA_SUCCESS',
  UPDATE_CLASSEXTRA_FAILURE = '@extras/UPDATE_CLASSEXTRA_FAILURE',

  //Delete
  DELETE_CLASSEXTRA_REQUEST = '@extras/DELETE_CLASSEXTRA_REQUEST',
  DELETE_CLASSEXTRA_SUCCESS = '@extras/DELETE_CLASSEXTRA_SUCCESS',
  DELETE_CLASSEXTRA_FAILURE = '@extras/DELETE_CLASSEXTRA_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface ClassExtra {
  id?: number | undefined
  key?: string | undefined
  value?: string | undefined
  name?: string | undefined
  order?: number | undefined
  createdAt?: Date | undefined 
  updatedAt?: Date | undefined
  status?: string | undefined
  classId?: number | undefined
}
/**
 * State type
 */
export interface ClassExtraState {
  readonly data: ClassExtra[]
  readonly classextra: ClassExtra
  readonly loading: boolean
  readonly error: boolean
}
