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

//Lead Lists
export const loadLeadListsRequest = () => action(LeadsTypes.LOAD_LEAD_LISTS_REQUEST)
export const loadLeadListsSuccess = (data: {list: string}[]) => action(LeadsTypes.LOAD_LEAD_LISTS_SUCCESS, data)
export const loadLeadListsFailure = (err: any[]) => action(LeadsTypes.LOAD_LEAD_LISTS_FAILURE, err)

//Leads by list
export const loadLeadsByListRequest = (list: string) => action(LeadsTypes.LOAD_LEADS_BY_LIST_REQUEST, list)
export const loadLeadsByListSuccess = (data: Lead[]) => action(LeadsTypes.LOAD_LEADS_BY_LIST_SUCCESS, data)
export const loadLeadsByListFailure = (err: any[]) => action(LeadsTypes.LOAD_LEADS_BY_LIST_FAILURE, err)

//Export leads
export const loadExportLeadsRequest = (list: string) => action(LeadsTypes.LOAD_EXPORT_LEADS_REQUEST, list)
export const loadExportLeadsSuccess = (data: Lead[]) => action(LeadsTypes.LOAD_EXPORT_LEADS_SUCCESS, data)
export const loadExportLeadsFailure = (err: any[]) => action(LeadsTypes.LOAD_EXPORT_LEADS_FAILURE, err)

//Set selected list
export const setSelectedList = (list: string) => action(LeadsTypes.SET_SELECTED_LIST, list)
