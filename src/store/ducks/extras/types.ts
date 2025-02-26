/**
 * Action types
 */
export enum ExtrasTypes {
  //Load
  LOAD_EXTRAS_REQUEST = '@extras/LOAD_EXTRAS_REQUEST',
  LOAD_EXTRAS_SUCCESS = '@extras/LOAD_EXTRAS_SUCCESS',
  LOAD_EXTRAS_FAILURE = '@extras/LOAD_EXTRAS_FAILURE',

  //Create
  CREATE_EXTRA_REQUEST = '@extras/CREATE_EXTRAS_REQUEST',
  CREATE_EXTRA_SUCCESS = '@extras/CREATE_EXTRAS_SUCCESS',
  CREATE_EXTRA_FAILURE = '@extras/CREATE_EXTRAS_FAILURE',

  //Update
  UPDATE_EXTRA_REQUEST = '@extras/UPDATE_EXTRAS_REQUEST',
  UPDATE_EXTRA_SUCCESS = '@extras/UPDATE_EXTRAS_SUCCESS',
  UPDATE_EXTRA_FAILURE = '@extras/UPDATE_EXTRAS_FAILURE',

  //Delete
  DELETE_EXTRA_REQUEST = '@extras/DELETE_EXTRAS_REQUEST',
  DELETE_EXTRA_SUCCESS = '@extras/DELETE_EXTRAS_SUCCESS',
  DELETE_EXTRA_FAILURE = '@extras/DELETE_EXTRAS_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface Extras {
  id?: number | undefined
  componentId?: number
  keyExtra?: string
  valueExtra?: string
  createdAt?: number
  status?: string
  create?: Extras[] | undefined
}
/**
 * State type
 */
export interface ExtrasState {
  readonly data: Extras[]
  readonly loading: boolean
  readonly error: boolean
}
