import {Lead} from '../lead/types'
/**
 * Action types
 */
export enum LeadsTypes {
  //all:
  LOAD_LEAD_REQUEST = '@leads/LOAD_LEAD_REQUEST',
  LOAD_LEAD_SUCCESS = '@leads/LOAD_LEAD_SUCCESS',
  LOAD_LEAD_FAILURE = '@leads/LOAD_LEAD_FAILURE',

  SEARCH_LEADS_REQUEST = '@leads/SEARCH_LEADS_REQUEST',
  SEARCH_LEADS_SUCCESS = '@leads/SEARCH_LEADS_SUCCESS',
  SEARCH_LEADS_FAILURE = '@leads/SEARCH_LEADS_FAILURE',

  LOAD_LEAD_LISTS_REQUEST = '@leads/LOAD_LEAD_LISTS_REQUEST',
  LOAD_LEAD_LISTS_SUCCESS = '@leads/LOAD_LEAD_LISTS_SUCCESS',
  LOAD_LEAD_LISTS_FAILURE = '@leads/LOAD_LEAD_LISTS_FAILURE',

  LOAD_LEADS_BY_LIST_REQUEST = '@leads/LOAD_LEADS_BY_LIST_REQUEST',
  LOAD_LEADS_BY_LIST_SUCCESS = '@leads/LOAD_LEADS_BY_LIST_SUCCESS',
  LOAD_LEADS_BY_LIST_FAILURE = '@leads/LOAD_LEADS_BY_LIST_FAILURE',

  LOAD_EXPORT_LEADS_REQUEST = '@leads/LOAD_EXPORT_LEADS_REQUEST',
  LOAD_EXPORT_LEADS_SUCCESS = '@leads/LOAD_EXPORT_LEADS_SUCCESS',
  LOAD_EXPORT_LEADS_FAILURE = '@leads/LOAD_EXPORT_LEADS_FAILURE',

  SET_SELECTED_LIST = '@leads/SET_SELECTED_LIST',
}

/**
 * Data types
 */

export interface Error {
  error?: string
}
/**
 * State type
 */
export interface LeadsState {
  readonly data: Lead[]
  readonly count: number
  readonly loading: boolean
  readonly error?: Error
  readonly leadLists: {
    predefinedLists: {list: string; name: string; count: number}[]
    customLists: {list: string; count: number}[]
  }
  readonly leadListsLoading: boolean
  readonly exportData: Lead[]
  readonly exportLoading: boolean
  readonly selectedList: string
}
