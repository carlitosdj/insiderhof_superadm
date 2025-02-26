import {action} from 'typesafe-actions'
import {LaunchsTypes, Launch} from './types'

export const reorderLaunchsRequest = (data: Launch[]) => action(LaunchsTypes.REORDER_LAUNCHS, data)

//Load
export const loadLaunchRequest = (LaunchId: number) => action(LaunchsTypes.LOAD_LAUNCH_REQUEST, LaunchId)
export const loadLaunchSuccess = (data: Launch) => action(LaunchsTypes.LOAD_LAUNCH_SUCCESS, data)
export const loadLaunchFailure = (err: any[]) => action(LaunchsTypes.LOAD_LAUNCH_FAILURE, err)

//Load
export const loadMyLaunchsRequest = (userId: number) => action(LaunchsTypes.LOAD_MYLAUNCHS_REQUEST, userId)
export const loadMyLaunchsSuccess = (data: Launch[]) => action(LaunchsTypes.LOAD_MYLAUNCHS_SUCCESS, data)
export const loadMyLaunchsFailure = (err: any[]) => action(LaunchsTypes.LOAD_MYLAUNCHS_FAILURE, err)

//Create
export const createLaunchRequest = (data: Launch) => action(LaunchsTypes.CREATE_LAUNCH_REQUEST, data)
export const createLaunchSuccess = (data: Launch) => action(LaunchsTypes.CREATE_LAUNCH_SUCCESS, data)
export const createLaunchFailure = (err: any[]) => action(LaunchsTypes.CREATE_LAUNCH_FAILURE, err)

//Update
export const updateLaunchRequest = (data: Launch) => action(LaunchsTypes.UPDATE_LAUNCH_REQUEST, data)
export const updateLaunchSuccess = (data: Launch) => action(LaunchsTypes.UPDATE_LAUNCH_SUCCESS, data)
export const updateLaunchFailure = (err: any[]) => action(LaunchsTypes.UPDATE_LAUNCH_FAILURE, err)

//Delete
export const deleteLaunchRequest = (id: number) => action(LaunchsTypes.DELETE_LAUNCH_REQUEST, id)
export const deleteLaunchSuccess = (data: Launch) => action(LaunchsTypes.DELETE_LAUNCH_SUCCESS, data)
export const deleteLaunchFailure = (err: any[]) => action(LaunchsTypes.DELETE_LAUNCH_FAILURE, err)
