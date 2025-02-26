/**
 * Action types
 */
import {User} from '../me/types'
export enum UsersTypes {
  //All
  LOAD_USERS_REQUEST = '@users/LOAD_USERS_REQUEST',
  LOAD_USERS_SUCCESS = '@users/LOAD_USERS_SUCCESS',
  LOAD_USERS_FAILURE = '@users/LOAD_USERS_FAILURE',

  //Single user: -> "readOne" / "readByEmail"
  LOAD_USER_REQUEST = '@users/LOAD_USER_REQUEST',
  LOAD_USER_SUCCESS = '@users/LOAD_USER_SUCCESS',
  LOAD_USER_FAILURE = '@users/LOAD_USER_FAILURE',

  //Search
  SEARCH_USERS_REQUEST = '@users/SEARCH_USERS_REQUEST',
  SEARCH_USERS_SUCCESS = '@users/SEARCH_USERS_SUCCESS',
  SEARCH_USERS_FAILURE = '@users/SEARCH_USERS_FAILURE',

  //Filter
  FILTER_USERS_REQUEST = '@users/FILTER_USERS_REQUEST',
  FILTER_USERS_SUCCESS = '@users/FILTER_USERS_SUCCESS',
  FILTER_USERS_FAILURE = '@users/FILTER_USERS_FAILURE',
  
  //Create
  CREATE_USER_REQUEST = '@users/CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS = '@users/CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE = '@users/CREATE_USER_FAILURE',

  //Update
  UPDATE_USER_REQUEST = '@users/UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS = '@users/UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE = '@users/UPDATE_USER_FAILURE',

  //Delete
  DELETE_USER_REQUEST = '@users/DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS = '@users/DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE = '@users/DELETE_USER_FAILURE',

  //Selected users
  SELECTED_USER_ADD = '@users/SELECTED_USER_ADD',
  SELECTED_USER_ADD_SUCCESS = '@users/SELECTED_USER_ADD_SUCCESS',
  SELECTED_USER_REMOVE = '@users/SELECTED_USER_REMOVE',
  SELECTED_USER_REMOVE_SUCCESS = '@users/SELECTED_USER_REMOVE_SUCCESS',
  
}

/**
 * Data types
 */
// User Imported from Me

/**
 * State type
 */
export interface UsersState {
  readonly data: User[]
  readonly user: User
  readonly loading: boolean
  readonly loadingUser: boolean
  readonly error: any
  readonly count: number
  readonly selectedUsers: User[]
  readonly showPagination: boolean
  readonly filterStartDate: number
  readonly filterEndDate: number
  
}
