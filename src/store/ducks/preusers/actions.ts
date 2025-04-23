import {action} from 'typesafe-actions'
import {PreUser, PreUsersTypes} from './types'


//All
export const loadPreUsersRequest = (page: number, take: number) => action(PreUsersTypes.LOAD_PREUSERS_REQUEST, {page, take})
export const loadPreUsersSuccess = (data: PreUser[]) => action(PreUsersTypes.LOAD_PREUSERS_SUCCESS, data)
export const loadPreUsersFailure = (err:any[]) => action(PreUsersTypes.LOAD_PREUSERS_FAILURE, err)

//Single
export const loadPreUserRequest = (id: number) => action(PreUsersTypes.LOAD_PREUSER_REQUEST, id)
export const loadPreUserSuccess = (data: PreUser[]) => action(PreUsersTypes.LOAD_PREUSER_SUCCESS, data)
export const loadPreUserFailure = (err:any[]) => action(PreUsersTypes.LOAD_PREUSER_FAILURE, err)

//Search
export const searchPreUserRequest = (search: string) => action(PreUsersTypes.SEARCH_PREUSERS_REQUEST, search)
export const searchPreUserSuccess = (data: PreUser[]) => action(PreUsersTypes.SEARCH_PREUSERS_SUCCESS, data)
export const searchPreUserFailure = (err:any[]) => action(PreUsersTypes.SEARCH_PREUSERS_FAILURE, err)

//Search
export const filterPreUserRequest = (startDate: number, endDate: number) => action(PreUsersTypes.FILTER_PREUSERS_REQUEST, {startDate, endDate})
export const filterPreUserSuccess = (data: PreUser[]) => action(PreUsersTypes.FILTER_PREUSERS_SUCCESS, data)
export const filterPreUserFailure = (err:any[]) => action(PreUsersTypes.FILTER_PREUSERS_FAILURE, err)

//Create
export const createPreUserRequest = (newPreUser: PreUser) => action(PreUsersTypes.CREATE_PREUSER_REQUEST, newPreUser)
export const createPreUserSuccess = (data: PreUser) => action(PreUsersTypes.CREATE_PREUSER_SUCCESS, data)
export const createPreUserFailure = (err:any[]) => action(PreUsersTypes.CREATE_PREUSER_FAILURE, err)

//Update
export const updatePreUserRequest = (userToUpdate: PreUser) =>
  action(PreUsersTypes.UPDATE_PREUSER_REQUEST, userToUpdate)
export const updatePreUserSuccess = (data: PreUser) => action(PreUsersTypes.UPDATE_PREUSER_SUCCESS, data)
export const updatePreUserFailure = (err:any[]) => action(PreUsersTypes.UPDATE_PREUSER_FAILURE, err)

//Delete
export const deletePreUserRequest = (userId: number) => action(PreUsersTypes.DELETE_PREUSER_REQUEST, userId)
export const deletePreUserSuccess = (data: PreUser) => action(PreUsersTypes.DELETE_PREUSER_SUCCESS, data)
export const deletePreUserFailure = (err:any[]) => action(PreUsersTypes.DELETE_PREUSER_FAILURE, err)

//Selected users
//Delete
export const selectPreUsersAddRequest = (data: PreUser) => action(PreUsersTypes.SELECTED_PREUSER_ADD, data)
export const selectPreUsersAddSuccess = (data: PreUser) => action(PreUsersTypes.SELECTED_PREUSER_ADD_SUCCESS, data)
export const selectPreUsersRemoveRequest = (data: PreUser) => action(PreUsersTypes.SELECTED_PREUSER_REMOVE, data)
export const selectPreUsersRemoveSuccess = (data: PreUser) => action(PreUsersTypes.SELECTED_PREUSER_REMOVE_SUCCESS, data)
