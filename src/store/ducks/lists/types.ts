/**
 * Action types
 */
export enum ListsTypes {
  //Load
  LOAD_LISTS_REQUEST = '@lists/LOAD_LISTS_REQUEST',
  LOAD_LISTS_SUCCESS = '@lists/LOAD_LISTS_SUCCESS',
  LOAD_LISTS_FAILURE = '@lists/LOAD_LISTS_FAILURE',
}

/**
 * Data types
 */

export interface Lists {
  list?: string
  number?: number
  number_confirm?: number
}

export interface Error {
  error?: string
}
/**
 * State type
 */
export interface ListsState {
  readonly data: Lists[]
  readonly loading: boolean
  readonly error?: Error
}
