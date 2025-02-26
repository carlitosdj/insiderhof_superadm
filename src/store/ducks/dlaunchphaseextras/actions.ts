import {action} from 'typesafe-actions'
import {LaunchPhaseExtrasTypes, LaunchPhaseExtras} from './types'

export const reorderLaunchPhaseExtrasRequest = (data: LaunchPhaseExtras[]) => action(LaunchPhaseExtrasTypes.REORDER_LAUNCHPHASEEXTRA, data)

//Load
export const loadLaunchPhaseExtrasRequest = (LaunchId: number) => action(LaunchPhaseExtrasTypes.LOAD_LAUNCHPHASEEXTRA_REQUEST, LaunchId)
export const loadLaunchPhaseExtrasSuccess = (data: LaunchPhaseExtras) => action(LaunchPhaseExtrasTypes.LOAD_LAUNCHPHASEEXTRA_SUCCESS, data)
export const loadLaunchPhaseExtrasFailure = (err: any[]) => action(LaunchPhaseExtrasTypes.LOAD_LAUNCHPHASEEXTRA_FAILURE, err)

//Load
export const loadMyLaunchPhaseExtrasRequest = (userId: number) => action(LaunchPhaseExtrasTypes.LOAD_MYLAUNCHPHASEEXTRA_REQUEST, userId)
export const loadMyLaunchPhaseExtrasSuccess = (data: LaunchPhaseExtras[]) => action(LaunchPhaseExtrasTypes.LOAD_MYLAUNCHPHASEEXTRA_SUCCESS, data)
export const loadMyLaunchPhaseExtrasFailure = (err: any[]) => action(LaunchPhaseExtrasTypes.LOAD_MYLAUNCHPHASEEXTRA_FAILURE, err)

//Create
export const createLaunchPhaseExtrasRequest = (data: LaunchPhaseExtras) => action(LaunchPhaseExtrasTypes.CREATE_LAUNCHPHASEEXTRA_REQUEST, data)
export const createLaunchPhaseExtrasSuccess = (data: LaunchPhaseExtras) => action(LaunchPhaseExtrasTypes.CREATE_LAUNCHPHASEEXTRA_SUCCESS, data)
export const createLaunchPhaseExtrasFailure = (err: any[]) => action(LaunchPhaseExtrasTypes.CREATE_LAUNCHPHASEEXTRA_FAILURE, err)

//Update
export const updateLaunchPhaseExtrasRequest = (data: LaunchPhaseExtras) => action(LaunchPhaseExtrasTypes.UPDATE_LAUNCHPHASEEXTRA_REQUEST, data)
export const updateLaunchPhaseExtrasSuccess = (data: LaunchPhaseExtras) => action(LaunchPhaseExtrasTypes.UPDATE_LAUNCHPHASEEXTRA_SUCCESS, data)
export const updateLaunchPhaseExtrasFailure = (err: any[]) => action(LaunchPhaseExtrasTypes.UPDATE_LAUNCHPHASEEXTRA_FAILURE, err)

//Delete
export const deleteLaunchPhaseExtrasRequest = (id: number) => action(LaunchPhaseExtrasTypes.DELETE_LAUNCHPHASEEXTRA_REQUEST, id)
export const deleteLaunchPhaseExtrasSuccess = (data: LaunchPhaseExtras) => action(LaunchPhaseExtrasTypes.DELETE_LAUNCHPHASEEXTRA_SUCCESS, data)
export const deleteLaunchPhaseExtrasFailure = (err: any[]) => action(LaunchPhaseExtrasTypes.DELETE_LAUNCHPHASEEXTRA_FAILURE, err)
