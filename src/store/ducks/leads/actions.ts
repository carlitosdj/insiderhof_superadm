import {action} from 'typesafe-actions'
import {Lead} from '../lead/types'
import {LeadsTypes} from './types'

//Load
export const loadLeadsRequest = (page: number, take: number) => action(LeadsTypes.LOAD_LEAD_REQUEST, {page, take})
export const loadLeadsSuccess = (data: Lead[]) => action(LeadsTypes.LOAD_LEAD_SUCCESS, data)
export const loadLeadsFailure = (err: any[]) => action(LeadsTypes.LOAD_LEAD_FAILURE, err)

//Search
export const searchLeadsRequest = (search: string) =>
  action(LeadsTypes.SEARCH_LEADS_REQUEST, search)
export const searchLeadsSuccess = (data: Lead[]) => action(LeadsTypes.SEARCH_LEADS_SUCCESS, data)
export const searchLeadsFailure = (err: any[]) => action(LeadsTypes.SEARCH_LEADS_FAILURE, err)
