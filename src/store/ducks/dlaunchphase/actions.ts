import {action} from 'typesafe-actions'
import {LaunchPhasesTypes, LaunchPhases} from './types'

export const reorderLaunchPhasesRequest = (data: LaunchPhases[]) => action(LaunchPhasesTypes.REORDER_LAUNCHPHASES, data)

//Load
export const loadLaunchPhasesRequest = (LaunchId: number) => action(LaunchPhasesTypes.LOAD_LAUNCHPHASES_REQUEST, LaunchId)
export const loadLaunchPhasesSuccess = (data: LaunchPhases) => action(LaunchPhasesTypes.LOAD_LAUNCHPHASES_SUCCESS, data)
export const loadLaunchPhasesFailure = (err: any[]) => action(LaunchPhasesTypes.LOAD_LAUNCHPHASES_FAILURE, err)

//Load
export const loadMyLaunchPhasesRequest = (userId: number) => action(LaunchPhasesTypes.LOAD_MYLAUNCHPHASES_REQUEST, userId)
export const loadMyLaunchPhasesSuccess = (data: LaunchPhases[]) => action(LaunchPhasesTypes.LOAD_MYLAUNCHPHASES_SUCCESS, data)
export const loadMyLaunchPhasesFailure = (err: any[]) => action(LaunchPhasesTypes.LOAD_MYLAUNCHPHASES_FAILURE, err)

//Create
export const createLaunchPhasesRequest = (data: LaunchPhases) => action(LaunchPhasesTypes.CREATE_LAUNCHPHASES_REQUEST, data)
export const createLaunchPhasesSuccess = (data: LaunchPhases) => action(LaunchPhasesTypes.CREATE_LAUNCHPHASES_SUCCESS, data)
export const createLaunchPhasesFailure = (err: any[]) => action(LaunchPhasesTypes.CREATE_LAUNCHPHASES_FAILURE, err)

//Update
export const updateLaunchPhasesRequest = (data: LaunchPhases) => action(LaunchPhasesTypes.UPDATE_LAUNCHPHASES_REQUEST, data)
export const updateLaunchPhasesSuccess = (data: LaunchPhases) => action(LaunchPhasesTypes.UPDATE_LAUNCHPHASES_SUCCESS, data)
export const updateLaunchPhasesFailure = (err: any[]) => action(LaunchPhasesTypes.UPDATE_LAUNCHPHASES_FAILURE, err)

//Delete
export const deleteLaunchPhasesRequest = (id: number) => action(LaunchPhasesTypes.DELETE_LAUNCHPHASES_REQUEST, id)
export const deleteLaunchPhasesSuccess = (data: LaunchPhases) => action(LaunchPhasesTypes.DELETE_LAUNCHPHASES_SUCCESS, data)
export const deleteLaunchPhasesFailure = (err: any[]) => action(LaunchPhasesTypes.DELETE_LAUNCHPHASES_FAILURE, err)
