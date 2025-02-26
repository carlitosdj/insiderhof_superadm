import {action} from 'typesafe-actions'
import {ListsTypes, Lists} from './types'

//Load
export const loadListsRequest = () => action(ListsTypes.LOAD_LISTS_REQUEST)
export const loadListsSuccess = (data: Lists[]) => action(ListsTypes.LOAD_LISTS_SUCCESS, data)
export const loadListsFailure = (error: {}) => action(ListsTypes.LOAD_LISTS_FAILURE, error)
