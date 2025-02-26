/**
 * Action types
 */
export enum WppgroupTypes {
  //Load
  LOAD_WPPGROUPS_REQUEST = '@wppgroup/LOAD_WPPGROUPS_REQUEST',
  LOAD_WPPGROUPS_SUCCESS = '@wppgroup/LOAD_WPPGROUPS_SUCCESS',
  LOAD_WPPGROUPS_FAILURE = '@wppgroup/LOAD_WPPGROUPS_FAILURE',

  //Create
  CREATE_WPPGROUP_REQUEST = '@wppgroup/CREATE_WPPGROUP_REQUEST',
  CREATE_WPPGROUP_SUCCESS = '@wppgroup/CREATE_WPPGROUP_SUCCESS',
  CREATE_WPPGROUP_FAILURE = '@wppgroup/CREATE_WPPGROUP_FAILURE',

  //Update
  UPDATE_WPPGROUP_REQUEST = '@wppgroup/UPDATE_WPPGROUP_REQUEST',
  UPDATE_WPPGROUP_SUCCESS = '@wppgroup/UPDATE_WPPGROUP_SUCCESS',
  UPDATE_WPPGROUP_FAILURE = '@wppgroup/UPDATE_WPPGROUP_FAILURE',

  //Delete
  DELETE_WPPGROUP_REQUEST = '@wppgroup/DELETE_WPPGROUP_REQUEST',
  DELETE_WPPGROUP_SUCCESS = '@wppgroup/DELETE_WPPGROUP_SUCCESS',
  DELETE_WPPGROUP_FAILURE = '@wppgroup/DELETE_WPPGROUP_FAILURE',
}

/**
 * Data types
 */
export interface Wppgroup {
  id?: string
  campId?: number
  parentCamp?: string
  name?: string
  url?: string
  clicks?: number
  createdAt?: number
  status?: string
}

/**
 * State type
 */
export interface WppgroupState {
  readonly data: Wppgroup[]
  readonly loading: boolean
  readonly error: boolean
}
