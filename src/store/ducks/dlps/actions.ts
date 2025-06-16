import {action} from 'typesafe-actions'
import {LPSTypes, LP} from './types'



export const reorderLPsRequest = (data: LP[]) => action(LPSTypes.REORDER_LPS, data)
//Load
export const loadMyLPsRequest = (lpId: number) => action(LPSTypes.LOAD_MYLPS_REQUEST, lpId)
export const loadMyLPsSuccess = (data: LP[]) => action(LPSTypes.LOAD_MYLPS_SUCCESS, data)
export const loadMyLPsFailure = (err: any[]) => action(LPSTypes.LOAD_MYLPS_FAILURE, err)

//Load
export const loadLPRequest = (lpId: number) => action(LPSTypes.LOAD_LP_REQUEST, lpId)
export const loadLPSuccess = (data: LP) => action(LPSTypes.LOAD_LP_SUCCESS, data)
export const loadLPFailure = (err: any[]) => action(LPSTypes.LOAD_LP_FAILURE, err)

//Create
export const createLPRequest = (data: LP) => action(LPSTypes.CREATE_LP_REQUEST, data)
export const createLPSuccess = (data: LP) => action(LPSTypes.CREATE_LP_SUCCESS, data)
export const createLPFailure = (err: any[]) => action(LPSTypes.CREATE_LP_FAILURE, err)

//Update
export const updateLPRequest = (data: LP) => action(LPSTypes.UPDATE_LP_REQUEST, data)
export const updateLPSuccess = (data: LP) => action(LPSTypes.UPDATE_LP_SUCCESS, data)
export const updateLPFailure = (err: any[]) => action(LPSTypes.UPDATE_LP_FAILURE, err)

//Delete
export const deleteLPRequest = (id: number) => action(LPSTypes.DELETE_LP_REQUEST, id)
export const deleteLPSuccess = (data: LP) => action(LPSTypes.DELETE_LP_SUCCESS, data)
export const deleteLPFailure = (err: any[]) => action(LPSTypes.DELETE_LP_FAILURE, err)
