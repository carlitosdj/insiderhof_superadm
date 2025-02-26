import {Wppgroup} from '../wppgroup/types'

/**
 * Action types
 */
export enum WppcampTypes {
  //Load all
  LOAD_ALLCAMP_REQUEST = '@wppcamp/LOAD_ALLCAMP_REQUEST',
  LOAD_ALLCAMP_SUCCESS = '@wppcamp/LOAD_ALLCAMP_SUCCESS',
  LOAD_ALLCAMP_FAILURE = '@wppcamp/LOAD_ALLCAMP_FAILURE',

  //Load single
  LOAD_CAMP_REQUEST = '@wppcamp/LOAD_CAMP_REQUEST',
  LOAD_CAMP_SUCCESS = '@wppcamp/LOAD_CAMP_SUCCESS',
  LOAD_CAMP_FAILURE = '@wppcamp/LOAD_CAMP_FAILURE',

  //Create
  CREATE_CAMP_REQUEST = '@wppcamp/CREATE_CAMP_REQUEST',
  CREATE_CAMP_SUCCESS = '@wppcamp/CREATE_CAMP_SUCCESS',
  CREATE_CAMP_FAILURE = '@wppcamp/CREATE_CAMP_FAILURE',

  //Update
  UPDATE_CAMP_REQUEST = '@wppcamp/UPDATE_CAMP_REQUEST',
  UPDATE_CAMP_SUCCESS = '@wppcamp/UPDATE_CAMP_SUCCESS',
  UPDATE_CAMP_FAILURE = '@wppcamp/UPDATE_CAMP_FAILURE',

  //Delete
  DELETE_CAMP_REQUEST = '@wppcamp/DELETE_CAMP_REQUEST',
  DELETE_CAMP_SUCCESS = '@wppcamp/DELETE_CAMP_SUCCESS',
  DELETE_CAMP_FAILURE = '@wppcamp/DELETE_CAMP_FAILURE',

  //Available
  LOAD_WPPGROUPAVAILABLE_REQUEST = '@wppcamp/LOAD_WPPGROUPAVAILABLE_REQUEST',
  LOAD_WPPGROUPAVAILABLE_SUCCESS = '@wppcamp/LOAD_WPPGROUPAVAILABLE_SUCCESS',
  LOAD_WPPGROUPAVAILABLE_FAILURE = '@wppcamp/LOAD_WPPGROUPAVAILABLE_FAILURE',
}

/**
 * Data types
 */
export interface Wppcamp {
  id?: number
  name?: string
  slug?: string
  maxclicks?: number
  description?: string
  createdAt?: number
  status?: string
}

/**
 * State type
 */
export interface WppcampState {
  // readonly all: Wppcamp[]
  readonly data: Wppcamp[]
  readonly camp: Wppcamp
  readonly loading: boolean
  readonly error: boolean
  readonly groupavailable: Wppgroup
}
