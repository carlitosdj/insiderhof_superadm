import {action} from 'typesafe-actions'
import {WppgroupTypes, Wppgroup} from './types'

//Load groups
export const loadWppgroupsRequest = (id: string) => action(WppgroupTypes.LOAD_WPPGROUPS_REQUEST, id)
export const loadWppgroupsSuccess = (data: Wppgroup[]) =>
  action(WppgroupTypes.LOAD_WPPGROUPS_SUCCESS, data) //payload dps de LOAD_REQUEST
export const loadWppgroupsFailure = (err: any[]) =>
  action(WppgroupTypes.LOAD_WPPGROUPS_FAILURE, err)

//Create
export const createWppgroupRequest = (data: Wppgroup) =>
  action(WppgroupTypes.CREATE_WPPGROUP_REQUEST, data)
export const createWppgroupSuccess = (data: Wppgroup) =>
  action(WppgroupTypes.CREATE_WPPGROUP_SUCCESS, data)
export const createWppgroupFailure = (err: any[]) =>
  action(WppgroupTypes.CREATE_WPPGROUP_FAILURE, err)

//Update
export const updateWppgroupRequest = (supportToUpdate: Wppgroup) =>
  action(WppgroupTypes.UPDATE_WPPGROUP_REQUEST, supportToUpdate)
export const updateWppgroupSuccess = (data: Wppgroup) =>
  action(WppgroupTypes.UPDATE_WPPGROUP_SUCCESS, data)
export const updateWppgroupFailure = (err: any[]) =>
  action(WppgroupTypes.UPDATE_WPPGROUP_FAILURE, err)

//Delete
export const deleteWppgroupRequest = (id: string) =>
  action(WppgroupTypes.DELETE_WPPGROUP_REQUEST, id)
export const deleteWppgroupSuccess = (id: number) =>
  action(WppgroupTypes.DELETE_WPPGROUP_SUCCESS, id)
export const deleteWppgroupFailure = (err: any[]) =>
  action(WppgroupTypes.DELETE_WPPGROUP_FAILURE, err)
