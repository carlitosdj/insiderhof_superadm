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
  list: string
  count: number
  name?: string // Para listas pré-definidas
}

export interface ListsResponse {
  predefinedLists: Lists[]
  customLists: Lists[]
}

export interface Error {
  error?: string
}

/**
 * State type
 */
export interface ListsState {
  readonly data: ListsResponse
  readonly loading: boolean
  readonly error?: Error
}
