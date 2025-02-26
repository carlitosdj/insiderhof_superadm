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
}
